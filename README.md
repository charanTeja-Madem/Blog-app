# Literary Journal - Blog Application

A full-stack blog application that allows users to create, read, edit, and comment on articles. Built with React and Express.js with MongoDB database.

## 🌐 Live Demo

- **Frontend**: https://blog-app-phi-virid.vercel.app
- **Backend API**: https://blog-app-2qmq.onrender.com

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with httpOnly cookies
- **Role-Based Access Control**: Three user roles - User, Author, and Admin
- **Article Management**: 
  - Create, read, update, and delete articles
  - Article categorization
  - Article search and discovery
- **Comments System**: Users can comment on articles
- **User Profiles**: Profile management with optional profile images
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Image Upload**: Cloudinary integration for profile and article images
- **Admin Dashboard**: Manage users and content moderation

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite 7** - Build tool and development server
- **React Router 7** - Client-side routing
- **Zustand 5** - State management
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Tailwind CSS 4** - Styling
- **React Hot Toast** - Notifications
- **Deployed on Vercel**

### Backend
- **Node.js + Express.js 5** - Server framework
- **MongoDB + Mongoose 9** - Database
- **JWT (jsonwebtoken 9)** - Authentication
- **Bcrypt 6** - Password hashing
- **Multer 2** - File upload middleware
- **Cloudinary 2** - Image storage and processing
- **CORS** - Cross-origin resource sharing
- **Deployed on Render**

## 📁 Project Structure

```
BlogAPP/
├── Frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── config/             # Configuration files
│   │   ├── styles/             # Tailwind styling utilities
│   │   ├── store/              # Zustand state management
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── index.html              # HTML template
│   ├── package.json
│   └── vite.config.js          # Vite configuration
│
└── Backend/
    ├── APIs/                   # API route handlers
    ├── Models/                 # MongoDB schemas
    ├── Services/               # Business logic
    ├── Middlewares/            # Custom middleware
    ├── config/                 # Configuration files
    ├── server.js               # Express server entry point
    ├── package.json
    └── .env.example            # Environment variables template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account for image uploads
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/charanTeja-Madem/Blog-app.git
   cd BlogAPP/Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`)
   ```env
   DB_URL=mongodb+srv://username:password@cluster.mongodb.net/blog-app
   PORT=4000
   JWT_SECRET=your_secret_key_here
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`)
   ```env
   VITE_API_BASE_URL=http://localhost:4000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## 📚 API Endpoints

### Authentication
- `POST /common-api/login` - User login
- `GET /common-api/logout` - User logout
- `GET /common-api/user` - Get current user (protected)
- `PUT /common-api/change-password` - Change password (protected)

### User Management
- `POST /user-api/users` - Register new user
- `GET /user-api/articles` - Get all articles (public)
- `GET /user-api/article/:id` - Get single article with comments (public)
- `PUT /user-api/article/:id/comment` - Add comment to article (protected)

### Author Management
- `POST /author-api/users` - Register new author
- `GET /author-api/articles` - Get author's articles (protected)
- `POST /author-api/articles` - Create new article (protected)
- `PUT /author-api/article/:id` - Edit article (protected)
- `DELETE /author-api/article/:id` - Delete article (protected)

### Admin Management
- `PUT /admin-api/block/:id` - Block user (admin only)
- `PUT /admin-api/unblock/:id` - Unblock user (admin only)

## 🔐 Authentication

The application uses JWT tokens stored in secure httpOnly cookies. Authentication is required for protected routes. The `verifyToken` middleware checks the token and user role before allowing access.

### Protected Routes
- User Profile - requires `USER`, `AUTHOR`, or `ADMIN` role
- Author Profile - requires `AUTHOR` role
- Admin Profile - requires `ADMIN` role
- Create/Edit Articles - requires `AUTHOR` role
- Add Comments - requires `USER`, `AUTHOR`, or `ADMIN` role

## 🎨 Features Detailed

### User Roles

1. **User** - Can read articles, add comments, manage profile
2. **Author** - Can do everything a User can do plus create and edit articles
3. **Admin** - Full access to manage users and moderate content

### Article Management

- **Create**: Authors can write new articles with title, description, category, and content
- **Read**: All users can view published articles with comments
- **Update**: Authors can edit their own articles
- **Delete**: Authors can delete their own articles (soft delete)
- **Comments**: All authenticated users can comment on articles

### User Profiles

- Username, email, password management
- Optional profile image upload
- Role-based dashboard
- Password change functionality

## 📦 Deployment

### Frontend (Vercel)
The frontend is automatically deployed on every push to the main branch via Vercel's GitHub integration.

### Backend (Render)
The backend is automatically deployed on every push to the main branch via Render's GitHub integration.

### Environment Configuration
Production URLs are configured in frontend API configuration:
- `VITE_API_BASE_URL=https://blog-app-2qmq.onrender.com`

## 🐛 Troubleshooting

### CORS Issues
- Ensure backend CORS is configured to accept frontend domain
- Check that credentials are enabled in API calls
- Verify cookies are httpOnly and secure

### Database Connection
- Check MongoDB connection string in `.env`
- Ensure IP whitelist includes your server IP on MongoDB Atlas
- Verify database credentials are correct

### Image Upload Issues
- Verify Cloudinary credentials in `.env`
- Check file size limits (max 2MB)
- Ensure only JPG/PNG files are uploaded

### Authentication Issues
- Clear browser cookies and try logging in again
- Verify JWT_SECRET is set in backend `.env`
- Check token expiration time settings

## 📝 Development Guidelines

- Use React hooks and functional components
- Implement proper error handling and validation
- Follow RESTful API design principles
- Use environment variables for configuration
- Keep sensitive data in `.env` files (never commit)
- Test thoroughly before deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Charan Teja Madem**
- GitHub: [@charanTeja-Madem](https://github.com/charanTeja-Madem)
- Repository: [Blog-app](https://github.com/charanTeja-Madem/Blog-app)

## 📞 Support

For issues, questions, or suggestions, please create an issue on the GitHub repository or contact the author.

---

**Happy blogging!** ✍️📚
