# HireReady AI 

> **AI-powered interview preparation and job-readiness platform that analyzes your resume, profile, and target job description to generate a personalized interview strategy.**

HireReady AI helps candidates prepare for job interviews by analyzing their **resume, self-description, and target job description** using Google Gemini. It identifies the candidate's job-match score and skill gaps, generates technical and behavioral interview questions, creates a personalized preparation roadmap, and can generate an ATS-friendly tailored resume in PDF format.

---

##  Features

###  User Authentication

* User registration and login
* Password hashing using **bcrypt**
* JWT-based authentication
* Authentication token stored in an **HTTP-only cookie**
* Protected API routes
* Logout functionality
* Token blacklist mechanism
* Current-user (`get-me`) endpoint

### 📄 Resume & Profile Analysis

Candidates can provide their profile information through:

* Resume upload
* Self-description
* Target job description

The backend extracts text from uploaded PDF resumes and sends the relevant candidate information to the AI service.

### 🤖 AI-Powered Interview Analysis

HireReady AI uses **Google Gemini** to analyze the candidate's profile against the target job description.

The generated report includes:

* Job match score
* Technical interview questions
* Behavioral interview questions
* Interviewer intention behind each question
* Suggested/model answers
* Skill gaps
* Skill-gap severity
* Day-wise interview preparation roadmap
* Job title

###  Match Score

The AI generates a score between **0 and 100** representing how closely the candidate's profile matches the provided job description.

###  Skill Gap Analysis

The system identifies missing or weak skills and categorizes them by severity:

* High
* Medium
* Low

###  Technical & Behavioral Questions

Each generated question contains:

* Question
* Interviewer's intention
* Suggested approach/model answer

This helps candidates understand not only **what** may be asked but also **why** the interviewer may ask it and how to approach the answer.

###  Personalized Preparation Roadmap

The AI generates a day-wise preparation plan containing:

* Day number
* Main focus
* Preparation tasks

The current AI prompt requests a **7-day preparation plan**.

###  AI-Generated Resume

Candidates can generate a job-tailored resume based on:

* Existing resume content
* Self-description
* Target job description

The AI generates ATS-friendly HTML, which is converted into a PDF using **Puppeteer**.

###  Previous Interview Reports

Authenticated users can access their previously generated interview reports.

Reports are sorted by creation date, with the newest reports displayed first.

---

#  Project Architecture

```text
                         ┌──────────────────────┐
                         │      React UI        │
                         │      + Vite          │
                         └──────────┬───────────┘
                                    │
                              HTTP / REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │                      │
                         │ Controllers          │
                         │ Routes               │
                         │ Middleware           │
                         │ Services             │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
             ┌───────────┐   ┌──────────────┐  ┌─────────────┐
             │ MongoDB   │   │ Google       │  │ Puppeteer   │
             │ + Mongoose│   │ Gemini AI    │  │ HTML → PDF  │
             └───────────┘   └──────────────┘  └─────────────┘
```

---

#  Tech Stack

## Frontend

| Technology   | Purpose             |
| ------------ | ------------------- |
| React        | UI development      |
| Vite         | Frontend build tool |
| React Router | Client-side routing |
| Axios        | API communication   |
| SCSS         | Styling             |
| JavaScript   | Application logic   |

## Backend

| Technology    | Purpose                |
| ------------- | ---------------------- |
| Node.js       | Runtime                |
| Express.js    | REST API               |
| MongoDB       | Database               |
| Mongoose      | MongoDB ODM            |
| JWT           | Authentication         |
| bcryptjs      | Password hashing       |
| Cookie Parser | Cookie handling        |
| CORS          | Cross-origin requests  |
| Multer        | File upload handling   |
| pdf-parse     | PDF text extraction    |
| Google Gemini | AI analysis            |
| Zod           | AI response validation |
| Puppeteer     | HTML-to-PDF generation |

---

#  Project Structure

```text
HireReady-AI/
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   │
│   └── src/
│       ├── app.js
│       │
│       ├── config/
│       │   └── database.js
│       │
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── interview.controller.js
│       │
│       ├── middlewares/
│       │   ├── auth.middlewares.js
│       │   └── file.middleware.js
│       │
│       ├── models/
│       │   ├── blacklist.model.js
│       │   ├── interviewReport.model.js
│       │   └── user.model.js
│       │
│       ├── routes/
│       │   ├── auth.routes.js
│       │   └── interview.routes.js
│       │
│       └── services/
│           └── ai.service.js
│
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   ├── vite.config.js
│   │
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── app.routes.jsx
│       ├── App.css
│       ├── style.scss
│       │
│       ├── style/
│       │   └── button.scss
│       │
│       └── features/
│           │
│           ├── auth/
│           │   ├── auth.context.jsx
│           │   ├── auth.form.scss
│           │   ├── components/
│           │   │   └── Protected.jsx
│           │   ├── hooks/
│           │   │   └── useAuth.js
│           │   ├── pages/
│           │   │   ├── Login.jsx
│           │   │   └── Register.jsx
│           │   └── services/
│           │       └── auth.api.js
│           │
│           └── interview/
│               ├── interview.context.jsx
│               ├── hooks/
│               │   └── useInterview.js
│               ├── pages/
│               │   ├── Home.jsx
│               │   └── Interview.jsx
│               ├── services/
│               │   └── interview.api.js
│               └── style/
│                   ├── home.scss
│                   └── interview.scss
│
└── .gitignore
```

---

#  Application Flow

## 1. User Registration

```text
User
 │
 │ username + email + password
 ▼
React Register Page
 │
 │ POST /api/auth/register
 ▼
Express API
 │
 ▼
Auth Controller
 │
 ├── Validate input
 ├── Check existing user
 ├── Hash password using bcrypt
 ├── Create user
 └── Generate JWT
 │
 ▼
HTTP-only Cookie
```

---

## 2. User Login

```text
Login Form
    │
    │ email + password
    ▼
POST /api/auth/login
    │
    ▼
Auth Controller
    │
    ├── Find user
    ├── Compare password
    ├── Generate JWT
    └── Set HTTP-only cookie
    │
    ▼
Authenticated User
```

---

## 3. Generate Interview Report

```text
Candidate
   │
   ├── Resume PDF
   ├── Self Description
   └── Job Description
          │
          ▼
     React Frontend
          │
          │ multipart/form-data
          ▼
   POST /api/interview/
          │
          ▼
   Authentication Middleware
          │
          ▼
      Multer
          │
          ▼
     PDF Parser
          │
          ▼
    Resume Text
          │
          ▼
    Gemini AI Service
          │
          ├── Match Score
          ├── Technical Questions
          ├── Behavioral Questions
          ├── Skill Gaps
          ├── Preparation Plan
          └── Job Title
          │
          ▼
   Zod Validation
          │
          ▼
      MongoDB
          │
          ▼
    Interview Report
          │
          ▼
      React UI
```

---

#  AI Response Structure

The Gemini response is validated using a Zod schema.

Conceptually, the generated report follows this structure:

```json
{
  "matchScore": 85,
  "title": "Java Full Stack Developer",
  "technicalQuestions": [
    {
      "question": "Explain REST APIs.",
      "intention": "Evaluate backend fundamentals.",
      "answer": "..."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a challenging project.",
      "intention": "Evaluate problem-solving and communication.",
      "answer": "..."
    }
  ],
  "skillGaps": [
    {
      "skill": "Spring Boot",
      "severity": "medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Core Java",
      "tasks": [
        "Revise OOP concepts",
        "Practice Java problems"
      ]
    }
  ]
}
```

Using schema validation helps ensure that the AI response follows the expected structure before it is stored in MongoDB.

---

#  Authentication Architecture

HireReady AI uses **JWT authentication with HTTP-only cookies**.

### Login

After successful authentication:

```text
JWT
 │
 ▼
HTTP-only Cookie
 │
 ▼
Browser
```

The frontend sends requests using:

```javascript
withCredentials: true
```

The backend authentication middleware then:

1. Reads the token from the cookie.
2. Checks whether the token exists.
3. Checks the blacklist collection.
4. Verifies the JWT.
5. Attaches decoded user information to `req.user`.
6. Allows the request to continue.

```javascript
req.user = decoded;
next();
```

---

#  Protected Routes

Interview-related routes require authentication.

```text
POST   /api/interview/
GET    /api/interview/
GET    /api/interview/report/:interviewId
POST   /api/interview/resume/pdf/:interviewReportId
```

The authentication middleware is applied before the controller.

---

# 📡 API Documentation

## Authentication APIs

### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "username": "devansh",
  "email": "devansh@example.com",
  "password": "your-password"
}
```

---

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "devansh@example.com",
  "password": "your-password"
}
```

---

### Get Current User

```http
GET /api/auth/get-me
```

Requires authentication cookie.

---

### Logout

```http
GET /api/auth/logout
```

The current token is added to the blacklist and the authentication cookie is cleared.

---

# 🎯 Interview APIs

## Generate Interview Report

```http
POST /api/interview/
```

### Content-Type

```text
multipart/form-data
```

### Fields

```text
jobDescription
selfDescription
resume
```

The `resume` field contains the uploaded PDF file.

---

## Get All Reports

```http
GET /api/interview/
```

Returns reports belonging to the authenticated user.

---

## Get Single Report

```http
GET /api/interview/report/:interviewId
```

Example:

```text
/api/interview/report/68xxxxxxxxxxxxxxxxxxxx
```

---

## Generate Tailored Resume

```http
POST /api/interview/resume/pdf/:interviewReportId
```

Returns:

```text
application/pdf
```

The frontend automatically downloads the generated PDF.

---

# 🗄️ Database Models

## User

The user collection stores:

```text
username
email
password
```

Passwords are stored as bcrypt hashes rather than plain text.

---

## Interview Report

Each report contains:

```text
jobDescription
resume
selfDescription
matchScore
technicalQuestions
behavioralQuestions
skillGaps
preparationPlan
user
title
createdAt
updatedAt
```

The report is associated with the authenticated user.

---

## Blacklisted Token

Used during logout.

```text
token
createdAt
updatedAt
```

When a user logs out, the JWT is stored in the blacklist collection so that it cannot be reused.

---

#  Frontend Architecture

The frontend follows a feature-based structure.

```text
features/
│
├── auth/
│   ├── context
│   ├── hooks
│   ├── pages
│   ├── components
│   └── services
│
└── interview/
    ├── context
    ├── hooks
    ├── pages
    ├── services
    └── styles
```

### Auth Context

Maintains:

```text
user
loading
```

and authentication operations such as:

```text
handleLogin()
handleRegister()
handleLogout()
```

### Interview Context

Maintains:

```text
report
reports
loading
```

and is consumed through `useInterview()`.

### Protected Route

The `Protected` component checks authentication before rendering private pages.

```text
Authenticated?
   │
   ├── Yes → Render page
   │
   └── No → Redirect to /login
```

---

# 🎨 User Interface

The application uses a dark-themed interface with SCSS.

### Main Screens

#### Authentication

* Login
* Register

#### Home

* Target Job Description
* Resume upload
* Self-description
* Generate Interview Strategy
* Previous reports

#### Interview Report

* Match score
* Technical questions
* Behavioral questions
* Skill gaps
* Preparation roadmap
* Resume download

---

# ⚙️ Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_API_KEY=your_google_gemini_api_key

NODE_ENV=development

GOOGLE_GEMINI_MODELS=gemini-3.5-flash,gemini-3.5-flash-lite
```

> Never commit `.env` or API keys to GitHub.

---

#  Installation & Setup

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB or MongoDB Atlas
* Google Gemini API key

---

## 1. Clone Repository

```bash
git clone https://github.com/your-username/HireReady-AI.git
```

```bash
cd HireReady-AI
```

---

#  Backend Setup

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Add your environment variables.

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

---

#  Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

#  Local Development

```text
Frontend
http://localhost:5173
        │
        │ Axios + credentials
        ▼
Backend
http://localhost:3000
        │
        ├── MongoDB
        │
        └── Google Gemini API
```

CORS is configured for the local Vite frontend:

```text
http://localhost:5173
```

---

#  Resume Generation Pipeline

HireReady AI can generate a customized resume using the following pipeline:

```text
Existing Resume
       +
Self Description
       +
Job Description
       │
       ▼
   Google Gemini
       │
       ▼
ATS-friendly HTML
       │
       ▼
   Puppeteer
       │
       ▼
    PDF Resume
```

The generated PDF is returned from the backend as an `application/pdf` response.

---

#  Security Considerations

The application includes several security-related mechanisms:

* Password hashing using bcrypt
* JWT authentication
* HTTP-only authentication cookies
* JWT expiration
* Token blacklist on logout
* Protected API routes
* CORS configuration
* File-size limitation through Multer
* Structured AI response validation using Zod

For production deployment, additional security hardening is recommended, including stronger cookie configuration, rate limiting, input validation, security headers, and production-specific CORS configuration.

---

#  Current Limitations

The current implementation has a few areas that can be improved:

* Resume processing currently parses **PDF** content on the backend.
* The frontend displays DOCX as an upload option, but DOCX parsing is not currently implemented in the backend.
* The frontend API base URL is currently configured for local development.
* There is no dedicated automated test suite yet.
* Rate limiting is not currently implemented.
* AI-generated results depend on the configured Gemini model and API availability.
* Resume generation uses AI-generated HTML and Puppeteer, so PDF output depends on the generated HTML.
* Production deployment configuration is not included in the current project.

---

#  Future Improvements

Potential improvements include:

* [ ] DOCX resume parsing
* [ ] Production deployment
* [ ] Docker support
* [ ] Automated unit and integration tests
* [ ] API rate limiting
* [ ] Better input validation
* [ ] Resume version history
* [ ] Resume comparison
* [ ] Job-description keyword extraction
* [ ] ATS keyword analysis
* [ ] More detailed skill-gap recommendations
* [ ] Interview difficulty selection
* [ ] Mock interview mode
* [ ] AI voice interview
* [ ] Interview performance tracking
* [ ] Dashboard with preparation progress
* [ ] Multiple resume templates
* [ ] Job application tracking
* [ ] Cloud file storage
* [ ] Email-based authentication
* [ ] Password reset functionality

---

#  Development Commands

## Backend

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## Frontend

Install dependencies:

```bash
npm install
```

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

---

#  Development Workflow

A typical user journey looks like:

```text
1. Register
      ↓
2. Login
      ↓
3. Enter Job Description
      ↓
4. Upload Resume
      ↓
5. Add Self Description
      ↓
6. Generate Interview Strategy
      ↓
7. AI analyzes candidate profile
      ↓
8. Interview report saved to MongoDB
      ↓
9. View Match Score
      ↓
10. Review Skill Gaps
      ↓
11. Practice Technical Questions
      ↓
12. Practice Behavioral Questions
      ↓
13. Follow Preparation Roadmap
      ↓
14. Generate Tailored Resume
      ↓
15. Download Resume PDF
```

---

#  Example Output

A generated report may contain:

```text
Job Title
Java Full Stack Developer

Match Score
82%

Skill Gaps
• Spring Boot — High
• System Design — Medium
• Docker — Low

Technical Questions
• Explain REST architecture.
• How does JWT authentication work?
• Explain dependency injection in Spring.
• How would you optimize a SQL query?
• Explain React state management.

Behavioral Questions
• Tell me about yourself.
• Describe a challenging project.
• Tell me about a time you solved a difficult bug.
• How do you handle deadlines?
• Why should we hire you?

Preparation Roadmap

Day 1 → Core Java
Day 2 → DSA
Day 3 → Spring Boot
Day 4 → REST APIs & SQL
Day 5 → React
Day 6 → Project & Behavioral Preparation
Day 7 → Mock Interview
```

---

#  Why HireReady AI?

Traditional interview preparation often gives candidates generic questions.

HireReady AI instead focuses on the relationship between:

```text
Candidate
    +
Resume
    +
Skills
    +
Target Job
    ↓
Personalized Interview Strategy
```

This makes the preparation process more targeted toward the specific role a candidate is applying for.

---

**HireReady AI — Prepare smarter. Interview better. **
