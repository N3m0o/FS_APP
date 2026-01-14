# Event Management System - Frontend

This is the modern, responsive web interface for the Event Management System, built using **Next.js 15** and **Material UI**.

## 🎨 Design & UX

-   **Modern UI**: Leveraging **Material UI (MUI)** for a polished and professional look.
-   **Dynamic Styling**: Utilizes **Pigment CSS** for zero-runtime CSS-in-JS, ensuring high performance.
-   **Interactive Maps**: Integrated **React Leaflet** for visualising event locations.
-   **Responsive Design**: Optimized for everything from mobile screens to large desktop monitors.
-   **Optimized Assets**: Uses `next/font` for superior typography performance.

## 🛠 Tech Stack

-   **Core**: [Next.js](https://nextjs.org) (App Router)
-   **Components**: [Material UI](https://mui.com/material-ui/)
-   **State & Logic**: React Hooks & Context
-   **API Communication**: [Axios](https://axios-http.com/)
-   **Date Handling**: [Day.js](https://day.js.org/)

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Ensure the backend is running (typically at `http://localhost:3000`).

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    Navigate to [http://localhost:3000](http://localhost:3000) (or the port specified by Next.js).

## 📁 Key Directories

-   [`/src/app`](file:///c:/Fs_App/frontend/src/app): Main routing and page definitions.
-   [`/src/components`](file:///c:/Fs_App/frontend/src/components): Reusable UI components.
-   [`/src/services`](file:///c:/Fs_App/frontend/src/services): API service layer (Axios).
-   [`/src/types`](file:///c:/Fs_App/frontend/src/types): TypeScript interfaces and types.

## 🧪 Development

### Linting
Run the linter to ensure code quality:
```bash
npm run lint
```

### Building for Production
```bash
npm run build
npm run start
```
