# Student Enrollment App Project TODO

## Backend Setup
- [ ] Create backend directory and initialize npm
- [ ] Install backend dependencies (express, mysql2, bcryptjs, express-session, cors)
- [ ] Create server.js with basic Express setup
- [ ] Create database connection and models (students, courses, enrollments)
- [ ] Create auth routes (signup, login, logout)
- [ ] Create course routes (list courses, enroll)
- [ ] Create enrollment routes (view enrolled courses)

## Frontend Setup
- [ ] Create frontend directory and initialize React app
- [ ] Install frontend dependencies (react-router-dom, axios)
- [ ] Create pages: Signup, Login, CourseList, Enrollment, Dashboard
- [ ] Set up routing and basic UI
- [ ] Connect to backend API for auth and course management

## Database
- [ ] Create MySQL schema (students, courses, enrollments tables)
- [ ] Add sample data

## Dockerization
- [ ] Create Dockerfile for backend
- [ ] Create Dockerfile for frontend
- [ ] Create Dockerfile for MySQL (optional, or use official)
- [ ] Create docker-compose.yml for local development

## Kubernetes Deployment
- [ ] Create K8s manifests: deployment-backend.yaml, deployment-frontend.yaml, deployment-mysql.yaml
- [ ] Create services: service-backend.yaml, service-frontend.yaml, service-mysql.yaml
- [ ] Create ConfigMap and Secret for database config
- [ ] Create PersistentVolumeClaim for MySQL data
- [ ] Create ingress.yaml for external access

## Testing and Finalization
- [ ] Test local setup with docker-compose
- [ ] Verify K8s manifests
- [ ] Update README with setup instructions
