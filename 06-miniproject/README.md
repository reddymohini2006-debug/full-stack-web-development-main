# Student Management System (SMS)
### Full-Stack Architecture: React.js (Vite) & Spring Boot 3 (Java 21) & MySQL 8.0
### Multi-Cloud Deployment: Vercel (Frontend) & Render (Backend)

[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite_5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot_3.3-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21_LTS-ED8B00?logo=openjdk&logoColor=white)](https://adoptium.net/)
[![MySQL](https://img.shields.io/badge/Database-MySQL_8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Deployed-Render-46E3B7?logo=render&logoColor=black)](https://render.com/)

---

## 1. Project Introduction

The **Student Management System (SMS)** is an enterprise-grade full-stack web application designed for academic institutions to manage student lifecycle records, monitor department distributions, and track enrollment metrics. 

Beyond core CRUD operations, the project serves as a comprehensive demonstration of modern software engineering: from **local workstation execution** to **production cloud deployment** across decoupled multi-cloud platforms (**Vercel** for the React Single Page Application and **Render** for the containerized Spring Boot REST API).

---

## 2. Project Objectives

1. **Academic Student Lifecycle Management**: Enable administrators to register, view, search, filter, update, and delete student records with relational integrity.
2. **RESTful Architecture**: Implement a decoupled client-server architecture communicating via standardized REST APIs with JSON payloads.
3. **Enterprise Data Persistence**: Leverage Spring Data JPA and Hibernate ORM for structured database operations and automated schema synchronization with MySQL.
4. **Local vs Cloud Comparative Analysis**: Concrete exploration and live demonstration of the operational differences between local developer execution and production cloud deployments.
5. **Decoupled Cloud Hosting**:
   - Host the responsive React SPA on **Vercel's Global Edge Network** for millisecond content delivery.
   - Deploy the Java 21 Spring Boot backend on **Render** via Docker containerization with automated health monitoring.
   - Connect securely to cloud-hosted MySQL without exposing sensitive database credentials.

---

## 3. Technology Stack

### Frontend
- **Framework**: React.js 18 (Functional Components, Hooks)
- **Tooling & Bundler**: Vite 5
- **Markup & Styling**: Semantic HTML5, CSS3 Custom Properties (Modern SaaS Design System, Glassmorphism, Responsive Grid)
- **HTTP Client**: Axios (with response interceptors and timeout resilience)
- **Icons**: SVG & Lucide React

### Backend
- **Language**: Java 21 LTS
- **Framework**: Spring Boot 3.3.5
- **Modules**:
  - `spring-boot-starter-web` (RESTful Controllers & DispatcherServlet)
  - `spring-boot-starter-data-jpa` (Spring Data Repositories & Transaction Management)
  - `hibernate-core` (Object-Relational Mapping & Validation)
  - `spring-boot-starter-validation` (Bean Validation API constraints)
  - `spring-boot-starter-actuator` (Production health endpoints & metrics)
- **Database Driver**: `mysql-connector-j` 8.x
- **Build Tool**: Apache Maven 3.9+
- **Containerization**: Multi-stage Dockerfile (Alpine JRE 21)

### Database
- **Local**: MySQL Server 8.0 Community Edition
- **Cloud Hosted**: Managed MySQL (Aiven, PlanetScale, or Railway)

### Cloud Platforms
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render (Docker Runtime Web Service)

---

## 4. Project Folder Structure

```
fs_miniproject/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/sms/studentmanagement/
│   │   │   │   ├── StudentManagementApplication.java    # Spring Boot Main Entrypoint
│   │   │   │   ├── controller/
│   │   │   │   │   ├── StudentController.java          # REST API Endpoints (/api/students)
│   │   │   │   │   └── HealthController.java           # Health Check (/api/health)
│   │   │   │   ├── model/
│   │   │   │   │   ├── Student.java                    # JPA Entity (Table: students)
│   │   │   │   │   └── DashboardStats.java             # DTO for Aggregated Analytics
│   │   │   │   ├── repository/
│   │   │   │   │   └── StudentRepository.java          # Spring Data JPA Interface
│   │   │   │   ├── service/
│   │   │   │   │   ├── StudentService.java             # Service Interface
│   │   │   │   │   └── impl/StudentServiceImpl.java    # Business Logic & Validation
│   │   │   │   ├── exception/
│   │   │   │   │   ├── ResourceNotFoundException.java  # HTTP 404 Handler
│   │   │   │   │   ├── DuplicateResourceException.java # HTTP 409 Conflict Handler
│   │   │   │   │   ├── BadRequestException.java        # HTTP 400 Bad Request
│   │   │   │   │   ├── ErrorDetails.java               # Standardized Error Response Model
│   │   │   │   │   └── GlobalExceptionHandler.java     # Centralized ControllerAdvice
│   │   │   │   └── config/
│   │   │   │       ├── CorsConfig.java                 # Cross-Origin Configuration
│   │   │   │       └── DataSeeder.java                 # Auto-seeding Initial Records
│   │   │   └── resources/
│   │   │       ├── application.properties              # Production-ready Config (MySQL + Env Vars)
│   │   │       ├── application-h2.properties           # Optional In-Memory Profile
│   │   │       ├── schema.sql                          # MySQL Schema Definition
│   │   │       └── data.sql                            # Sample Student Records
│   │   └── test/
│   │       └── java/com/sms/studentmanagement/
│   │           └── StudentManagementApplicationTests.java # Automated Integration Tests
│   ├── pom.xml                                         # Maven Project Object Model
│   ├── Dockerfile                                      # Multi-Stage Docker Container Build
│   └── render.yaml                                     # Render Infrastructure-as-Code Blueprint
├── frontend/
│   ├── index.html                                      # Vite SPA HTML Template
│   ├── package.json                                    # Frontend Dependencies & Scripts
│   ├── vite.config.js                                  # Vite Configuration & Dev Proxy
│   ├── vercel.json                                     # Vercel Deployment & SPA Routing Rules
│   ├── .env                                            # Local Environment Variables
│   ├── .env.example                                    # Environment Variables Template
│   ├── .env.production                                 # Production Cloud Environment Template
│   └── src/
│       ├── main.jsx                                    # React DOM Mount Entrypoint
│       ├── App.jsx                                     # Root Application Layout & State
│       ├── index.css                                   # SaaS Design System & Styles
│       ├── api/
│       │   └── studentApi.js                           # Axios Client & REST Service Calls
│       ├── components/
│       │   ├── Navbar.jsx                              # Responsive Nav & Backend Ping Monitor
│       │   ├── Footer.jsx                              # Footer Meta Information
│       │   ├── Notification.jsx                        # Toast Message Alert System
│       │   ├── ConfirmModal.jsx                        # Interactive Delete Confirmation
│       │   └── StudentDetailsModal.jsx                 # Full Student Profile Inspector
│       ├── pages/
│       │   ├── Dashboard.jsx                           # Analytics Cards & Department Bars
│       │   ├── StudentList.jsx                         # Search, Filter, Sort & Table Actions
│       │   ├── StudentForm.jsx                         # Add / Update Student Form with Validation
│       │   └── DeploymentComparison.jsx                # Architecture & Cloud vs Local Analysis
│       └── utils/
│           └── constants.js                            # Departments, Badges, Validation Logic
├── database/
│   └── student_management.sql                          # Standalone SQL Schema & Seed Script
└── README.md                                           # Comprehensive Project Documentation
```

---

## 5. REST API Documentation

Base Path: `/api`

| Method | Endpoint | Description | Request Body | Response Codes |
|---|---|---|---|---|
| `GET` | `/api/students` | Retrieve all student records (supports `?search=keyword`) | None | `200 OK` |
| `GET` | `/api/students/{id}` | Retrieve specific student by database ID | None | `200 OK`, `404 Not Found` |
| `GET` | `/api/students/stats` | Retrieve aggregated dashboard counts & cohort distributions | None | `200 OK` |
| `POST` | `/api/students` | Register a new student record | JSON Student Object | `201 Created`, `400 Bad Request`, `409 Conflict` |
| `PUT` | `/api/students/{id}` | Update existing student information | JSON Student Object | `200 OK`, `400 Bad Request`, `404 Not Found`, `409 Conflict` |
| `DELETE` | `/api/students/{id}` | Permanently delete a student by ID | None | `200 OK`, `404 Not Found` |
| `GET` | `/api/health` | Service health status check for Render uptime | None | `200 OK` |

### Sample JSON Payloads

#### Student Creation (`POST /api/students`)
```json
{
  "studentId": "STU1009",
  "fullName": "Divya Sharma",
  "email": "divya.sharma@example.edu",
  "phoneNumber": "+91 98765 12345",
  "department": "Computer Science",
  "yearOfStudy": "2nd Year",
  "address": "45 Cyber City, HITEC City, Hyderabad, Telangana"
}
```

#### Success Response (`201 Created`)
```json
{
  "id": 9,
  "studentId": "STU1009",
  "fullName": "Divya Sharma",
  "email": "divya.sharma@example.edu",
  "phoneNumber": "+91 98765 12345",
  "department": "Computer Science",
  "yearOfStudy": "2nd Year",
  "address": "45 Cyber City, HITEC City, Hyderabad, Telangana",
  "createdAt": "2026-11-15T19:30:00",
  "updatedAt": "2026-11-15T19:30:00"
}
```

#### Error Response Format (`400 / 409 / 404`)
```json
{
  "timestamp": "2026-11-15T19:30:00",
  "status": 409,
  "error": "Conflict / Duplicate Entry",
  "message": "Student ID 'STU1009' is already registered.",
  "path": "/api/students"
}
```

---

## 6. Local Installation & Execution Steps

### Prerequisites
1. **Java Development Kit (JDK 21 or higher)**
2. **Node.js (v18 or higher) and npm**
3. **MySQL Server 8.0**
4. **Apache Maven 3.9+** (or IntelliJ IDEA Maven wrapper)

---

### Step 1: Database Setup (MySQL)
Open MySQL Workbench, MySQL Shell, or your terminal:
```sql
CREATE DATABASE IF NOT EXISTS student_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Run the initialization script from the project root:
```bash
mysql -u root -p student_management < database/student_management.sql
```
*(The backend `DataSeeder` also automatically initializes sample data on startup if the database is blank).*

---

### Step 2: Backend Configuration & Execution
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Verify your MySQL credentials in `src/main/resources/application.properties` (or set environment variables):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/student_management?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```
3. Run the Spring Boot application using Maven:
   ```bash
   mvn spring-boot:run
   ```
4. Verify backend health by visiting:
   ```
   http://localhost:8080/api/health
   ```
   Expected response: `{"status": "UP", "service": "Student Management System API"}`.

---

### Step 3: Frontend Configuration & Execution
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Check the `.env` file to ensure it points to the local backend:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and access the application:
   ```
   http://localhost:5173
   ```

---

## 7. Cloud Deployment Guide

```
+------------------+         HTTPS          +--------------------------------+
|    End User      | ---------------------> |      Vercel (React Frontend)   |
|   (Browser/UI)   |                        |   https://<app>.vercel.app     |
+------------------+                        +--------------------------------+
                                                            |
                                                            | REST API Calls (CORS enabled)
                                                            v
+------------------+      JDBC (SSL: 3306)  +--------------------------------+
|  Hosted MySQL DB | <--------------------- |     Render (Spring Boot API)   |
| (Aiven/Railway)  |                        |  https://<app>.onrender.com    |
+------------------+                        +--------------------------------+
```

### A. Backend Deployment on Render

1. **Host a Cloud MySQL Database**:
   - Provision a free MySQL database on **Aiven** (`aiven.io`), **Railway** (`railway.app`), or **Clever Cloud**.
   - Copy the MySQL Connection URI, database name, username, and password.
   - Run `database/student_management.sql` on the cloud database.

2. **Deploy to Render**:
   - Log in to **Render** (`render.com`).
   - Click **New +** &rarr; **Web Service**.
   - Connect your GitHub repository.
   - Set **Root Directory** to `backend`.
   - Select **Docker** as the Runtime (Render automatically detects `Dockerfile`).
   - Choose the **Free** instance type.
   - Set the Health Check Path to: `/api/health`.

3. **Configure Environment Variables in Render**:
   Under the **Environment** tab, add the following variables:
   | Key | Value | Notes |
   |---|---|---|
   | `PORT` | `8080` | Render assigns internal port |
   | `SPRING_PROFILES_ACTIVE` | `prod` | Production profile |
   | `SPRING_DATASOURCE_URL` | `jdbc:mysql://<host>:<port>/<dbname>?useSSL=true&allowPublicKeyRetrieval=true` | Cloud DB URL |
   | `SPRING_DATASOURCE_USERNAME` | `<cloud_db_username>` | Database User |
   | `SPRING_DATASOURCE_PASSWORD` | `<cloud_db_password>` | Database Password |
   | `CORS_ALLOWED_ORIGINS` | `https://*.vercel.app,http://localhost:5173` | Allowed Frontend Origins |

4. Click **Deploy Web Service**.
5. Once deployment completes, copy your Render public URL (e.g., `https://student-management-api.onrender.com`).

---

### B. Frontend Deployment on Vercel

1. **Deploy to Vercel**:
   - Log in to **Vercel** (`vercel.com`).
   - Click **Add New...** &rarr; **Project**.
   - Import your GitHub repository.
   - Set **Root Directory** to `frontend`.
   - Framework Preset will auto-detect as **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`

2. **Configure Environment Variables in Vercel**:
   In the **Environment Variables** section, add:
   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://your-backend-app.onrender.com/api` |

3. Click **Deploy**.
4. Vercel provisions the build across global edge locations.
5. In your Render backend settings, update `CORS_ALLOWED_ORIGINS` with your exact Vercel URL (e.g. `https://student-management-ui.vercel.app`).

---

## 8. Local Execution vs Cloud Deployment: Deep Comparison

| Feature / Criteria | Local Execution | Cloud Deployment (Vercel + Render) |
|---|---|---|
| **Application Hosting** | Ran on local host workstation via developer runtime processes (`npm run dev` & `mvn spring-boot:run`). | Decoupled architecture: Frontend distributed globally on Vercel Edge CDN; Backend containerized on Render Linux VM. |
| **Accessibility** | Restricted strictly to `localhost` (`127.0.0.1`). Inaccessible outside the developer's private device or LAN. | Globally accessible 24/7 over secure public URLs across any browser or mobile device worldwide. |
| **Server Environment** | Dependent on local workstation hardware, OS quirks (Windows/macOS), local Java 21 path, and local Node installation. | Uniform Alpine Linux container with OpenJDK 21, guaranteeing 100% reproducible builds and zero environment drift. |
| **Database Connectivity** | Connects to local MySQL daemon on port 3306. If the local machine sleeps, the database goes offline. | Connects over encrypted TLS/SSL to managed cloud MySQL databases with automated snapshots and high availability. |
| **Configuration** | Handled through local `.properties` and `.env` files stored on disk. | Injected securely via cloud dashboard secrets vaults without ever exposing passwords in the source code. |
| **Availability & Uptime** | Available only while the computer is turned on and terminal processes are actively running. | 99.9% uptime backed by Vercel global CDN edge locations and Render auto-restarting process supervisors. |
| **Scalability** | Fixed to single machine hardware capacity (RAM, CPU cores). Cannot scale out. | Infinite horizontal frontend scaling via CDN; dynamic vertical and horizontal container scaling on Render. |
| **Maintenance** | Manual restarts required on every change; no rollbacks, no automated health checks. | Automated CI/CD pipelines trigger instant builds on `git push`, atomic deployments, and instant zero-downtime rollbacks. |

### Why Vercel for Frontend?
1. **Global CDN**: Delivers pre-compiled HTML, CSS, and JS bundles from the nearest edge datacenter to the user.
2. **Native Vite Optimization**: Seamless asset compression, Brotli/Gzip caching, and instant SPA routing rewrites.
3. **Automated SSL**: Automatic Let's Encrypt certificate renewal for all custom domains.

### Why Render for Backend?
1. **Docker Container Support**: Runs full JVM containers without cold-boot execution time limits of traditional serverless functions.
2. **Secrets Management**: Securely isolates database credentials away from version control.
3. **Health Check Integration**: Integrates directly with `/api/health` to perform zero-downtime rolling deploys.

---

## 9. User Interface Features

- **Executive Dashboard**: Live student counts, department counter, student cohort breakdown, and interactive percentage bars.
- **Student Directory**: High-performance searchable and filterable table with column sorting and single-click CSV export.
- **Modal Profile Viewer**: Comprehensive student profile card displaying enrollment timestamps, contact actions, and department badges.
- **Add & Edit Forms**: Comprehensive form validation with immediate inline feedback, phone pattern verification, and duplicate check prevention.
- **Delete Confirmation**: Modal dialog preventing accidental data loss.
- **Dual-Mode Connectivity Badge**: Live heartbeat dot in the navbar indicating real-time backend API reachability.
- **Architectural Explorer**: Interactive cloud deployment flow visualization and live ping test tool.

---

## 10. Conclusion

The **Student Management System** demonstrates the transition of a full-stack system from local developer execution to a robust, production-ready cloud deployment. By decoupling the presentation layer (React on Vercel) from the business and persistence layer (Spring Boot on Render with MySQL), the application achieves maximum scalability, optimal cost efficiency, high availability, and rigorous security.
