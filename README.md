# 🩺 Care IO

Care IO is a modern caregiving service platform that connects users with trusted caregivers for children, elderly parents, and ill family members through a simple, secure, and user-friendly booking system.

The platform allows users to browse verified caregivers, book caregiving services based on their needs, and leave reviews to help others make informed decisions. It also includes a powerful authentication and authorization system with role-based access control, ensuring a secure experience for both users and administrators.

---

## 🌐 Live Demo

🔗 **Live Site: https://careio-amber.vercel.app

---

## ✨ Features

- 🔐 Secure authentication using **NextAuth**
- 👥 Role-based access control (User & Admin)
- 📅 Book caregiving services seamlessly
- ⭐ Review and rating system for caregivers
- 👨‍⚕️ Browse trusted caregivers
- 👤 User profile management
- 📖 FAQ section for common questions
- 📱 Fully responsive design for all devices
- ⚡ Optimized performance with Next.js
- 🎨 Modern and clean UI using Tailwind CSS & DaisyUI
- 🎠 Interactive sliders powered by Swiper

---

## 👨‍💼 User Dashboard

Users can:

- Manage personal profile
- View booking history
- Book caregiving services
- Leave and manage reviews
- Track booking status

---

## 👨‍💻 Admin Dashboard

Administrators can:

- Manage users
- Manage caregivers
- Approve or update bookings
- Manage reviews
- Control platform content
- Monitor overall platform activities

---

## 💡 Benefits

- ✅ Reliable Care at Your Convenience
- ✅ Trusted & Transparent Service
- ✅ Secure & Efficient Management
- ✅ Simple and Intuitive User Experience
- ✅ Scalable Architecture for Future Growth

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- JavaScript
- Tailwind CSS
- DaisyUI
- Swiper

### Backend

- Node.js
- MongoDB
- NextAuth

---

## 📂 Project Structure

```
Care-IO
│── app
│── components
│── hooks
│── lib
│── public
│── services
│── utils
│── middleware
│── models
│── styles
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
https://github.com/GMRedoan/care.io.git
```

### Navigate to the project

```bash
cd care-io
```

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the project root and add the required environment variables.

```env
NEXTAUTH_SECRET=

NEXTAUTH_URL=

MONGODB_URI=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=
```

### Run the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 🔒 Authentication

- Email & Password Authentication
- Google Authentication
- Protected Routes
- Role-Based Authorization
- Secure Session Management with NextAuth

---

## 📈 Future Improvements

- Online payment integration
- Real-time chat between users and caregivers
- Notifications via email and SMS
- Video consultation
- Advanced caregiver filtering
- Caregiver availability calendar
- Multi-language support
 
