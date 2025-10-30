# GrocRush-grocery-shopping-app

# Groc-Rush 🚀
**Groc-Rush** is a fast, reliable grocery delivery app designed to bring fresh groceries to your doorstep at lightning speed. Shop easily, choose your favorite products, and get them delivered with just a few clicks.

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Technologies](#technologies)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)   

---

## Demo

Live demo : [https://groc-rush-frontend.vercel.app](https://groc-rush-frontend.vercel.app)  

---

## Features

-  User & Seller authentication  
-  Add, remove, and update cart items  
-  Multiple payment options: Cash on Delivery & Online payment via Stripe  
-  Manage delivery addresses
-  Seller Dashboard — Add Products & Manage Orders 
-  Order history  
-  Responsive design for mobile and desktop  
-  Fast image loading using Cloudinary  

---

## Technologies

**Frontend:**  
- React.js
- Vite 
- React Router  
- Tailwind CSS  
- react-hot-toast  

**Backend:**  
- Node.js & Express.js  
- MongoDB & Mongoose  
- JWT Authentication  
- Stripe Payment Integration  
- Cloudinary for image uploads  

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/anwghub/GrocRush-grocery-shopping-app.git
```
2. **Backend**
```bash
cd server
npm install
```
3. **Frontend**
```bash
cd client
npm install
```
4. **Setup Environment Variables**
Create a .env file in the backend folder:
```bash

PORT=4000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Usage

**Start Backend**
```bash
cd server
npm run server
```
**Start Frontend**
```bash
cd client
npm run dev
```
---

## API Endpoints

### User
- `POST /api/user/register` — Register a new user  
- `POST /api/user/login` — Login user  
- `GET /api/user/is-auth` — Check if user is authenticated  
- `GET /api/user/logout` — Logout user  

### Seller
- `POST /api/seller/login` — Login seller  
- `GET /api/seller/is-auth` — Check if seller is authenticated  
- `GET /api/seller/logout` — Logout seller  

### Products
- `POST /api/product/add` — Add new product (Seller only)  
- `GET /api/product/list` — Get all products  
- `GET /api/product/id` — Get product by ID  
- `POST /api/product/stock` — Update product stock (Seller only)  

### Cart
- `POST /api/cart/update` — Add or update cart items (User only)  

### Orders
- `POST /api/order/cod` — Place order with Cash on Delivery (User only)  
- `POST /api/order/stripe` — Place order with Online Payment via Stripe (User only)  
- `GET /api/order/user` — Get orders of logged-in user  
- `GET /api/order/seller` — Get all orders for seller (Seller only)  

### Address
- `POST /api/address/add` — Add new address (User only)  
- `GET /api/address/get` — Get user addresses (User only)  

---

## Folder Structure

```bash
Groc-Rush/
├── client/         # Frontend React App
│   ├── src/
│   │   ├── assets/       # Images & Icons
│   │   ├── components/   # React components
│   │   ├── context/      # App context for state management
│   │   └── pages/        # Page components
│   ├── .env             # Environment variables
├── server/         # Backend Node.js App
│   ├── controllers/      # Route controllers
│   ├── routes/           # Express routes
│   ├── models/           # Mongoose models
│   ├── configs/          # DB & Cloudinary configs
│   ├── middleware/       # middleware functions
│   ├── .env             # Environment variables
└── README.md
```

---

## Contributor
anwghub (https://github.com/anwghub)




