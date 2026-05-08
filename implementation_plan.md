# Knowledge Blog — Implementation Plan

A full-stack blogging platform where users can read, upload, and manage study-related blogs with likes, comments, and bookmarks.

## Tech Stack
- **Frontend:** React 18 + React Router v6 + Bootstrap 5 + Axios
- **Backend:** Node.js + Express + Mongoose + JWT + Multer + bcrypt
- **Database:** MongoDB

---

## Project Structure

```
Mini Project/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   ├── commentController.js
│   │   └── bookmarkController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Blog.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── blogs.js
│   │   ├── comments.js
│   │   └── bookmarks.js
│   ├── uploads/          (created at runtime)
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx / Navbar.css
    │   │   ├── Footer.jsx / Footer.css
    │   │   ├── BlogCard.jsx / BlogCard.css
    │   │   └── SearchBar.jsx / SearchBar.css
    │   ├── pages/
    │   │   ├── Home.jsx / Home.css
    │   │   ├── Blogs.jsx / Blogs.css
    │   │   ├── BlogDetail.jsx / BlogDetail.css
    │   │   ├── Upload.jsx / Upload.css
    │   │   ├── Auth.jsx / Auth.css
    │   │   ├── Profile.jsx / Profile.css
    │   │   ├── Saved.jsx / Saved.css
    │   │   └── About.jsx / About.css
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

---

## User Review Required

> [!IMPORTANT]
> **MongoDB Connection:** The backend will default to `mongodb://localhost:27017/knowledge-blog`. Please confirm you have MongoDB running locally, or provide a MongoDB Atlas connection string.

> [!IMPORTANT]
> **JWT Secret:** A default secret will be used in `.env`. Replace it with your own before deploying.

---

## Proposed Changes

### Backend — Database & Config

#### [NEW] backend/config/db.js
- Mongoose connection function reading `MONGO_URI` from `.env`

#### [NEW] backend/.env
- `MONGO_URI`, `JWT_SECRET`, `PORT` environment variables

---

### Backend — Models

#### [NEW] backend/models/User.js
- Fields: `name`, `email`, `password`, `bookmarks` (array of Blog ObjectIds)
- Pre-save hook to hash password with bcrypt

#### [NEW] backend/models/Blog.js
- Fields: `title`, `content`, `image`, `pdf`, `category`, `author` (ref User), `likes` (array of User ObjectIds), `createdAt`

#### [NEW] backend/models/Comment.js
- Fields: `blogId` (ref Blog), `userId` (ref User), `text`, `createdAt`

---

### Backend — Middleware

#### [NEW] backend/middleware/auth.js
- JWT verification middleware — extracts token from `Authorization: Bearer <token>` header

---

### Backend — Controllers & Routes

#### [NEW] backend/controllers/authController.js & backend/routes/auth.js
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login, return JWT |

#### [NEW] backend/controllers/blogController.js & backend/routes/blogs.js
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/blogs` | List all blogs (supports `?category=` & `?search=`) |
| GET | `/api/blogs/:id` | Get single blog |
| POST | `/api/blogs` | Create blog (auth + multer for image/pdf) |
| PUT | `/api/blogs/:id` | Update blog (author only) |
| DELETE | `/api/blogs/:id` | Delete blog (author only) |
| POST | `/api/blogs/:id/like` | Toggle like (auth) |

#### [NEW] backend/controllers/commentController.js & backend/routes/comments.js
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/comments` | Add comment (auth) |
| GET | `/api/comments/:blogId` | Get comments for a blog |
| DELETE | `/api/comments/:id` | Delete comment (author only) |

#### [NEW] backend/controllers/bookmarkController.js & backend/routes/bookmarks.js
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/bookmark` | Toggle bookmark (auth) |
| GET | `/api/bookmark` | Get bookmarked blogs (auth) |

---

### Backend — Server Entry

#### [NEW] backend/server.js
- Express app setup, CORS, JSON body parser
- Serve `/uploads` as static
- Mount all route modules
- Connect DB and start listening

#### [NEW] backend/package.json
- Dependencies: `express`, `mongoose`, `bcryptjs`, `jsonwebtoken`, `multer`, `cors`, `dotenv`

---

### Frontend — Scaffolding

#### [NEW] frontend/ (via `npx create-react-app`)
- Bootstrap installed via `npm install bootstrap react-bootstrap axios react-router-dom`

---

### Frontend — Context & Auth

#### [NEW] frontend/src/context/AuthContext.jsx
- React Context for `user`, `token`, `login()`, `logout()`, `register()`
- Persists token in `localStorage`

---

### Frontend — Components

#### [NEW] Navbar.jsx
- Bootstrap navbar with links: Home, Blogs, Categories dropdown (9 top-level categories with sub-categories), Upload, Saved, About, Login/Profile
- Responsive collapse for mobile

#### [NEW] Footer.jsx
- Simple footer with platform info and links

#### [NEW] BlogCard.jsx
- Bootstrap card showing image, title, category badge, author, like count, excerpt

#### [NEW] SearchBar.jsx
- Input field with search icon

---

### Frontend — Pages

#### [NEW] Home.jsx
- Hero section with parallax CSS background effect
- Grid of latest blogs (fetched from API, limited to 6)

#### [NEW] Blogs.jsx
- SearchBar + category filter dropdown
- Grid of all BlogCards
- Client-side filtering + server query params

#### [NEW] BlogDetail.jsx
- Full blog content display
- Like button (toggle)
- Bookmark button
- Comment section (add/delete)
- Download PDF button (if blog has PDF)

#### [NEW] Upload.jsx
- Protected page (redirect if not logged in)
- Form: title, content (textarea), category dropdown, image upload, PDF upload
- Submits via `multipart/form-data`

#### [NEW] Auth.jsx
- Toggle between Login and Register forms
- Calls AuthContext methods

#### [NEW] Profile.jsx
- Shows logged-in user's info
- Tabs: "My Blogs" and "Bookmarked Blogs"

#### [NEW] Saved.jsx
- Displays bookmarked blogs as BlogCards

#### [NEW] About.jsx
- Static page describing the platform

---

### Frontend — App & Routing

#### [NEW] App.jsx
- `<BrowserRouter>` with routes for all pages
- Navbar and Footer on all pages

---

## Open Questions

> [!IMPORTANT]
> 1. **MongoDB:** Are you running MongoDB locally, or should I configure a MongoDB Atlas URI?
> 2. **Hero Image:** Do you have a specific hero/background image for the parallax section, or should I generate one?

---

## Verification Plan

### Automated Tests
1. Start backend: `cd backend && npm install && npm start`
2. Start frontend: `cd frontend && npm install && npm start`
3. Verify all API routes respond correctly via browser/Postman
4. Test user registration → login → create blog → like → comment → bookmark flow

### Manual Verification
- Navigate all pages in the browser
- Test responsive layout at different breakpoints
- Verify file uploads (image + PDF) work correctly
- Confirm parallax scrolling on the Home page hero section
