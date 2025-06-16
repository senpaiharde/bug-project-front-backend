MissBug – Full-Stack Bug Tracker  
A lightweight bug-tracking app with JWT auth, admin panel, JSON storage, and Docker support.


## Getting Started

### Clone the Repo
```bash
git clone https://github.com/senpaiharde/bug-project-front-backend.git
cd bug-project-front-backend
cp .env.example .env
# Then open .env and set:
# PORT=3030
# JWT_SECRET=missBugSecretKey


cd miss-bug-proj-backend
npm install
npm run dev         # or npm start

cd miss-bug-starter-react-vite
npm install
npm run dev


docker(if you support it)
docker-compose up --build  


## Admin Setup
By default, `data/user.db.json` contains one admin user. To change it:
1. Open `backend/api/auth.controller.js`.  
2. Update `ADMIN_EMAIL` to your email.  
3. Restart the backend.  



1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Environment Variables](#environment-variables)
4. [Development](#development)
   - [Backend](#backend)
   - [Frontend](#frontend)
   - [Docker](#docker)
5. [Admin Setup](#admin-setup)
6. [Usage](#usage)
7. [Deployment](#deployment)
8. [API Endpoints](#api-endpoints)
9. [Troubleshooting](#troubleshooting)


## Features
- ✅ JWT-based authentication with Bcrypt and token expiration  
- 🔄 Flat-file JSON backend for rapid prototyping  
- 👤 User vs. Admin roles (admin can edit/delete any user or bug)  
- 🐞 Full CRUD on bugs (owner-only edit/delete)  
- 🍪 Cookie support for session management  
- 🐳 Docker Compose setup with health checks and logs  
- 🗄️ Download bug reports as PDF  
- 📋 Audit logger middleware for all API requests  
- 🎨 Responsive, clean React/Vite frontend  
- …and more!
how to live server:


## Deployment to Render.com

1. Push your code to GitHub.  
2. Create a **Web Service** for the backend:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Env Var: `JWT_SECRET=missBugSecretKey`
3. Create a **Static Site** for the frontend:
   - Root Directory: `miss-bug-starter-react-vite`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Visit your live URLs:
   - Frontend: `https://bug-project-front-backend.onrender.com`
   - Backend Health: `https://<your-backend>.onrender.com/health`
