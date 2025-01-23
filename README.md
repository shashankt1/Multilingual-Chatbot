# Multilingual-Chatbot
Multilingual-ChatBot
Chatbot Application
This is a chatbot application built using Flask for the backend and React for the frontend. The chatbot uses the DialoGPT-medium model from Hugging Face's Transformers library to generate responses based on user input.

Features
Text-based Chat: Users can type messages and get real-time responses from the bot.
Language Detection: Automatically detects the language of the user input and generates the response in the same language.
Multilingual Support: The chatbot supports multiple languages, including English, Spanish, French, German, Hindi, Chinese, and Arabic.
Server-side Session Management: Utilizes Flask-Session to manage user sessions.
Technologies
Backend: Flask, Gunicorn (for production), Hugging Face Transformers (DialoGPT-medium)
Frontend: React
Machine Learning: Hugging Face Transformers library, PyTorch
API: Flask-RESTful for handling POST requests
CORS Handling: Flask-CORS to allow cross-origin requests from the frontend
Requirements
Before running this project, you need to have Python 3.x and Node.js installed on your machine.

Backend Requirements
Python 3.x
Flask
Flask-CORS
Flask-Session
Hugging Face Transformers
PyTorch or TensorFlow
Frontend Requirements
Node.js
React
Axios (for HTTP requests)





Installation
Backend Setup
Clone the repository:

bash
Copy
git clone https://github.com/yourusername/chatbot
cd chatbot
Create and activate a virtual environment (optional but recommended):

For Windows:
bash
Copy
python -m venv venv
venv\Scripts\activate
For macOS/Linux:
bash
Copy
python3 -m venv venv
source venv/bin/activate
Install the required backend dependencies:

bash
Copy
pip install -r requirements.txt
Install PyTorch (if not already installed):

bash
Copy
pip install torch
Run the Flask application: For development:

bash
Copy
python app.py
For production, use Gunicorn:

bash
Copy
gunicorn --bind 0.0.0.0:5000 app:app
Frontend Setup
Navigate to the frontend directory:

bash
Copy
cd frontend
Install the required frontend dependencies:

bash
Copy
npm install
Run the React app:

bash
Copy
npm start
The React app will run at http://localhost:3000, and it will communicate with the Flask backend running at http://localhost:5000.

Usage
Start the Flask backend by running python app.py or gunicorn --bind 0.0.0.0:5000 app:app.
Start the React frontend by running npm start in the frontend directory.
The frontend will be available at http://localhost:3000 and will send requests to the backend for responses. You can interact with the chatbot by typing messages in the input field and selecting the desired language from the dropdown.

Features and Usage
Message Input: Type your message in the input field and click on the "Send" button.
Language Selection: Choose the language for the bot's response. The bot can detect and respond in multiple languages.
Bot Typing Indicator: While the bot is processing, you will see a "Bot is typing..." message.
Multilingual Support: The bot can respond in multiple languages, including English, Spanish, French, German, Hindi, Chinese, and Arabic.
Project Structure
Backend
plaintext
Copy
backend/
├── app.py          # Flask app with endpoints
├── requirements.txt  # List of Python dependencies
└── venv/           # Virtual environment (optional)
Frontend
plaintext
Copy
frontend/
├── src/
│   ├── App.js       # Main React component
│   ├── Chatbot.js   # Chatbot component
│   └── app.css      # CSS styling
└── package.json     # React project dependencies
Troubleshooting
Error: ModuleNotFoundError: No module named 'fcntl': This error occurs when trying to run Gunicorn on Windows. To resolve it, use Waitress instead of Gunicorn, as it is compatible with Windows.

bash
Copy
pip install waitress
Update app.py to use Waitress for serving the app:

python
Copy
from waitress import serve

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)
Error: None of PyTorch, TensorFlow >= 2.0, or Flax have been found.: This error occurs if PyTorch or TensorFlow isn't installed. Install PyTorch by running:

bash
Copy
pip install torch
Contributing
Contributions are welcome! Please feel free to fork the repository and submit pull requests. When making changes, ensure you follow best practices and write tests if necessary.

To Contribute:
Fork the repository
Create a new branch
Make your changes and write tests
Commit your changes and push to your forked repository
Open a pull request to the main repository
License
This project is licensed under the MIT License - see the LICENSE file for details.
