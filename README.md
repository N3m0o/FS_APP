# Event Management System (EMS) - Backend

This is the RESTful API for the Event Management System, built with **NestJS** and **Prisma** (PostgreSQL).

## 🏗 Architecture

The backend follows a modular architecture:

- **`PrismaModule`**: Manages the database connection.
    - `PrismaService`: Extends the Prisma Client to handle DB operations.
- **`EventsModule`**: Handles all event-related business logic.
    - `EventsController`: Defines the API endpoints (`/events`).
    - `EventsService`: Contains the CRUD logic and recommendation algorithm.
    - `DTOs` (Data Transfer Objects): Define the shape of data for requests (`CreateEventDto`, `UpdateEventDto`) and enforce validation rules.

## 🚀 Key Features

- **CRUD Operations**: Complete management of events.
- **Validation**: Global pipe using `class-validator` ensures data integrity (e.g., dates must be ISO strings, titles cannot be empty).
- **Recommendation Algorithm**: Finds similar events based on the category using a simple matching logic in `EventsService.findSimilar()`.

## 🛠 API Endpoints

### Events

| Method | Endpoint | Description | Query Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/events` | Create a new event | - |
| `GET` | `/events` | List all events | `category`, `date`, `limit`, `skip` |
| `GET` | `/events/:id` | Get single event details | - |
| `PATCH` | `/events/:id` | Update an event | - |
| `DELETE` | `/events/:id` | Delete an event | - |
| `GET` | `/events/:id/similar` | Get recommended events | - |

## 💻 Setup & Running

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Database Connection**:
    Ensure your `.env` file contains the correct `DATABASE_URL`.
    *(Note: For local dev with Docker, use `postgresql://postgres:postgres@localhost:5432/events_db?schema=public`)*

3.  **Run Migrations**:
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```

4.  **Start Server**:
    ```bash
    npm run start:dev
    # Server runs on http://localhost:3000
    ```

## 🧪 Testing

You can test the API using `curl`, Postman, or the standard endpoints via browser (for GET requests).
