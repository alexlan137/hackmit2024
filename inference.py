import modal
import subprocess
from model import *

app = modal.App("example-get-started")

@app.function(gpu="H100")
def run():
    subprocess.run(["nvidia-smi"])
    print("This code is running on a remote worker!")


@app.local_entrypoint()
def main():
    run.remote()