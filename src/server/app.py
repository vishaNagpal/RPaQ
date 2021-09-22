from __future__ import absolute_import

from flask import Flask, jsonify,send_from_directory
from flask import request
from flask import Response
from flask_cors import CORS, cross_origin

from getSimilarity import get_similarity_from_words,get_similarity
from getQuestions import fetchQuestions
from parseResume import getWordsFromResume

app = Flask(__name__)
CORS(app, support_credentials=True)


##########################################
# Routes Config begin
@app.route('/uploadResume', methods=['POST'])
def upload_resume():
    try:
        uploaded_file = request.files['file'];
        filename = uploaded_file.filename
        if uploaded_file.filename != '':
            keywords = getWordsFromResume(uploaded_file)
            if keywords:
                response_data = get_similarity(keywords)
                response_data['keywords'] = keywords
                questions = fetchQuestions(",".join(keywords),5);
                response_data['questions'] = questions
                return jsonify(response_data)
            return jsonify(
                    message="Some error occurred or Keywords not found. Now debug to fix it up",
                    category="error",
                    status=404
                )
    except IOError:
        print("Error in uploaded resume.")


@app.route('/fetchSimilarity')
@cross_origin(supports_credentials=True)
def fetch_similarity():
    words = request.args.get('words');
    response_data = get_similarity_from_words(words);
    return jsonify(response_data)


@app.route('/fetchQuestions')
@cross_origin(supports_credentials=True)
def fetch_questions():
    words = request.args.get('words');
    count = request.args.get('count') or 5;
    words = words.split(",")
    response_data = fetchQuestions(words,count);
    print('response_data')
    return jsonify(response_data)


# @app.route('/get-files/<path:path>',methods = ['GET'])
# def get_files(path):
#     base_path = '/Users/vishakha.nagpal/development/my_workspace/RAPQ/src/uploads'
#     try:
#         return send_from_directory(base_path, path)
#     except FileNotFoundError:
#         abort(404)

@app.route('/')
def home():
    return '<p>It is working</p>'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
