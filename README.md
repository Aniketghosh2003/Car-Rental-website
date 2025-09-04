# 🚗 Car Rental Website

A modern, full-stack car rental platform built with the MERN stack, offering seamless vehicle booking and management services with an intuitive user interface and robust backend architecture.

## 🌐 Live Demo

**[View Live Application](https://car-rental-website1-omega.vercel.app/)**

## 📋 Table of Contents

- [Overview](#Overview)
- [Features](#Features)
- [Tech Stack](#Tech-Stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Performance](#performance)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This car rental website is a comprehensive solution designed to streamline the vehicle rental process for both customers and administrators. Built with modern web technologies, it provides a seamless booking experience with real-time availability, secure payment processing, and efficient fleet management.

The application addresses the growing demand for digital car rental services by offering:
- Intuitive user interface for easy vehicle browsing and booking
- Comprehensive admin panel for fleet and booking management
- Responsive design ensuring optimal experience across all devices
- Secure authentication and data protection

## ✨ Features

### 🔐 User Authentication & Authorization
- Secure user registration and login system
- JWT-based authentication
- Role-based access control (Admin/Customer)
- Password encryption and secure session management

### 🚙 Vehicle Management
- Comprehensive car catalog with detailed specifications
- Advanced search and filtering capabilities
- Real-time availability tracking
- Dynamic pricing based on duration and vehicle type
- High-quality image gallery with ImageKit integration

### 📅 Booking System
- Interactive date picker for rental duration
- Real-time availability checking
- Booking confirmation and management
- Email notifications for booking status updates
- Booking history and status tracking

### 💳 Payment Integration
- Secure payment gateway integration
- Multiple payment method support
- Transaction history and receipts
- Automated billing calculations

### 📱 Responsive Design
- Mobile-first design approach
- Cross-browser compatibility
- Optimized performance on all device sizes
- Progressive Web App (PWA) capabilities

### 🛡️ Admin Dashboard
- Fleet management and vehicle CRUD operations
- Booking overview and management
- User management and analytics
- Revenue tracking and reporting
- System monitoring and maintenance tools

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **Context API** - State management solution
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form validation and handling

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Additional Services
- **ImageKit** - Image optimization and management
- **JWT** - JSON Web Token for authentication
- **Bcrypt** - Password hashing
- **Vercel** - Deployment and hosting platform

## 🏗️ Architecture

```
car-rental-website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context API providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   ├── services/      # API service calls
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Helper functions
│   └── package.json
├── README.md
└── package.json
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Clone Repository
```bash
git clone github.com/Aniketghosh2003/Car-Rental-website.git
cd car-rental-website
```

### Backend Setup
```bash
cd server
npm install

# Create environment file
cp .env.example .env
# Configure your environment variables:
# - MongoDB connection string
# - JWT secret key
# - ImageKit credentials

npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

### Environment Variables

#### Server (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

#### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📖 Usage

### For Customers
1. **Browse Vehicles**: Explore available cars with detailed information
2. **Search & Filter**: Use advanced filters to find the perfect vehicle
3. **Book Rental**: Select dates, review pricing, and confirm booking
4. **Manage Bookings**: View booking history and current reservations
5. **Profile Management**: Update personal information and preferences

### For Administrators
1. **Fleet Management**: Add, update, or remove vehicles from inventory
2. **Booking Oversight**: Monitor all bookings and their status
3. **User Management**: Manage customer accounts and permissions
4. **Analytics Dashboard**: View business metrics and performance data
5. **System Configuration**: Adjust pricing, policies, and system settings

## 📊 API Documentation

### Authentication Endpoints
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
POST /api/auth/logout      # User logout
GET  /api/auth/profile     # Get user profile
PUT  /api/auth/profile     # Update user profile
```

### Vehicle Endpoints
```
GET    /api/vehicles           # Get all vehicles
GET    /api/vehicles/:id       # Get vehicle by ID
POST   /api/vehicles           # Create new vehicle (Admin)
PUT    /api/vehicles/:id       # Update vehicle (Admin)
DELETE /api/vehicles/:id       # Delete vehicle (Admin)
GET    /api/vehicles/search    # Search vehicles with filters
```

### Booking Endpoints
```
GET    /api/bookings           # Get user bookings
POST   /api/bookings           # Create new booking
GET    /api/bookings/:id       # Get booking details
PUT    /api/bookings/:id       # Update booking status
DELETE /api/bookings/:id       # Cancel booking
```

## 📈 Performance

- **Page Load Speed**: < 3 seconds initial load
- **Image Optimization**: ImageKit integration for optimized image delivery
- **Code Splitting**: Lazy loading for optimal bundle size
- **Caching Strategy**: Efficient API response caching
- **Database Optimization**: Indexed queries for fast data retrieval

## 🔒 Security Features

- JWT-based authentication with secure token handling
- Password hashing using bcrypt
- Input validation and sanitization
- CORS configuration for cross-origin security
- Rate limiting to prevent API abuse
- Secure HTTP headers implementation

## 🌟 Key Highlights

- **Scalable Architecture**: Modular design supporting future enhancements
- **User-Centric Design**: Intuitive interface with excellent user experience
- **Performance Optimized**: Fast loading times and smooth interactions
- **Mobile Responsive**: Seamless experience across all devices
- **SEO Friendly**: Optimized for search engine visibility
- **Production Ready**: Deployed on Vercel with CI/CD pipeline

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch:

**Frontend**: Deployed on Vercel with optimized build settings
**Backend**: RESTful API hosted on cloud platform
**Database**: MongoDB Atlas for reliable data storage
**CDN**: ImageKit for global image delivery

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


⭐ **If you found this project helpful, please consider giving it a star!**
⭐ **Special thanks to the GreatStack Youtube Channel**
