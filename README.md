# 🚀 Roomify – Hotel Booking Web App

**Your Perfect Stay, Simplified.**

Roomify is a full-stack hotel booking web application where users can explore hotels, book stays, manage bookings, and view analytics through a clean and modern dashboard.

---

## ✨ Features

- 🔐 User Authentication (Register & Login with JWT)
- 🏨 Browse & Search Hotels
- 📅 Book Hotels with Check-In & Check-Out Dates
- ❌ Cancel Bookings
- 📊 Dashboard with Analytics & Charts
- 🔒 Protected Routes (Authorization)
- 🎨 Clean & Responsive UI (Tailwind CSS)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- Recharts (Charts)

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

```
hotel-booking/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   └── React App
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yudhveersharma2206/hotel-booking-system.git
cd hotel-booking-system
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔌 API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Hotels
- GET `/api/hotels`
- POST `/api/hotels/add` (Protected)

### Bookings
- POST `/api/bookings/book`
- GET `/api/bookings/my`
- DELETE `/api/bookings/cancel/:id`

---

## 🔐 Authentication Flow

- User registers with email & password  
- Password is hashed using bcrypt  
- JWT token is generated on login  
- Protected routes require token in headers  

---

## 📈 Future Improvements

- 💳 Payment Integration (Stripe/Razorpay)
- ⭐ Reviews & Ratings System
- 📍 Location-based Search
- 👤 User Profile Page
- 🧑‍💼 Admin Panel

---

## 👨‍💻 Author

**Yudhveer Sharma**

---

## 🌐 Live Demo (Coming Soon)
