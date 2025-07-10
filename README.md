# React + Django Full Stack Application

A modern social media platform built with React frontend and Django REST API backend, featuring user authentication, posts, comments, and profile management.

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup (Django)

```bash
cd backend

# Create virtual environment (if not already done)
python -m venv ../env
source ../env/bin/activate  # On Windows: ../env/Scripts/activate

# Install dependencies
pip install django djangorestframework django-cors-headers pillow

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional, for admin access)
python manage.py createsuperuser

# Start Django server
python manage.py runserver
```

### Frontend Setup (React)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

```
React+DJango/
├── backend/                    # Django backend
│   ├── core/                  # Main Django project
│   │   ├── settings.py        # Django configuration
│   │   └── urls.py            # Main URL routing
│   ├── posts/                 # Posts and user management app
│   │   ├── models.py          # Database models (Post, UserProfile, Comment)
│   │   └── api/               # REST API
│   │       ├── views.py       # API views
│   │       ├── serializers.py # Data serialization
│   │       ├── auth_views.py  # Authentication endpoints
│   │       ├── profile_views.py # User profile endpoints
│   │       └── urls.py        # API URLs
│   ├── media/                 # User uploaded files (avatars)
│   └── manage.py              # Django management
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── posts/         # Post management components
│   │   │   ├── profile/       # User profile components
│   │   │   ├── layout/        # Layout components
│   │   │   └── modals/        # Modal components
│   │   ├── context/           # React context (AuthContext)
│   │   └── App.jsx            # Main app component
│   └── package.json           # Node dependencies
└── env/                       # Python virtual environment
```

## 🎯 Current Features

### ✅ Implemented Features

- **User Authentication**

  - User registration and login
  - JWT-based authentication
  - Protected routes

- **User Profiles**

  - Profile creation and editing
  - Avatar upload and management
  - Profile information display

- **Posts System**

  - Create, read, update, delete posts
  - Post search and filtering
  - Rich text content

- **Comments & Replies**

  - Comment on posts
  - Reply to comments
  - Nested comment structure

- **Media Management**
  - Avatar uploads
  - Image handling with Pillow
  - File storage in media directory

### 🔧 API Endpoints

#### Authentication

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout

#### Posts

- `GET /api/posts/` - List all posts
- `POST /api/posts/` - Create a new post
- `GET /api/posts/{id}/` - Get specific post
- `PUT /api/posts/{id}/` - Update post
- `DELETE /api/posts/{id}/` - Delete post

#### Comments

- `GET /api/posts/{id}/comments/` - Get post comments
- `POST /api/posts/{id}/comments/` - Add comment to post
- `PUT /api/comments/{id}/` - Update comment
- `DELETE /api/comments/{id}/` - Delete comment

#### User Profiles

- `GET /api/profile/{username}/` - Get user profile
- `PUT /api/profile/{username}/` - Update user profile
- `POST /api/profile/avatar/` - Upload avatar

## 🎯 Key Django Models

### UserProfile

```python
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default_profile.png')
```

### Post

```python
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### Comment

```python
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
```

## 🔄 Data Flow

1. **React Frontend** → Makes HTTP request to Django API
2. **Django URL Router** → Routes request to correct view
3. **Django View** → Processes request, interacts with database
4. **Django Serializer** → Converts data to JSON
5. **Django Response** → Returns JSON to React
6. **React Component** → Updates UI with received data

## 🛠️ Development Tips

### Django Admin

- Visit `http://localhost:8000/admin/` to manage data
- Great for testing and data management

### Hot Reload

- React: Changes auto-refresh in browser
- Django: Server restarts on file changes

### Database Changes

```bash
# After modifying models.py
python manage.py makemigrations
python manage.py migrate
```

### Media Files

- User uploads are stored in `backend/media/`
- Default avatars are provided for new users
- Images are processed with Pillow for optimization

## 🚀 Next Steps

1. **Add Real-time Features** - WebSocket integration for live updates
2. **Add Notifications** - User notification system
3. **Add Search & Filtering** - Advanced post search
4. **Add Pagination** - Handle large datasets efficiently
5. **Add Testing** - Unit and integration tests
6. **Add Social Features** - User following, likes, shares
7. **Add Mobile Responsiveness** - Improve mobile experience

## 📚 Learning Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🐛 Troubleshooting

### Common Issues

- **CORS errors**: Ensure Django CORS headers are properly configured
- **Media files not loading**: Check Django media settings and file permissions
- **Authentication issues**: Verify JWT token handling in frontend

Happy coding! 🎉
