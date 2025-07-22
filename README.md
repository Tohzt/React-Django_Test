# React + Django Full Stack Application

A modern social media platform built with React frontend and Django REST API backend, featuring user authentication, posts, comments, profile management, and dark mode support. This is a Reddit-style community platform for sharing posts and engaging in discussions.

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
│   │   ├── urls.py            # Main URL routing
│   │   ├── wsgi.py            # WSGI configuration
│   │   ├── asgi.py            # ASGI configuration
│   │   └── api/               # API URL routing
│   │       └── urls.py        # API URLs
│   ├── posts/                 # Posts and user management app
│   │   ├── models.py          # Database models (Post, UserProfile, Comment)
│   │   ├── admin.py           # Django admin configuration
│   │   ├── apps.py            # App configuration
│   │   ├── views.py           # Basic views
│   │   ├── tests.py           # Test files
│   │   └── api/               # REST API
│   │       ├── views.py       # API views
│   │       ├── serializers.py # Data serialization
│   │       ├── auth_views.py  # Authentication endpoints
│   │       ├── profile_views.py # User profile endpoints
│   │       └── urls.py        # API URLs
│   ├── media/                 # User uploaded files (avatars)
│   ├── db.sqlite3             # SQLite database
│   └── manage.py              # Django management
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── posts/         # Post management components
│   │   │   ├── profile/       # User profile components
│   │   │   ├── layout/        # Layout components
│   │   │   ├── modals/        # Modal components
│   │   │   ├── dropdown/      # Dropdown components
│   │   │   └── ui/            # UI components (Button, Card, etc.)
│   │   ├── context/           # React context (AuthContext, ThemeContext)
│   │   ├── styles/            # Design system and CSS
│   │   │   └── design-system.css # Core design tokens
│   │   ├── utils/             # Utilities and constants
│   │   │   └── constants.js   # Application constants
│   │   ├── assets/            # Static assets
│   │   │   └── react.svg      # React logo
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # App-level styles
│   │   ├── main.jsx           # App entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Public assets
│   ├── package.json           # Node dependencies
│   ├── vite.config.js         # Vite configuration
│   └── eslint.config.js       # ESLint configuration
└── env/                       # Python virtual environment
```

## 🎯 Current Features

### ✅ Implemented Features

- **User Authentication**

  - User registration and login
  - Token-based authentication (Django REST Framework tokens)
  - Protected routes and session management
  - Automatic logout functionality

- **User Profiles**

  - Profile creation and editing
  - Avatar upload and management
  - Profile information display (bio, location, website, birth date)
  - User statistics (post count, join date)
  - Recent posts display

- **Posts System**

  - Create, read, update, delete posts
  - Post search and filtering
  - Rich text content support
  - Author attribution and timestamps

- **Comments & Replies**

  - Comment on posts
  - Nested comment structure
  - Comment timestamps and author attribution

- **Media Management**

  - Avatar uploads with Pillow image processing
  - File storage in media directory
  - Default avatar fallback

- **Dark Mode Support**

  - System preference detection
  - Manual theme toggle
  - Persistent theme storage
  - Comprehensive dark mode styling

- **Modern UI/UX**
  - Responsive design system
  - Custom design tokens and CSS variables
  - Gradient backgrounds and modern styling
  - Interactive components with hover effects

### 🔧 API Endpoints

#### Authentication

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/profile/` - Get current user profile

#### Posts

- `GET /api/posts/` - List all posts (ordered by creation date)
- `POST /api/posts/` - Create a new post
- `GET /api/posts/{id}/` - Get specific post
- `PUT /api/posts/{id}/` - Update post (author only)
- `DELETE /api/posts/{id}/` - Delete post (author only)

#### Comments

- `GET /api/comments/` - List all comments (with optional post filter)
- `POST /api/comments/` - Add comment to post
- `PUT /api/comments/{id}/` - Update comment
- `DELETE /api/comments/{id}/` - Delete comment

#### User Profiles

- `GET /api/profiles/` - List all user profiles
- `GET /api/profiles/me/` - Get current user's profile
- `PUT /api/profiles/me/` - Update current user's profile
- `GET /api/profiles/{username}/` - Get user profile by username
- `GET /api/profiles/{username}/posts/` - Get posts by specific user (with pagination)

## 🎯 Key Django Models

### UserProfile

```python
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(max_length=500, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
```

### Post

```python
class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
```

### Comment

```python
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    body = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
```

## 🔄 Data Flow

1. **React Frontend** → Makes HTTP request to Django API
2. **Django URL Router** → Routes request to correct view
3. **Django View** → Processes request, interacts with database
4. **Django Serializer** → Converts data to JSON
5. **Django Response** → Returns JSON to React
6. **React Component** → Updates UI with received data

## 🎨 Design System

The application features a comprehensive design system with:

- **Color Palette**: Primary (blue) and secondary (purple) colors with full dark mode support
- **Typography**: Inter font family with consistent sizing and weights
- **Spacing**: Systematic spacing scale (4px base unit)
- **Components**: Reusable UI components (Button, Card, Modal)
- **Dark Mode**: Complete theme switching with system preference detection

## 🎨 CSS Architecture & Styling Organization

The application uses a well-structured CSS architecture with a comprehensive design system:

### 📁 CSS File Organization

```
frontend/src/
├── styles/
│   └── design-system.css      # Core design tokens and utilities
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.css         # Button component styles
│   │   ├── Card.css           # Card component styles
│   │   └── DarkModeToggle.jsx # Theme toggle component
│   ├── auth/                  # Authentication components
│   │   ├── LoginFormV2.css    # Login form styles
│   │   ├── RegisterFormV2.css # Registration form styles
│   │   └── AuthContainer.css  # Auth container styles
│   ├── layout/                # Layout components
│   │   ├── AppHeader.css      # Header navigation styles
│   │   └── Home.css           # Home page styles
│   ├── posts/                 # Post-related components
│   │   ├── Posts.css          # Posts page styles
│   │   ├── PostList.css       # Post list styles
│   │   ├── PostForm.css       # Post creation/editing styles
│   │   └── RepliesDrawer.css  # Comments/replies styles
│   ├── profile/               # Profile components
│   │   ├── Profile.css        # Profile page styles
│   │   └── EditProfileForm.css # Profile editing styles
│   ├── dropdown/              # Dropdown components
│   │   └── dropdown.css       # Dropdown styles
│   └── modals/                # Modal components
│       └── BaseModal.css      # Base modal styles
├── index.css                  # Global styles and imports
└── App.css                    # App-level styles
```

### 🎯 Design System Architecture

#### **Core Design Tokens** (`design-system.css`)

- **Color System**: 10-shade color palettes for primary, secondary, success, warning, error, and neutral colors
- **Typography Scale**: 9 font sizes (xs to 5xl) with consistent weights and line heights
- **Spacing System**: 4px base unit with 13 spacing values (0 to 24)
- **Border Radius**: 8 radius values from none to full
- **Shadows**: 5 shadow levels with consistent depth
- **Transitions**: 3 transition speeds (fast, base, slow)
- **Z-Index Scale**: 8 z-index values for layering

#### **Component Variables**

- **Button Variables**: Padding, border radius, font weight, transitions
- **Input Variables**: Padding, border styles, focus states
- **Card Variables**: Padding, border radius, shadows
- **Modal Variables**: Backdrop, border radius, shadows

#### **Utility Classes**

- **Text Utilities**: Color, size, weight, alignment
- **Spacing Utilities**: Padding and margin classes
- **Background Utilities**: Color and gradient backgrounds
- **Border Utilities**: Border styles and colors
- **Shadow Utilities**: Box shadow variations
- **Border Radius Utilities**: Radius variations

### 🧩 Component Styling Patterns

#### **UI Components** (`components/ui/`)

- **Button Component**: 6 variants (primary, secondary, outline, ghost, success, danger), 3 sizes, states (disabled, loading)
- **Card Component**: 4 variants (default, elevated, outlined, filled), multiple padding options, hover effects
- **Dark Mode Toggle**: Theme switching with system preference detection

#### **Feature Components**

- **Authentication Forms**: Consistent form styling with error states and responsive design
- **Layout Components**: Header with gradient backgrounds, navigation, user dropdown
- **Post Components**: List views, forms, search functionality with consistent spacing
- **Profile Components**: Profile display and editing with avatar management
- **Dropdown Components**: User menu and navigation dropdowns

### 🌙 Dark Mode Implementation

#### **Theme Context**

- **System Preference Detection**: Automatically detects user's system theme preference
- **Manual Toggle**: User can override system preference
- **Persistent Storage**: Theme choice saved in localStorage
- **No Flash**: Prevents flash of unstyled content on page load

#### **CSS Implementation**

- **CSS Custom Properties**: All colors defined as CSS variables
- **Theme Switching**: Uses `[data-theme="dark"]` attribute selector
- **Comprehensive Coverage**: All components have dark mode variants
- **Smooth Transitions**: Theme changes are animated

### 📱 Responsive Design

#### **Breakpoint Strategy**

- **Mobile First**: Base styles for mobile, enhancements for larger screens
- **Flexible Grids**: CSS Grid and Flexbox for responsive layouts
- **Component Adaptations**: Each component includes responsive variants

#### **Responsive Patterns**

- **Flexible Typography**: Font sizes scale appropriately
- **Adaptive Spacing**: Spacing adjusts for different screen sizes
- **Mobile Navigation**: Collapsible navigation for mobile devices
- **Touch-Friendly**: Adequate touch targets and spacing

### 🎨 Visual Design Features

#### **Gradient Backgrounds**

- **Primary Gradients**: Blue to purple gradients for headers and cards
- **Dark Mode Gradients**: Adjusted gradients for dark theme
- **Interactive Gradients**: Hover effects with gradient changes

#### **Modern Styling**

- **Glass Morphism**: Semi-transparent backgrounds with blur effects
- **Subtle Shadows**: Layered shadow system for depth
- **Smooth Animations**: Consistent transition timing
- **Micro-interactions**: Hover states and loading animations

#### **Accessibility**

- **High Contrast**: Adequate color contrast ratios
- **Focus States**: Clear focus indicators for keyboard navigation
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Reduced Motion**: Respects user's motion preferences

### 🔧 Development Workflow

#### **CSS Organization Principles**

- **Component-Scoped**: Each component has its own CSS file
- **Design Token Usage**: Consistent use of design system variables
- **BEM Methodology**: Block-Element-Modifier naming convention
- **Modular Structure**: Reusable components with clear interfaces

#### **Maintenance Benefits**

- **Consistent Styling**: Design tokens ensure visual consistency
- **Easy Theming**: Dark mode and future themes easily implemented
- **Scalable Architecture**: New components follow established patterns
- **Performance Optimized**: CSS custom properties for efficient updates

## ⚠️ Note on Constants

The `frontend/src/utils/constants.js` file contains many references to features that are not currently implemented:

**Currently Implemented:**

- User authentication (login/register/logout)
- Posts and comments system
- User profiles with avatars
- Dark mode support

**Referenced but Not Implemented:**

- "Game-U Platform" branding (app is actually a social media platform)
- User roles (student, instructor, admin) and role-based permissions
- Course management features
- Project management features
- File upload system (only avatars work)
- Pagination system
- Notification system
- Advanced search functionality
- Admin panel routes

The constants file appears to be designed for a future educational gaming platform, but the current application is a Reddit-style social media platform focused on posts and discussions.

## 🛠️ Development Tips

### Django Admin

- Visit `http://localhost:8000/admin/` to manage data
- Great for testing and data management

### Hot Reload

- React: Changes auto-refresh in browser (Vite)
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

### Authentication

- Uses Django REST Framework Token Authentication
- Tokens are stored in localStorage for persistence
- Automatic token cleanup on logout

## 🚀 Next Steps

1. **Add Real-time Features** - WebSocket integration for live updates
2. **Add Notifications** - User notification system
3. **Add Advanced Search** - Full-text search with filters
4. **Add Pagination** - Handle large datasets efficiently
5. **Add Testing** - Unit and integration tests
6. **Add Social Features** - User following, likes, shares
7. **Add Mobile Responsiveness** - Improve mobile experience
8. **Add Image Upload** - Support for post images
9. **Add Email Verification** - User email confirmation
10. **Add Password Reset** - Forgot password functionality

## 📚 Learning Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🐛 Troubleshooting

### Common Issues

- **CORS errors**: Ensure Django CORS headers are properly configured in settings.py
- **Media files not loading**: Check Django media settings and file permissions
- **Authentication issues**: Verify token handling in frontend AuthContext
- **Dark mode not working**: Check localStorage and CSS variable definitions

### Environment Setup

- Backend runs on `http://localhost:8000`
- Frontend runs on `http://localhost:5173`
- CORS is configured for frontend origin
- Database is SQLite (can be changed to PostgreSQL for production)

Happy coding! 🎉
