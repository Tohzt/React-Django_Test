# Game-U Platform - Project Structure Guide

## 🏗️ **Project Organization Philosophy**

This project follows a **feature-based architecture** with clear separation of concerns, making it scalable for the Game-U educational platform. The structure prioritizes:

- **Maintainability**: Easy to find and modify code
- **Scalability**: Can grow with Game-U's needs
- **Reusability**: Components and utilities can be shared
- **Consistency**: Uniform patterns across the codebase

## 📁 **Frontend Structure**

```
frontend/src/
├── components/                 # React components
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.jsx         # Button component with variants
│   │   ├── Button.css         # Button styles
│   │   ├── Card.jsx           # Card component with variants
│   │   ├── Card.css           # Card styles
│   │   └── index.js           # UI components export
│   ├── auth/                  # Authentication components
│   ├── posts/                 # Post-related components
│   ├── profile/               # Profile components
│   ├── layout/                # Layout components
│   └── modals/                # Modal components
├── context/                   # React Context providers
│   └── AuthContext.jsx        # Authentication context
├── hooks/                     # Custom React hooks
│   ├── useApi.js              # API call hooks
│   ├── useAuth.js             # Authentication hooks
│   └── useLocalStorage.js     # Local storage hooks
├── utils/                     # Utility functions
│   ├── constants.js           # Application constants
│   ├── api.js                 # API helper functions
│   ├── validation.js          # Form validation
│   └── helpers.js             # General helper functions
├── styles/                    # Global styles
│   └── design-system.css      # Design system variables
├── assets/                    # Static assets
│   ├── images/                # Image files
│   ├── icons/                 # Icon files
│   └── fonts/                 # Custom fonts
└── pages/                     # Page components (future)
    ├── Dashboard.jsx          # Main dashboard
    ├── Courses.jsx            # Course management
    └── Projects.jsx           # Student projects
```

## 🎨 **Design System Architecture**

### **Color System**

```css
/* Primary Colors - Game-U Brand */
--primary-50 to --primary-900    /* Blue shades */
--secondary-50 to --secondary-900 /* Purple shades */

/* Semantic Colors */
--success-500, --warning-500, --error-500

/* Neutral Colors */
--neutral-50 to --neutral-900

/* Contextual Colors */
--bg-primary, --text-primary, --border-light
```

### **Typography Scale**

```css
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 1.875rem  /* 30px */
--text-4xl: 2.25rem   /* 36px */
--text-5xl: 3rem      /* 48px */
```

### **Spacing System**

```css
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
```

## 🔧 **Component Patterns**

### **UI Component Structure**

```jsx
// Button.jsx - Example of a well-structured component
const Button = ({
	children,
	variant = "primary", // Design system variant
	size = "medium", // Size variant
	disabled = false, // State
	loading = false, // Loading state
	fullWidth = false, // Layout option
	onClick, // Event handler
	type = "button", // HTML attribute
	className = "", // Additional classes
	...props // Spread remaining props
}) => {
	// Component logic here
};
```

### **CSS Class Naming Convention**

```css
/* BEM Methodology */
.component {
} /* Block */
.component--variant {
} /* Modifier */
.component__element {
} /* Element */
.component__element--state {
} /* Element modifier */
```

## 📊 **Backend Structure**

```
backend/
├── core/                       # Django project settings
│   ├── settings.py            # Main settings
│   ├── urls.py                # Main URL routing
│   └── wsgi.py                # WSGI configuration
├── posts/                      # Main app (will be renamed)
│   ├── models.py              # Database models
│   ├── api/                   # REST API
│   │   ├── views.py           # API views
│   │   ├── serializers.py     # Data serialization
│   │   ├── auth_views.py      # Authentication
│   │   ├── profile_views.py   # Profile management
│   │   └── urls.py            # API URLs
│   └── migrations/            # Database migrations
├── courses/                    # Future: Course management
├── projects/                   # Future: Student projects
├── users/                      # Future: User management
└── utils/                      # Backend utilities
    ├── permissions.py          # Custom permissions
    ├── validators.py           # Custom validators
    └── helpers.py              # Helper functions
```

## 🎯 **Game-U Specific Features**

### **User Roles & Permissions**

```javascript
// User roles for Game-U platform
USER_ROLES = {
	STUDENT: "student",
	INSTRUCTOR: "instructor",
	ADMIN: "admin",
};

// Role-based permissions
ROLE_PERMISSIONS = {
	[USER_ROLES.STUDENT]: {
		canCreatePosts: true,
		canUploadProjects: true,
		canViewCourses: true,
	},
	[USER_ROLES.INSTRUCTOR]: {
		canManageStudents: true,
		canCreateCourses: true,
		canGradeProjects: true,
	},
	[USER_ROLES.ADMIN]: {
		canManageUsers: true,
		canAccessAdminPanel: true,
		canManageSystem: true,
	},
};
```

### **File Upload Structure**

```javascript
FILE_CONFIG = {
	UPLOAD_PATHS: {
		AVATARS: "avatars/",
		POST_IMAGES: "posts/images/",
		COURSE_MATERIALS: "courses/materials/",
		STUDENT_PROJECTS: "projects/",
	},
	ALLOWED_TYPES: {
		GAME_FILES: [".unity", ".godot", ".love", ".exe", ".zip"],
	},
};
```

## 🚀 **Development Workflow**

### **1. Component Development**

```bash
# Create new UI component
touch src/components/ui/NewComponent.jsx
touch src/components/ui/NewComponent.css

# Add to exports
echo "export { default as NewComponent } from './NewComponent';" >> src/components/ui/index.js
```

### **2. Feature Development**

```bash
# Create feature directory
mkdir src/components/feature-name
touch src/components/feature-name/FeatureComponent.jsx
touch src/components/feature-name/FeatureComponent.css
```

### **3. API Integration**

```bash
# Add API endpoint to constants
# Update utils/api.js with new functions
# Create custom hooks if needed
```

## 📋 **Naming Conventions**

### **Files & Directories**

- **Components**: PascalCase (`UserProfile.jsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.js`)
- **Utilities**: camelCase (`apiHelpers.js`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)
- **CSS Classes**: kebab-case (`user-profile-card`)

### **Variables & Functions**

- **Components**: PascalCase (`UserProfile`)
- **Functions**: camelCase (`getUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Variables**: kebab-case (`--primary-color`)

## 🔄 **State Management Strategy**

### **Local State**

- Use `useState` for component-specific state
- Use `useReducer` for complex state logic

### **Global State**

- Use React Context for auth, theme, notifications
- Consider Redux Toolkit for complex state (future)

### **Server State**

- Use custom hooks for API calls
- Implement caching strategies
- Handle loading and error states

## 🧪 **Testing Strategy**

### **Component Testing**

```javascript
// Example test structure
describe("Button Component", () => {
	it("renders with correct variant", () => {});
	it("handles click events", () => {});
	it("shows loading state", () => {});
});
```

### **API Testing**

```python
# Django test example
class PostAPITestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(...)

    def test_create_post(self):
        # Test post creation
```

## 📈 **Performance Considerations**

### **Code Splitting**

```javascript
// Lazy load components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Courses = lazy(() => import("./pages/Courses"));
```

### **Image Optimization**

- Use WebP format when possible
- Implement lazy loading
- Provide multiple sizes for responsive images

### **Bundle Optimization**

- Tree shaking for unused code
- Dynamic imports for large libraries
- Optimize third-party dependencies

## 🔒 **Security Best Practices**

### **Frontend Security**

- Validate all user inputs
- Sanitize data before rendering
- Use HTTPS in production
- Implement proper CORS policies

### **Backend Security**

- Use Django's built-in security features
- Implement proper authentication
- Validate all API inputs
- Use environment variables for secrets

## 🎨 **Design System Usage**

### **Using Design System Variables**

```css
.my-component {
	color: var(--text-primary);
	background: var(--bg-secondary);
	padding: var(--space-4);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-md);
}
```

### **Creating New Components**

```jsx
import { Button, Card } from "../ui";

const MyFeature = () => (
	<Card variant="elevated" padding="large">
		<Card.Header>Feature Title</Card.Header>
		<Card.Body>
			<Button variant="primary" size="large">
				Action Button
			</Button>
		</Card.Body>
	</Card>
);
```

This structure provides a solid foundation for scaling the Game-U platform while maintaining code quality and developer experience.
