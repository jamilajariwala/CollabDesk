# CollabDesk

> A project collaboration platform that helps freelancers and clients manage projects, milestones, tasks, deliverables, feedback, and approvals in one place.

CollabDesk is a full-stack MERN application designed to simplify collaboration between freelancers and their clients.

Instead of managing project updates through scattered messages, emails, and file-sharing platforms, CollabDesk provides a centralized workspace where freelancers can manage projects and clients can track progress, review deliverables, provide feedback, and approve completed work.

---

## Features

### Authentication & Security

- User registration and login
- JWT-based authentication
- Access token and refresh token system
- Tokens stored using HTTP-only cookies
- Forgot password functionality
- OTP-based password reset
- Change password functionality
- Protected routes
- Authentication state management using React Context
- Automatic token refresh using Axios interceptors

### Project Management

- Create, update, and delete projects
- Project status tracking:
  - Planning
  - In Progress
  - Completed
  - Cancelled

- Project owner/client access control
- Free-plan project limit
- Project dashboard with progress information

### Client Invitation

- Generate project invitation links
- Invite clients to individual projects
- Client can sign up or log in through the invitation flow
- Accept project invitations
- Track invitation status:
  - Not Invited
  - Pending
  - Accepted

### Milestones & Tasks

- Create and manage project milestones
- Add tasks to milestones
- Track task progress
- Task status workflow:
  - Todo
  - In Progress
  - In Review
  - Completed

- Calculate project/milestone progress based on task completion

### Deliverables

- Add project deliverables
- Supported deliverable types:
  - Links
  - Images
  - PDF files

- Upload files using Cloudinary
- Edit and delete deliverables
- Client-side deliverable visibility
- Submit deliverables for client review

### Client Review & Approval

Clients can:

- View project progress
- View milestones and tasks
- Review submitted deliverables
- Approve deliverables/tasks
- Reject deliverables/tasks
- Provide feedback or remarks

This creates a clear review workflow between the freelancer and client.

## Application Workflow

The main workflow of CollabDesk is:

```text
Freelancer
    │
    ├── Creates Project
    │
    ├── Creates Milestones
    │
    ├── Creates Tasks
    │
    ├── Invites Client
    │
    ▼
Client
    │
    ├── Accepts Invitation
    │
    ├── Views Project Progress
    │
    ├── Reviews Deliverables
    │
    ├── Approves
    │     or
    └── Rejects + Provides Feedback
              │
              ▼
        Freelancer Updates Work
```

The client has a **read-focused project view**, while the freelancer retains control over project management.

---

## Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Axios
- Context API
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- HTTP-only cookies

### Services

- Cloudinary — file and image storage
- Resend — transactional email
- Vercel — frontend deployment
- Render — backend deployment

### Development Tools

- Git
- GitHub
- Postman
- VS Code

---

### Freelancer / Owner

The project owner can:

- Create and manage projects
- Manage milestones
- Create and update tasks
- Upload deliverables
- Invite clients
- Submit work for review
- Respond to client feedback

### Client

The client can:

- View invited projects
- View project progress
- View milestones and tasks
- View deliverables
- Review submitted work
- Approve work
- Reject work
- Provide feedback

The backend verifies whether the authenticated user is the project owner or an accepted client before returning project data.

---

## Environment Variables

Create a `.env` file in the backend:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RESEND_API_KEY=your_resend_api_key
```

For the frontend, configure the backend API URL according to your environment.

**Never commit `.env` files or API keys to GitHub.**

---

## Email Setup

CollabDesk uses **Resend** for email functionality such as project invitations and authentication-related emails.

To enable email functionality locally:

1. Create a Resend account.
2. Generate your own API key.
3. Add the key to the backend `.env` file.

```env
RESEND_API_KEY=your_resend_api_key
```

Resend may restrict recipients in its testing environment until a sending domain is verified.

If you encounter this restriction, verify your own domain in Resend and configure the required DNS records.

**Never commit your Resend API key to GitHub.**

---

## Cloudinary Setup

Cloudinary is used for storing project-related files such as images and PDFs.

Add your Cloudinary credentials to the backend `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/jamilajariwala/CollabDesk.git
```

```bash
cd CollabDesk
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

Create:

```text
server/.env
```

and add the required environment variables.

### 4. Start the backend

```bash
npm run dev
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd Client
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

The application should now be available at:

```text
http://localhost:5173
```

---

## Author

**Jamila Jariwala**

Aspiring Full Stack Developer

This project is created for learning and portfolio purposes.
