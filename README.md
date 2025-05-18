# 📱 E-Commerce Mobile App (React Native + Node.js + MySQL)

This is a full-stack e-commerce mobile application built using **React Native** for the frontend and **Node.js + Express + MySQL** for the backend. The app allows users to sign up, log in, manage profiles, browse products, and maintain a cart.

---

## ✨ Features

### 🔹 Authentication
- Signup & Login using JWT
- Protected user routes with token verification

### 🔹 Product Management
- Create, Edit, Delete, and View products
- Filter by category

### 🔹 Profile Management
- View user profile
- Edit name, email, contact, and password

### 🔹 Cart Functionality
- Add/remove products to/from cart
- View cart items

### 🔹 Navigation
- Bottom Tab Navigator
  - Home
  - Cart
  - Recorder
  - Profile

---

## 🧠 App.tsx Overview

- Entry point for the React Native app
- Checks authentication status from `AuthContext`
- If logged in → shows tab navigation (Home, Cart, Profile, etc.)
- If not logged in → shows Signup/Login screens
- Uses **React Navigation** for screen transitions

---

## 🗂️ Folder Structure

### 🔧 Backend (`/Backend`)
Backend/
├── images/ # Uploaded product/user images
├── migrations/ # Database migration files
├── node_modules/
├── knexfile.js # Knex.js DB config
├── package.json
├── server.js # Main Express server file

yaml
Copy
Edit

- Built with Express.js
- Uses MySQL for database
- JWT for token authentication
- Handles:
  - User Registration/Login
  - User Profile (View/Edit/Delete)
  - Product CRUD APIs

---

### 📱 Frontend (`/myApp`)
myApp/
├── android/ # Android native files
├── ios/ # iOS native files
├── src/
│ ├── components/ # Reusable UI components
│ ├── AuthContext.jsx # Auth logic and context
│ ├── CartScreen.js
│ ├── Category.jsx
│ ├── Counter.jsx
│ ├── EditProduct.jsx
│ ├── EditProfile.js
│ ├── Greeting.jsx
│ ├── Header.jsx
│ ├── HomeScreen.jsx
│ ├── InitialScreen.jsx
│ ├── LoginScreen.jsx
│ ├── ProductCard.jsx
│ ├── ProductForm.jsx
│ ├── ProfileScreen.jsx
│ ├── Recorder.jsx
│ └── SignupScreen.jsx
├── App.tsx # App entry, navigation, and auth check
├── girl.png

- Developed with React Native
- Navigation: React Navigation
- HTTP: `fetch` for backend communication
- Screens: Login, Signup, Home, Cart, Profile, Product Management

---

## 🔐 Authentication Flow

1. User signs up or logs in
2. JWT token is returned and saved
3. Token is sent with API calls to protected routes
4. Backend verifies token and returns user-specific data

---

## 📌 Notes

- Frontend and backend are in separate folders
- Simple clean architecture using Context API and REST APIs
- Ideal for learning full-stack mobile app development

---
 Fully working system from signup to product and cart management — with clean code and scalable structure.
