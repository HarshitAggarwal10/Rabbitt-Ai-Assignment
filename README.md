Rabbitt AI – Sales Insight Automator
Author

Name: Harshit Aggarwal
Roll No: 2310990766
Role: AI Cloud DevOps Engineer


Project Overview

Sales teams often deal with large CSV or Excel datasets and struggle to quickly extract meaningful insights for leadership.

The Sales Insight Automator solves this problem by allowing users to upload a sales dataset and automatically generate a professional AI-powered executive summary.

The application uses Google Gemini AI to analyze sales data and generate insights, which are then delivered directly to the requested email address.


Features

Upload CSV / XLSX sales data

AI-powered executive summary generation

Email delivery of generated summary

Swagger/OpenAPI documentation

Containerized application using Docker

CI/CD pipeline using GitHub Actions

Cloud deployment (Frontend → Vercel, Backend → Render)


Tech Stack
```
Frontend

React (Vite)

TailwindCSS

Axios
```
```
Backend

Node.js

Express.js

Multer (file uploads)

XLSX parser

Nodemailer (email delivery)

AI Integration

Google Gemini API
```
```
DevOps

Docker

Docker Compose

GitHub Actions (CI/CD)
```
```
Deployment

Vercel (Frontend)

Render (Backend)
```

Application Architecture
```
Frontend (React + Vite)
        │
        │ REST API
        ▼
Backend (Node.js + Express)
        │
        │
Google Gemini API → AI-generated summary
        │
        ▼
  Email delivery
```

API Documentation

Swagger documentation is available at:

Production:
```
https://rabbitt-ai-assignment.onrender.com/docs
```
This allows the team to independently test the API endpoints.


Running the Application Locally

Clone the repository:
```
git clone https://github.com/HarshitAggarwal10/Rabbitt-Ai-Assignment.git
cd Rabbitt-Ai-Assignment
```

Running with Docker (Recommended)

The entire stack can be started using Docker Compose.

Build and start containers
```
docker compose up --build
```
This will start:
```
Frontend:

http://localhost:5173
```
```
Backend API:

http://localhost:5000
```
```
Swagger Documentation:

http://localhost:5000/docs
```
Stop containers
```
docker compose down
```

Environment Variables

The backend requires environment variables for AI and email integration.

Example configuration:
```
.env.example
PORT=5000

# Gemini AI API key
GEMINI_API_KEY=your_gemini_api_key

# Email service credentials
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Allowed frontend origin
FRONTEND_URL=http://localhost:5173
```

Endpoint Security

Several measures were implemented to secure the API endpoints:

1. Environment Variable Protection

Sensitive credentials such as:

Gemini API key

Email credentials

are stored in environment variables rather than hardcoded in the source code.

2. CORS Protection

CORS is configured to only allow requests from trusted frontend origins.

Example:
```
http://localhost:5173
https://rabbitt-ai-assignment.vercel.app
```
This prevents unauthorized websites from accessing the API.


3. Input Validation

The API validates incoming requests to ensure:

a file is provided

the file format is valid

an email address is included

If validation fails, the API returns a proper error response.

4. File Handling Security

File uploads are processed using Multer memory storage, ensuring files are handled safely without writing them to disk.

CI/CD Pipeline

A GitHub Actions pipeline is configured to run on Pull Requests to the main branch.

The pipeline automatically:

installs dependencies

validates backend installation

builds the frontend project

Pipeline location:
```
.github/workflows/ci.yml
```

Deployment
Frontend (Vercel)
```
https://rabbitt-ai-assignment.vercel.app
```
Backend (Render)
```
https://rabbitt-ai-assignment.onrender.com
```
Swagger API Docs
```
https://rabbitt-ai-assignment.onrender.com/docs
```

Conclusion

The Sales Insight Automator demonstrates how AI and cloud-native DevOps practices can be combined to build scalable data analysis tools for business teams.

The system is fully containerized, documented, and deployed using modern DevOps practices.