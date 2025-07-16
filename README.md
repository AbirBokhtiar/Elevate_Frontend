
---


# 🚀 Elevate — Full-Stack AI-Powered eCommerce Platform

**Elevate** is a cutting-edge, full-stack e-commerce platform designed to deliver a seamless, AI-enhanced shopping experience. Powered by the **Model Context Protocol (MCP)**, it integrates a modern **Next.js** frontend with a robust **NestJS** backend, leveraging the **WooCommerce API** for dynamic product management and **Google Gemini AI** for intelligent customer interactions.

Deployed Links:  
🌐 **Frontend**: [elevate-frontend.vercel.app](https://elevate-frontend-gehx540kb-abir-bokhtiars-projects.vercel.app)  
🔗 **Backend**: [elevate-backend.onrender.com](https://elevate-backend-xd7m.onrender.com)  
🛒 **WooCommerce**: [elevateyourway.infinityfreeapp.com](https://elevateyourway.infinityfreeapp.com)

---

## 🧠 Project Overview

Elevate combines a **Next.js** frontend and a **NestJS-based REST API** backend to create a modern e-commerce ecosystem. The **Model Context Protocol (MCP)** enables efficient AI integration, powering features like customer support, intelligent product recommendations, and semantic search.

---

## 🌟 Key Features

### 🦸‍♂️ Model Context Protocol (MCP) — The Hero Feature

The **Model Context Protocol (MCP)** ensures scalable and efficient communication between AI agents and services:

```ts
McpModule.forRoot({
  name: 'mcp',
  version: '1.0.0',
  transport: [
    McpTransportType.STDIO,
    McpTransportType.STREAMABLE_HTTP,
    McpTransportType.SSE,
  ],
});
````

**Supported Transport Types:**

* `STDIO`: Local communication.
* `STREAMABLE_HTTP`: Real-time data transfer.
* `SSE`: Event-driven updates.

---

### 🤖 AI-Powered Intelligence

* **Jarvis AI Agent** (powered by Google Gemini)
* **Intent Detection**: Understands refund, tracking, product queries, etc.
* **Contextual Responses**: Answers based on real-time order/product data.
* **Fallback Clarification**: Requests user input when needed.
* **AI-Enhanced Search**: Uses semantic query matching.
* **Personalized Recommendations**: Based on behavior and preferences.

---

### 🛍️ Product Discovery

* **Advanced Filtering & Sorting**
* **Detailed Product Pages**: Includes reviews and image galleries.

### 🛒 Cart & Checkout

* **Cart Management**
* **Stripe & SSLCommerz Integration**
* **Order Creation & Address Management**

### 🔐 Authentication & Security

* **JWT Authentication**
* **Google OAuth Login**
* **OAuth-Secured APIs**
* **Role-Based Access Control (RBAC)**

### 📝 Reviews System

* **User Reviews**: Add, edit, delete reviews.
* **Admin Moderation**: Approve/reject reviews.

### 💳 Subscription & Payments

* **Stripe Subscriptions**: Multiple plans & payment events.

### 📦 Order Management

* **Create Orders**: Product + customer + address.
* **Order Lookup**: Fetch order status by ID.

### 📊 Activity Logging & Reports

* **Audit Logs**: User/admin action tracking.
* **CSV Export**: Export logs for reporting.

---

## 🧱 Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**

### Backend

* **NestJS**
* **TypeORM** (PostgreSQL / MySQL)

### Integrations

* **WooCommerce REST API**
* **Google Gemini AI**
* **Stripe & SSLCommerz**
* **JWT, Google OAuth**
* **Zod** (validation)
* **MCP** (Model Context Protocol)

---

## 📁 File Structure

### 📂 Frontend (`Elevate_Frontend/`)

```
src/
  ├── app/            # Main pages and layout
  ├── components/     # Reusable UI components
  ├── pages/          # Route-specific pages
  ├── services/       # API communication
  └── utils/          # Helper functions
public/               # Static assets
package.json          # Project metadata
```

### 📂 Backend (`elevate-rest-api/`)

```
src/
  ├── modules/        # Modularized features (auth, orders, products, AI)
  ├── services/       # Business logic and integrations
  ├── controllers/    # Route handlers
  └── entities/       # TypeORM entities
package.json          # Project metadata
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

* **Node.js** (v14+)
* **npm** (v6+)
* **PostgreSQL / MySQL**

---

### 🚀 Frontend Setup

```bash
# Clone repository
git clone https://github.com/AbirBokhtiar/Elevate_Frontend.git

# Navigate and install dependencies
cd Elevate_Frontend
npm install

# Start development server
npm run dev
```

---

### 🧪 Backend Setup

```bash
# Clone repository
git clone https://github.com/your-repo/elevate-rest-api.git

# Navigate and install dependencies
cd elevate-rest-api
npm install
```

Create a `.env` file with the following:

```env
DATABASE_URL=postgres://user:password@localhost:5432/elevate
JWT_SECRET=your_jwt_secret
WOOCOMMERCE_KEY=your_key
WOOCOMMERCE_SECRET=your_secret
GEMINI_API_KEY=your_gemini_key
```

Start the backend server:

```bash
npm run start
```

---

## 📖 API Documentation

📘 Local: [http://localhost:3000/api](http://localhost:3000/api)
📡 Production: [elevate-backend.onrender.com/api](https://elevate-backend-xd7m.onrender.com/api)

---

## 🪪 License

This project is licensed under the **MIT License**.

---

## 💡 Contributing

We welcome contributions to **Elevate**!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Create a Pull Request 🚀

---

## 🤝 Contact

**Developed by Abir Bokhtiar**

📬 Email: [abirbokhtiar@gmail.com](mailto:abirbokhtiar@gmail.com)
🌐 Portfolio: [abirbokhtiar.com](https://abirbokhtiar.com)
🐙 GitHub: [@AbirBokhtiar](https://github.com/AbirBokhtiar)


