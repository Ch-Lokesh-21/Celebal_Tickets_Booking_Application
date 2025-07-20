# 🎟️ Tickets Booking Application

A responsive Ticket Booking Application allowing users to explore shows, book seats securely, and manage their bookings — all with real-time seat locking, payment integration, and downloadable receipts.

---

## 📘 Project Overview

Developed as a complete movie/show ticketing platform where:

- Users can **register and login**, with **email verification**
- A **Home page** displays at least 5 dynamic shows or movies
- Each show has a **details page** with description and booking options
- Users can **select seats** for a chosen show
- Seats are **locked during checkout** and **blocked after successful payment**
- Checkout uses **Razorpay** for secure transactions
- A **receipt is generated and saved** for each booking
- The app features a **responsive, pc and mobile-friendly UI**

---

## 🚀 Features

- 🔐 User Login & Registration (Firebase Auth)
- 📧 Email Verification (with redirect for unverified users)
- 🏠 Home Page with Movie Listings from Firestore
- 📄 Show Details Page with Book Now CTA
- 💺 Seat Selection Grid (8x8 layout)
- 🔒 Real-time Seat Locking and Booking Flow
- 💳 Razorpay Secure Payment Integration
- 🧾 Receipt Generation using jsPDF
- 📦 QR Code Embedded in PDF for Transaction Verification
- 📂 User Dashboard with Booking History & Receipt Downloads
- 📱 Responsive UX Design (Tailwind CSS)
- ⚠️ Error Handling, Loading States, and Protected Routes

---

## 🧰 Tech Stack

| Layer          | Technology                                    |
|----------------|-----------------------------------------------|
| Frontend       | React.js + Vite                               |
| Styling        | Tailwind CSS                                  |
| Authentication | Firebase Authentication                       |
| Database       | Firebase Firestore                            |
| Payments       | Razorpay                                      |
| PDF/QR         | jsPDF, qrcode                                 |
| Icons          | react-icons                                   |
| Routing        | React Router                                  |
| State Mgmt     | Context API                                   |

---

## 🔐 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project
3. Register your Web App
4. Enable **Email/Password Auth**
5. Create **Firestore DB** with a `shows` collection
6. Add the following to `.env`:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_id
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```
---

## 💳 Razorpay Setup

1. Sign up at [https://razorpay.com](https://razorpay.com)
2. Generate API Key ID
3. Add this to your `.env`:
```env
VITE_RAZORPAY_KEY_ID=your_key
```

---

## 📄 Booking Flow

1. User selects a show and navigates to its detail page
2. User picks available seats (booked ones are disabled)
3. On clicking **Proceed to Checkout**:
   - Seat selection is locked temporarily
   - Razorpay Checkout opens
4. On successful payment:
   - Seats are permanently marked as booked in Firestore
   - Booking is saved under user’s history
   - A **PDF receipt** is generated using `jsPDF`
   - Receipt includes a **QR code** of the transaction ID

---

## 📥 Installation & Local Setup

```bash
git clone 
cd 
npm install
create `.env` file with 
# Fill in Firebase + Razorpay keys
npm run dev
```

---

## ✨ Additional Packages Used

- [`jspdf`](https://www.npmjs.com/package/jspdf) – PDF generation
- [`qrcode`](https://www.npmjs.com/package/qrcode) – QR Code rendering
- [`react-icons`](https://react-icons.github.io/react-icons) – Icons for UI

---
