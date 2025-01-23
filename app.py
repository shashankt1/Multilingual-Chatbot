from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_session import Session
from transformers import pipeline
import logging
from langdetect import detect, LangDetectException

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
Session(app)


try:
    logger.info("Loading chat model...")
    chat_model = pipeline("text-generation", model="microsoft/DialoGPT-medium")
except Exception as e:
    logger.error(f"Failed to load chat model: {e}")
    raise


def detect_language(text):
    try:
        return detect(text)
    except LangDetectException as e:
        logger.error(f"Language detection error: {e}")
        return 'en'


def generate_response(user_message, user_language):
    try:
        logger.info(f"Generating response for language: {user_language}")
        response = chat_model(user_message)[0]['generated_text']
        return response
    except Exception as e:
        logger.error(f"Chat model error: {e}")
        return "I'm sorry, I couldn't process that."

@app.route('/chat', methods=['POST'])
def chat():
    try:
        
        user_message = request.json.get('message', '').strip()
        if not user_message:
            logger.warning("Empty message received.")
            return jsonify({"response": "Please provide a message."}), 400

        
        user_language = request.json.get('language', detect_language(user_message))
        
        
        bot_response = generate_response(user_message, user_language)
        return jsonify({"response": bot_response})
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({"error": "Internal server error."}), 500

if __name__ == '__main__':
    logger.info("Starting chatbot application in production mode...")
    app.run(host='192.168.1.5', port=5000, debug=False)