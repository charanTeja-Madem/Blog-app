# Literary Journal - Blog Application

A full-stack blog application. Users can create, read, edit, and comment on articles.

## 🌐 Live Demo

- **Frontend**: https://blog-app-phi-virid.vercel.app
- **Backend**: https://blog-app-2qmq.onrender.com

## ✨ Features

- User authentication with JWT
- Three roles: User, Author, Admin
- Create and manage articles
- Comment on articles
- User profiles with images
- Responsive design

## 🛠️ Tech Stack

**Frontend**: React 19, Vite, Zustand, Tailwind CSS, Vercel

**Backend**: Node.js, Express.js, MongoDB, JWT, Cloudinary, Render

## 📁 Project Structure

```
BlogAPP/
├── Frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── config/        # API configuration
│   │   ├── store/         # Zustand state
│   │   └── styles/        # Tailwind utilities
│   └── package.json
│
└── Backend/
    ├── APIs/              # Route handlers
    ├── Models/            # MongoDB schemas
    ├── Services/          # Business logic
    ├── Middlewares/       # Custom middleware
    └── package.json
```

## 🚀 Quick Start

### Backend

```bash
cd Backend
npm install

# Create .env with these variables:
# DB_URL=your_mongodb_url
# PORT=4000
# JWT_SECRET=your_secret_key
# CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

npm start
```

### Frontend

```bash
cd Frontend
npm install

# Create .env with:
# VITE_API_BASE_URL=http://localhost:4000

npm run dev
# Frontend runs on http://localhost:5173
```

## 👥 User Roles

- **User**: Read articles, add comments, manage profile
- **Author**: User + create and edit articles
- **Admin**: Manage users and content

## 📚 Main API Endpoints

- `POST /common-api/login` - Login
- `GET /common-api/logout` - Logout
- `GET /user-api/articles` - Get all articles
- `GET /user-api/article/:id` - Get single article
- `POST /author-api/articles` - Create article
- `PUT /user-api/article/:id/comment` - Add comment
- `PUT /admin-api/block/:id` - Block user

## 🔧 Build & Deploy

```bash
# Build frontend
cd Frontend && npm run build

# Push to GitHub for auto-deployment
git push origin main
```

Frontend auto-deploys to Vercel, Backend auto-deploys to Render.

## 👨‍💻 Author

**Charan Teja Madem**
- GitHub: [@charanTeja-Madem](https://github.com/charanTeja-Madem)

---

**Happy blogging!** ✍️
