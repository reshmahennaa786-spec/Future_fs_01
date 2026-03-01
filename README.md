🌟 Personal Portfolio
A full-stack personal portfolio website with a contact form powered by MongoDB.

🚀 Live Demo
Frontend: https://future-fs-01-brown.vercel.app

🛠️ Tech Stack

Frontend
React + Vite
Deployed on Vercel

Backend
Node.js + Express
CORS configured
Deployed on Render

Database
MongoDB Atlas

📁 Project Structure
Future_fs_01/
├── portfolio-frontend/   # React Vite app
└── portfolio-backend/    # Express API
    ├── server.js
    ├── db.js
    ├── contactRoute.js
    └── Contact.js
    
# Getting Started Locally
Backend
cd portfolio-backend
npm install
Create a .env file with:
MONGO_URI=your_mongodb_connection_string
node server.js

Frontend
cd portfolio-frontend
npm install
npm run dev

📬 Contact Form
The contact form sends messages directly to MongoDB via the /api/contact endpoint.
👩‍💻 Author
Reshma Henna
