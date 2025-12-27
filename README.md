# Flowdesk Frontend

React-based frontend application for the **Flowdesk Document Routing System**. The application provides a role-based user interface for employees and administrators to upload, route, approve, reject, and track documents within an organization. This frontend communicates with the Flowdesk Backend via a secured REST API using JWT-based authentication.

---

## Tech Stack

- React 19
- Vite
- Tailwind CSS / Material UI
- Axios
- React Router
- JWT Authentication

---

## Key Features

- Secure login with JWT session handling
- Role-based UI (ADMIN, EMPLOYEE – REGULAR or SIGNATORY)
- Document upload and download
- Inbox and routing views
- Document approval and rejection
- Document version history
- Action and download audit visibility

---

## Project Structure

src/
- axios/ # Axios configuration and interceptors
- hooks/ # Custom React hooks (auth, documents, actions)
- contexts/ # Authentication context
- providers/ # Authentication provider
- repository/ # Data access layer for backend API communication
- ui/ # Reusable UI components
- ui/AdminComponents/ # UI components specific to Admin users
- ui/EmployeeComponents/ # UI components specific to Employee users
- ui/layout/ # Admin and Employee layouts
- ui/login/ # Login UI components
- assets/ # Static assets
  
---

## Backend Dependency

This frontend is designed to work with the Flowdesk Backend application. Make sure the backend is running before using the system.

Backend repository:  
https://github.com/JovanoskaJovana/DocumentRoutingSystem-Backend.git

---

## User Roles

### EMPLOYEE
- Upload documents
- View uploaded documents and their status
- Download documents
- Edit documents
- View documents routed to their department

### SIGNATORY EMPLOYEE
- Approve or reject routed documents
- Upload documents
- View uploaded documents and their status
- Download documents
- Edit documents
- View documents routed to their department
- View a list of downloaded documents

### ADMIN
- View documents across all departments
- Audit document actions and downloads
- Manage employees and departments

---

## Application Flow

1. User logs in and receives a JWT token.
2. An employee uploads a document.
3. The system automatically routes the document to the appropriate department.
4. A signatory employee from the routed department reviews and approves or rejects the document.
5. All actions, versions and downloads are tracked and visible in the system.

---

## Notes

- Authentication is handled via JWT stored in local storage.
- API communication is centralized through Axios interceptors.
- Unauthorized access automatically redirects the user to the login page.
