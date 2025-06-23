
# Affordmed URL Shortener

### Frontend
- React.js

### Backend (Logging Middleware)
- JavaScript (Reusable logger utility)
- Axios for HTTP requests


## 🚀 Features

- ✅ Shorten long URLs with optional custom shortcode.
- 🕒 Set expiry time for each URL in minutes.
- 📑 See list of shortened URLs with expiry.
- 🪵 Integrated logging middleware to send logs to the test server.
- ⚙️ Reusable `logger` utility for consistent structured logging.


## 🔗 Live Demo

You can run this locally on:  
http://localhost:3000

🧩 Project Structure
src/
├── components/
│   ├── UrlShortenerForm.jsx     # Main form logic for URL input
│   └── StatsPage.jsx            # (Optional) For analytics
├── utils/
│   └── logger.js                # Reusable logging middleware
├── App.js
├── index.js
└── ...

📦 How to Install & Run
1. Clone the Repository
git clone https://github.com/<your-username>/url-shortener-affordmed.git
cd url-shortener-affordmed

2. Install Dependencies
npm install

3. Start the Application
npm start

🔐 Authentication
Before logging, obtain your access_token using the Auth API:

Auth API
POST http://20.244.56.144/evaluation-service/auth

{
  "email": "your-email",
  "name": "Your Name",
  "rollNo": "Your Roll No",
  "mobileNo": "Your Mobile",
  "githubUsername": "yourGithub",
  "collegeName": "Your College",
  "accessCode": "yourAccessCode",
  "clientID": "yourClientID",
  "clientSecret": "yourClientSecret"
}
Store the returned access_token in your frontend code and pass it into the Log() function.

🪵 Logging API (Used Internally)
POST http://20.244.56.144/evaluation-service/logs

Headers:
Authorization: Bearer <access_token>
Example Body:
{
  "stack": "backend",
  "level": "error",
  "package": "handler",
  "message": "received string, expected bool"
}
📁 Logger Utility (Example Usage)
import Log from '../utils/logger';

const token = "your-access-token";
Log("frontend", "info", "handler", "Short URL submitted", token);

📌 Constraints
Stack: frontend, backend

Level: debug, info, warning, error

Package: Only lowercase strings like handler (must match docs)

👤 Author
Omprakash Kumar Mahto
GitHub: omprakashmahto0015
