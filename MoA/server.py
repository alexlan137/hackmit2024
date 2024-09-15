import sys
import os
# Ensure that the script's directory is in sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify
from flask_cors import CORS
import scraper
import prompts

app = Flask(__name__)
CORS(app)

@app.route('/run', methods=['GET'])
def run():
    prompt = request.args.get("prompt")
    print("prompt: ", prompt)
    link, text = scraper.Scrape(prompt, 1)[0] #article link and text
    output, data_all = prompts.execute(text)
    POSITIONS = ['Liberal', 'Conservative', 'Libertarian', 'Green', 'Populist', 'Centrist', 'Demsoc', 'Nationalist', 'Progressive', 'Soccon']
    result = {"article_link": link, "output": output["output"][0], "data_all": [{"position": POSITIONS[i], "response": data_all[i]} for i in range(len(data_all))]}
    return jsonify(result)

if __name__ == '__main__':
    print("starting")
    app.run(host='0.0.0.0', port=5000, debug=True)
