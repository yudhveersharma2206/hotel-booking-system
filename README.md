# 🏨 Hotel Booking System

A full-stack hotel booking web application that allows users to explore hotels, manage bookings, and perform secure authentication. Built using the MERN stack with a focus on scalability and clean architecture.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login with JWT)
- 🏨 Hotel Management (Add, View Hotels)
- 🔒 Protected Routes (Authorized Access)
- 🌐 RESTful API Integration
- ⚡ Fast and Responsive UI

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Axios
- React Router

### Backend

- Node.js
- Express.js

### Database

- MongoDB (Mongoose)

### Authentication

- JSON Web Token (JWT)
- bcrypt.js

---

## 📂 Project Structure

hotel-booking/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ └── React App

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

bash
git clone <https://github.com/yudhveersharma2206/hotel-booking-system.git>
cd hotel-booking-system

2️⃣ Backend Setup

cd backend
npm install
npm start

3️⃣ Frontend Setup

cd frontend
npm install
npm start

🔌 API Endpoints
  Auth
  POST /api/auth/register
  POST /api/auth/login
  Hotels
  GET /api/hotels
  POST /api/hotels/add (Protected)
  GET /api/hotels/:id

🔐 Authentication Flow
  User registers with email & password
  Password is hashed using bcrypt
  JWT token is generated on login
  Protected routes require token in headers
  
📈 Future Improvements
  Room Booking System with date availability
  Payment Integration
  Reviews & Ratings
  Admin Dashboard
  Location-based search

  Author
  Yudhveer Sharma
  