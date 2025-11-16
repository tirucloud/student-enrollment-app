# Student Course Enrollment App

A full-stack web application for student course enrollment with authentication, course browsing, and enrollment management.

## Features

- User registration and login
- Course browsing and enrollment
- Dashboard for enrolled courses
- Session-based authentication
- Responsive UI with Bootstrap

## Tech Stack

- **Backend**: Node.js, Express.js, MySQL, bcryptjs, express-session
- **Frontend**: React, React Router, Axios, Bootstrap
- **Database**: MySQL
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes (EKS)

## Local Development Setup

### Prerequisites

- Node.js (v18+)
- MySQL (v8.0+)
- Docker & Docker Compose (optional, for containerized setup)

### Option 1: Docker Compose Setup

1. Clone the repository
2. Navigate to the project directory
3. Run the application:

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Option 2: Manual Setup

1. **Database Setup**:
   - Create a MySQL database named `student_enrollment`
   - Run the SQL script in `schema.sql` to create tables and insert sample data

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create .env file with database credentials
   npm start
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Kubernetes Deployment (EKS)

### Prerequisites

- AWS CLI configured
- kubectl installed and configured for EKS cluster
- Docker registry access

### Deployment Steps

1. **Build and push Docker images**:
   ```bash
   # Build backend image
   docker build -f Dockerfile.backend -t your-registry/backend:latest .
   docker push your-registry/backend:latest

   # Build frontend image
   docker build -f Dockerfile.frontend -t your-registry/frontend:latest .
   docker push your-registry/frontend:latest
   ```

2. **Update image references in K8s manifests**:
   - Edit `k8s/deployment-backend.yaml` and `k8s/deployment-frontend.yaml` with your registry URLs

3. **Deploy to EKS**:
   ```bash
   # Apply configurations
   kubectl apply -f k8s/configmap.yaml
   kubectl apply -f k8s/secret.yaml
   kubectl apply -f k8s/pvc.yaml
   kubectl apply -f k8s/deployment-mysql.yaml
   kubectl apply -f k8s/deployment-backend.yaml
   kubectl apply -f k8s/deployment-frontend.yaml
   kubectl apply -f k8s/ingress.yaml
   ```

4. **Get external IP**:
   ```bash
   kubectl get services
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses/:id/enroll` - Enroll in a course

### Enrollments
- `GET /api/enrollments` - Get user's enrolled courses

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=student_enrollment
SESSION_SECRET=your_session_secret
PORT=5000
```

## Project Structure

```
student-enrollment-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── db.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── k8s/
│   ├── deployment-backend.yaml
│   ├── deployment-frontend.yaml
│   ├── deployment-mysql.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── pvc.yaml
│   └── ingress.yaml
├── schema.sql
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is licensed under the MIT License.
