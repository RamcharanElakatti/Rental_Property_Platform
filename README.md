# Property Rental Marketplace

Production-ready full-stack rental marketplace starter for tenants, property owners, and administrators.

## Features

- JWT authentication with BCrypt passwords, remember-me expiry, logout, forgot/reset password flow, and role-based routes.
- Tenant workflows: profile, avatar upload, advanced search, property details, gallery, map placeholder, visit booking, cancellation, favourites, recently viewed, history, notifications.
- Owner workflows: dashboard stats, property CRUD, image upload endpoint, listing status, tenant request approval/rejection, analytics charts.
- Admin workflows: dashboard analytics, users, owners, tenants, properties, bookings, categories, property types, amenities, reports, notifications, and settings.
- REST APIs with validation, global exception handling, pagination, sorting, specification search, response wrapper, and Swagger OpenAPI.
- React 19 + Vite UI with Bootstrap 5, React Router, Axios, React Icons, Chart.js, dark mode, responsive dashboards, reusable components, forms, tables, modals, and toast notifications.

## Architecture

```text
Frontend React/Vite
  pages -> components -> services/api.js -> Spring REST API

Backend Spring Boot
  controller -> service -> mapper -> repository -> JPA entities -> MySQL

Security
  Spring Security + JWT filter + role authorities: ROLE_ADMIN, ROLE_OWNER, ROLE_TENANT
```

## Tech Stack

- Frontend: React 19, Vite, React Router, Bootstrap 5, Axios, React Icons, Chart.js, Vitest.
- Backend: Java 21, Spring Boot 3, Spring Security, JWT, Spring Data JPA, Hibernate, MySQL, Maven, Lombok, Validation, Springdoc OpenAPI.
- DevOps: Docker, Docker Compose, GitHub Actions, Vercel frontend deployment, Render backend deployment hook.

## Folder Structure

```text
backend/                Spring Boot API
frontend/               React/Vite app
database/               MySQL schema and sample data
postman/                Postman collection
.github/workflows/      CI/CD workflow
docker-compose.yml      Local full-stack runtime
```

## Database Schema

Main tables:

- `users`, `roles`, `user_roles`
- `properties`, `property_images`
- `bookings`
- `categories`, `property_types`
- `amenities`, `property_amenities`
- `favourites`
- `notifications`

SQL files:

- [database/schema.sql](database/schema.sql)
- [database/sample-data.sql](database/sample-data.sql)

## API Endpoints

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`, `POST /api/auth/logout`
- Users: `GET /api/users/me`, `PUT /api/users/me`, `POST /api/users/me/avatar`
- Properties: `GET /api/properties`, `GET /api/properties/{id}`, `POST /api/properties`, `PUT /api/properties/{id}`, `DELETE /api/properties/{id}`, `POST /api/properties/{id}/images`
- Bookings: `POST /api/bookings`, `GET /api/bookings/me`, `GET /api/bookings`, `PATCH /api/bookings/{id}/cancel`, `PATCH /api/bookings/{id}/status`
- Favourites: `GET /api/favourites`, `POST /api/favourites/{propertyId}`, `DELETE /api/favourites/{propertyId}`
- Notifications: `GET /api/notifications`, `GET /api/notifications/unread-count`, `PATCH /api/notifications/{id}/read`
- Owner: `GET /api/owner/dashboard`, `GET /api/owner/properties`, `GET /api/owner/bookings`
- Admin: `GET /api/admin/dashboard`, `GET /api/admin/reports`, `GET /api/admin/users`, `PATCH /api/admin/users/{id}/status`, `GET /api/admin/properties`, `GET /api/admin/bookings`
- Reference data: `/api/categories`, `/api/property-types`, `/api/amenities`

Swagger UI: `http://localhost:8080/swagger-ui.html`

## Environment Variables

Backend:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/property_rental_marketplace?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=root
APP_JWT_SECRET=change-this-secret-to-at-least-32-characters
APP_CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
APP_UPLOAD_DIR=uploads
```

Frontend:

```env
VITE_API_URL=http://localhost:8080/api
VITE_ENABLE_DEMO_MODE=true
```

## Run Locally

With Docker:

```bash
docker compose up --build
```

- Frontend: `http://localhost:8081`
- Backend: `http://localhost:8080`
- Swagger: `http://localhost:8080/swagger-ui.html`

Without Docker:

```bash
cd backend
./mvnw spring-boot:run
```

```bash
cd frontend
npm install
npm run dev
```

Demo users:

- `tenant@globalco.test`
- `owner@globalco.test`
- `admin@globalco.test`
- Password: `password`

## Testing

```bash
cd backend
./mvnw test
```

On Windows PowerShell, use `.\mvnw.cmd test` from the `backend` directory.

```bash
cd frontend
npm install
npm test
```

## Deployment

Frontend to Vercel:

1. Create a Vercel project with root directory `frontend`.
2. Set `VITE_API_URL` to the deployed Render backend URL plus `/api`.
3. Add GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

Backend to Render:

1. Create a Render Web Service from the repository.
2. Set root directory to `backend`.
3. Build command: `mvn clean package -DskipTests`
4. Start command: `java -jar target/property-rental-backend-1.0.0.jar`
5. Add a Render MySQL-compatible database or external MySQL provider.
6. Set backend environment variables from `backend/.env.example`.
7. Optional: add `RENDER_DEPLOY_HOOK_URL` to GitHub secrets.

## CI/CD

GitHub Actions workflow at [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml):

- Checkout repository
- Setup Java 21
- Build backend and run tests
- Setup Node 22
- Install frontend dependencies
- Run frontend tests
- Build React app
- Deploy frontend to Vercel when secrets are present
- Trigger Render deploy hook when configured

## Postman

Import [postman/PropertyRentalMarketplace.postman_collection.json](postman/PropertyRentalMarketplace.postman_collection.json). Run the Login request first; it stores the JWT token as a collection variable.

## Screenshots Placeholder

Add screenshots after the app is running:

- Landing page
- Property search
- Tenant dashboard
- Owner dashboard
- Admin dashboard

## Future Enhancements

- Email delivery for password reset and booking notifications.
- Cloud object storage for uploaded property and profile images.
- Real map integration with geocoding.
- Payments and lease document workflow.
- Audit logs and advanced reporting exports.

## AI Tools Used

Built with Codex as a full-stack coding assistant.
