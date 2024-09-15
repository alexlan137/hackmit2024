import modal
app = modal.App()
image = modal.Image.debian_slim().pip_install_from_requirements("../requirements.txt")
mount = modal.Mount.from_local_dir(".", remote_path="/root/")
@app.function(gpu="A100:4", image=image, mounts=[mount])
def run():
    import subprocess
    subprocess.run(["python3", "agent.py"])

@app.local_entrypoint()
def main():
    run.remote()