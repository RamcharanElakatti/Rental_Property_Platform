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
docs/                   Technical assessment documentation
.github/workflows/      CI/CD workflow
docker-compose.yml      Local full-stack runtime
```

## Technical Documentation

Full assessment-ready documentation is available at [docs/TECHNICAL_DOCUMENTATION.md](docs/TECHNICAL_DOCUMENTATION.md).

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
SPRING_DATASOURCE_URL= Database url
SPRING_DATASOURCE_USERNAME=username
SPRING_DATASOURCE_PASSWORD=password
APP_CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
APP_UPLOAD_DIR=uploads
```

Frontend:

```env
VITE_API_URL=http://localhost:8080/api

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

## CI/CD Deployment

GitHub Actions workflow: `.github/workflows/ci-cd.yml`

On every pull request to `main`, the pipeline builds/tests the backend and frontend.

On every push to `main`, the pipeline also deploys the frontend to Vercel production using the Vercel CLI from the `frontend` directory:

```text
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
```

Required GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Optional backend deploy hook secret:

- `RENDER_DEPLOY_HOOK_URL`

In Vercel, set frontend environment variables as needed:

```env
VITE_API_URL=https://your-render-backend-url/api
VITE_ENABLE_DEMO_MODE=true
```

If deploying through the Vercel dashboard instead of GitHub Actions, set the Vercel project Root Directory to `frontend`, Build Command to `npm run build`, and Output Directory to `dist`.

## Future Enhancements

- Email delivery for password reset and booking notifications.
- Cloud object storage for uploaded property and profile images.
- Real map integration with geocoding.
- Payments and lease document workflow.
- Audit logs and advanced reporting exports.


