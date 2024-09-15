import sys
import os
# Ensure that the script's directory is in sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify
import scraper
import prompts

app = Flask(__name__)

@app.route('/run', methods=['GET'])
def run():
    prompt = request.args.get("prompt")
    link, text = scraper.Scrape(prompt, 1) #article link and text
    output, data_all = prompts.execute(text)
    result = {"article_link": link, "output": output, "data_all": data_all}
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
