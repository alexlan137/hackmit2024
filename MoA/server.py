from flask import Flask, request, jsonify
# import ml_model

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    # Get the JSON data from the request
    data = request.get_json()

    result = "call the ML system to get the result"

    # Return the prediction as JSON
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
