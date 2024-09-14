import whisper


# Load model
model = whisper.load_model("base")
result = model.transcribe("testaudio.mp3")
print(result["text"])

# Clean Transcription
def clean_transcription(subject, temperature, audio_file):
    system_prompt = f"You are a helpful assistant for the subejct {subject} "
    response = client.chat.completions.create(
        model="gpt-4o",
        temperature=temperature,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": transcribe(audio_file, "")
            }
        ]
    )
    return completion.choices[0].message.content

corrected_text = generate_corrected_transcript(0, system_prompt, "testaudio.mp3")


# Clean Transcription
clean_transcription("math", 0.5, "testaudio.mp3")