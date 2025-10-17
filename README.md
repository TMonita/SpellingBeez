🐝 Spelling Bee Frontend

This is the frontend of the Spelling Bee Game Application, built with React (Vite), React Router, and Axios.
It provides the user interface for authentication, gameplay, profile management, feedback, and admin dashboards.

✨ Features
🔑 Authentication

Sign up new users

Login with email & password

Google OAuth popup login

JWT stored in localStorage

Role-based protected routes (USER, ADMIN)

👤 User Features

Welcome page after login

Play the spelling game and view results

Update profile (name + avatar upload)

Secure .txt file upload and download

Submit feedback

👨‍💼 Admin Features

View all users (paginated)

Dashboard with statistics

View all submitted feedback

⚙️ Tech Stack

React 18 (Vite)

React Router v6

Axios

Tailwind-style utility classes + custom CSS

React Icons

🧪 Software Testing
✅ What We Test

User sign up & login (valid & invalid input)

JWT authentication (profile fetch, token cleanup)

Google OAuth popup callback

Route protection (redirect unauthorized users)

Profile update with avatar preview and upload

Secure file upload/download (.txt files)

Feedback submission

Admin dashboard and feedback list

🛠️ Tools

Manual testing with backend APIs

Browser DevTools for requests

▶️ Running the Project
1. Clone the Repo
git clone https://github.com/yourusername/spellingbee-frontend.git
cd spellingbee-frontend

2. Install Dependencies
npm install

3. Configure Environment
Create a .env file:
VITE_API_BASE=http://127.0.0.1:8000

4. Start Development Server
npm run dev

5. Build & Run Preview
npm run build
npm run preview
