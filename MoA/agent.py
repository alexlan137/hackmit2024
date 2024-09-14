import modal
import subprocess
import torch
import torch.distributed as dist
import torch.multiprocessing as mp
import os
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig, pipeline
from prompts import *

app = modal.App()

hf_token = "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"
avail_models = {
    "llama3_8b": "meta-llama/Meta-Llama-3-8B-Instruct",
}

system_prompts = {}
for position in POSITIONS:
    system_prompts[position] = get_position_prompt(position)
system_prompts['aggregator'] = AGG_PROMPT

def setup_dist(rank, world_size):
    os.environ['MASTER_ADDR'] = 'localhost'
    os.environ['MASTER_PORT'] = '12355'
    dist.init_process_group("nccl", rank=rank, world_size=world_size)


def cleanup_dist():
    dist.destroy_process_group()

class Agent:
    def __init__(self, rank, agents, input_queues, output_queues):
        self.rank = rank
        self.agent = agents[rank]
        self.role = self.agent["role"]
        self.hf_model = self.agent["hf_model"]
        self.sprompt = system_prompts[self.role]
        
        self.pipe = self.load_model(self.hf_model, {'':rank})
        self.output_queue = output_queues[rank]
        
        if (self.role == "aggregator"):
            self.input_queue = []
            for i in self.agent["input_queues"]:
                self.input_queue.append(output_queues[i])
            self.run_aggregator()
        else:
            self.input_queue = input_queues[rank]
            self.run_proposer()
    
    def load_model(self, model_id, device_map):
        assert model_id in avail_models.keys(), f"Model {model_id} not available. Choose from {avail_models.keys()}"
        model_id = avail_models[model_id]
        quant_config = BitsAndBytesConfig(load_in_8bit=True)
        model = AutoModelForCausalLM.from_pretrained(model_id, quantization_config=quant_config, device_map=device_map, use_auth_token=hf_token)
        tokenizer = AutoTokenizer.from_pretrained(model_id, use_auth_token=hf_token)
        
        return pipeline(
            "text-generation",
            model=model,
            tokenizer=tokenizer,
        )

    def run_proposer(self):
        while True:
            if not self.input_queue.empty():
                uprompt = self.input_queue.get()
                if uprompt == "^C": 
                    self.output_queue.put("^C")
                    return
                messages = [
                    {"role": "system", "content": self.sprompt},
                    {"role": "user", "content": uprompt}
                ]
                result = self.pipe(
                    messages,
                    truncation=True,
                    max_length=2048,
                    num_return_sequences=1,
                    temperature=0.8,
                    top_k=50,
                    top_p=0.9,
                    repetition_penalty=1.2
                )[0]['generated_text'][2]['content']
                self.output_queue.put(result)
    
    def run_aggregator(self):
        while True:
            responses = [None for _ in range(len(self.input_queue))]
            while None in responses:
                for i, queue in enumerate(self.input_queue):
                    if not queue.empty() and responses[i] is None:
                        responses[i] = queue.get()
            if "^C" in responses: return
            combined_result = ""
            for response in responses:
                combined_result += response + "\n\n"
            messages = [
                {"role": "system", "content": system_prompts[self.role]},
                {"role": "user", "content": combined_result}
            ]
            result = self.pipe(
                messages,
                truncation=True,
                max_length=2048,
                num_return_sequences=1,
                temperature=0.8,
                top_k=50,
                top_p=0.9,
                repetition_penalty=1.2
            )[0]['generated_text'][2]['content']
            self.output_queue.put(result)
            print(f"Rank {self.rank} output:\n{result}\n\n")


def mixture_of_agents(agents, world_size, prompts):
    mp.set_start_method("spawn")
    input_queues = [mp.Queue() for _ in range(world_size)]
    output_queues = [mp.Queue() for _ in range(world_size)]
    for prompt in prompts:
        for agent in agents:
            if agent["role"] != "aggregator":
                input_queues[agents.index(agent)].put(prompt)
    mp.spawn(Agent, args=(agents, input_queues, output_queues), nprocs=world_size)


def MoA_main():
    """
    Agent Format:
    hf_model: which model to use
    role: political position or aggregator
    input_queues: list of input queues if aggregator, else None
    output_queue: output queue
    """
    agents = [
        {
            "hf_model": "llama3_8b",
            "role": "liberal",
        },
        {
            "hf_model": "llama3_8b",
            "role": "conservative",
        },
        {
            "hf_model": "llama3_8b",
            "role": "centrist",
        },
        {
            "hf_model": "llama3_8b",
            "role": "aggregator",
            "input_queues": [0, 1, 2],
        }
    ]

    world_size = len(agents)
    
    prompts = [
        "What is the meaning of life?",
        "Can you explain how oxidation reactions work?",
        "Why do large language models follow a scaling law?",
        "What is Rene Girard's philosophy?",
        "What is the best way to cook a steak?",
        "Explain how a particle accelerator works.",
        "^C",
    ]
    
    mixture_of_agents(agents, world_size, prompts)  

if __name__ == "__main__":
    MoA_main()