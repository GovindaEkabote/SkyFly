# ✈️ Airline Management System Backend

Production-grade Airline Management Backend built using Node.js, Express.js, MongoDB, and Mongoose following scalable enterprise architecture principles.

# 🚀 Features
✅ Authentication & Authorization
1. JWT Authentication.
2. Role-Based Access Control (RBAC)
3. Refresh Token Support
4. Secure Password Hashing (bcryptjs)
5. Cookie-based Authentication

✅ Airline Management
1. Create / Update / Delete Airlines
2. Airline Hubs Management
3. Alliance Integration
4. Airline Status Management
5. Geo-location Support

✅ Airport Management
1. Airport CRUD
2. Geo Coordinates
3. Hub Mapping
4. Airport Search APIs

✅ Aircraft Management
1. Aircraft Registration
2. Fleet Tracking
3. Aircraft Status Management
4. Aircraft Usage Tracking

✅ Flight Management
1. Flight Scheduling
2. Aircraft Assignment
3. Flight Status Tracking
4. Flight Search APIs

✅ Crew & Staff Management
1. Pilot Management
2. Crew Assignment
3. Employee Details
4. Airline Employment Mapping

✅ Maintenance System
1. Aircraft Maintenance Scheduling
2. Maintenance Tracking
3. Aircraft Grounding Logic
4. Maintenance Summary

✅ File Uploads
1. Cloudinary Integration
2. Document Upload Support
3. Pilot License Uploads
4. Employee Documents

✅ Security
1. Rate Limiting
2. Secure Environment Variables
3. Request Validation
4. Centralized Error Handling
5. Logging with Winston

# 🏗️ Tech Stack
| Technology | Purpose            |
| ---------- | ------------------ |
| Node.js    | Backend Runtime    |
| Express.js | REST API Framework |
| MongoDB    | Database           |
| Mongoose   | ODM                |
| JWT        | Authentication     |
| Cloudinary | Media Storage      |
| Multer     | File Uploads       |
| Winston    | Logging            |
| Nodemailer | Email Service      |

# 📂 Project Structure
```
src/
│
├── config/           # Database, Cloudinary, Mail Config
├── controllers/      # Route Controllers
├── middlewares/      # Auth, Error Handling, Validation
├── models/           # Mongoose Models
├── repositories/     # Database Layer
├── routes/           # API Routes
├── services/         # Business Logic
├── template/         # Email Templates
├── utils/            # Constants & Helpers
│
├── index.js          # App Entry Point
│
.env
package.json
README.md
```

# 📦 Dependencies

```
{
  "bcryptjs": "^3.0.3",
  "cloudinary": "^1.41.3",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.6",
  "dotenv": "^17.4.0",
  "express": "^5.2.1",
  "express-rate-limit": "^8.4.1",
  "http-status-codes": "^2.3.0",
  "jsonwebtoken": "^9.0.3",
  "mongodb": "^7.1.1",
  "mongoose": "^9.4.1",
  "multer": "^1.4.5-lts.1",
  "multer-storage-cloudinary": "^4.0.0",
  "nodemailer": "^8.0.5",
  "nodemon": "^3.1.14",
  "winston": "^3.19.0"
}
```

# ⚙️ Environment Variables
```
PORT=4000
MONGO_URI=
SECRET=
EXPIRES_IN=15m
REFRESH_SECRET=
REFRESH_EXPIRES_IN=7d  
EMAIL_SENDER=
EMAIL_APPPASS=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

# 🛠️ Installation
git clone https://github.com/GovindaEkabote/SkyFly.git

# 2️⃣ Install Dependencies
npm install or npm i


# 3️⃣ Setup Environment Variables
Create .env

# 4️⃣ Start Development Server
npm run dev

# 🌐 API Base URL
http://localhost:5000/api/v1



# ✈️ Core Modules
* Alliance Module
1. Manage airline alliances
2. Add airlines to alliances
3. Alliance status tracking

* Airline Module
1. Airline CRUD
2. Hubs Management
3. Maintenance Summary

* Airport Module
1. Airport CRUD
2. Geo Search
3. Hub Connections

* Aircraft Module
1. Fleet Management
2. Aircraft Status
3. Usage Tracking

* Flight Module
1. Flight Scheduling
2. Flight Assignment
3. Flight Tracking

* Crew Assignment Module
1. Assign Pilots
2. Assign Cabin Crew
3. Flight Crew Scheduling

* User Module
1. User Management
2. Employee Management
3. Pilot Details
4. Document Verification

# 🧠 Architecture Pattern
 * This project follows:

1. Controller-Service-Repository Pattern
2. Modular Scalable Architecture
3. Separation of Concerns
4. Centralized Error Handling
5. Production-grade Folder Structure

# 📊 Database Design
```
Alliance
Airline
Airport
Aircraft
Flight
CrewAssignment
User
Maintenance
```

# 🔥 Production Features
* Logging
1. Using Winston Logger:

- Error Logs
- Combined Logs

2. Rate Limiting
- Protects APIs against abuse.

3. Cloudinary Integration
- Production-ready media handling.

# 📌 Future Enhancements
```
Redis Caching
Kafka Event Streaming
Real-time Flight Tracking
Seat Booking System
Dynamic Pricing Engine
Notification Service
Docker Support
CI/CD Pipelines
```

# 👨‍💻 Author
```
Govinda Ekbote

```