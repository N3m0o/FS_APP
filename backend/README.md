# Event Management System (EMS) - Backend

This is a robust RESTful API for managing events, built with **NestJS** and **Prisma ORM**, backed by **PostgreSQL**.

## 🏗 Modular Architecture

The backend is designed with scalability and maintainability in mind, following a clear modular structure:

-   **`PrismaModule`**: Centralized database connection and management.
-   **`EventsModule`**: Encapsulates all event-related business logic, including:
    -   `EventsController`: Clean API endpoint definitions.
    -   `EventsService`: Core logic layer featuring a **Similarity Recommendation Algorithm**.
    -   `DTOs`: Strongly-typed Data Transfer Objects for validation and documentation.

## 🌟 Key Features

-   **Intelligent Recommendations**: A custom algorithm to find similar events based on categories.
-   **Type-Safe Database Access**: Using **Prisma ORM** for efficient and safe PostgreSQL operations.
-   **Global Validation**: Powered by `class-validator`, ensuring all incoming data is sanitized and valid.
-   **Comprehensive API**: Full CRUD capabilities with advanced filtering and pagination.

## 🛠 API Documentation

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/events` | Create a new event | - |
| `GET` | `/events` | List all events | `category`, `date`, `limit`, `skip` |
| `GET` | `/events/:id` | Get event details | - |
| `PATCH` | `/events/:id` | Update an event | - |
| `DELETE` | `/events/:id` | Delete an event | - |
| `GET` | `/events/:id/similar` | Get recommended events | - |

## 🚀 Setup & Execution

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Database Migration**:
    ```bash
    npx prisma generate
    npx prisma migrate dev
    ```

3.  **Run the application**:
    ```bash
    npm run start:dev
    ```

## 🧪 Testing & Quality

-   **Unit & Integration Tests**: Run `npm run test` to execute the test suite.
-   **E2E Testing**: Run `npm run test:e2e` for end-to-end API validation.
-   **Linting**: Run `npm run lint` for code style enforcement.
