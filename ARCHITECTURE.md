# Project Architecture

This document describes the architecture and technical decisions behind the Next.js Starter project.

## 🏗️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                       │
├─────────────────────────────────────────────────────────────┤
│  Next.js App Router  │  React 19  │  TypeScript  │ Tailwind │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                     Authentication Layer                    │
├─────────────────────────────────────────────────────────────┤
│               NextAuth v5 with Multiple Providers          │
│  Credentials │ GitHub │ Google │ Facebook │ LinkedIn        │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                       API Layer                            │
├─────────────────────────────────────────────────────────────┤
│         Next.js API Routes with Type Safety               │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                    Database Layer                          │
├─────────────────────────────────────────────────────────────┤
│              Prisma ORM + PostgreSQL                      │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Directory Structure

### App Router Structure (`src/app/`)
```
src/app/
├── layout.tsx                 # Root layout with providers
├── page.tsx                   # Home page with auth status
├── globals.css                # Global styles and Tailwind
├── AuthButton.tsx             # Login/Logout components
├── api/                       # API Routes
│   ├── auth/
│   │   ├── [...nextauth]/     # NextAuth.js handlers
│   │   └── register/          # User registration endpoint
│   └── page.tsx               # API documentation page
├── register/                  # User registration pages
│   └── page.tsx              # Registration form
├── profile/                   # User profile pages
│   └── page.tsx              # Profile management
├── components/                # Reusable UI components
│   ├── ui/                   # Basic UI components
│   └── forms/                # Form components
├── parts/                     # Layout components
│   └── Header.tsx            # Footer component
├── fonts/                     # Local font files
│   ├── GeistVF.woff
│   └── GeistMonoVF.woff
└── favicon.ico               # Application favicon
```

### Library Structure (`src/lib/`)
```
src/lib/
├── auth.ts                   # NextAuth configuration
├── prisma.ts                 # Prisma client instance
├── utils.ts                  # Utility functions
├── validations.ts            # Zod schemas for validation
└── constants.ts              # Application constants
```

### Database Structure (`prisma/`)
```
prisma/
├── schema.prisma            # Database schema definition
├── seed.ts                  # Database seeding script
└── migrations/              # Database migration files
    └── [timestamp]_[name]/
        └── migration.sql
```

## 🔧 Technology Stack

### Frontend Framework
- **Next.js 15.0.3**: Latest version with App Router
- **React 19.0.0 RC**: Cutting-edge React features
- **TypeScript**: Full type safety throughout the application

### Styling
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization
- **Custom CSS Variables**: For theme consistency

### Authentication
- **NextAuth v5 (beta)**: Modern authentication library
- **JWT Strategy**: Stateless session management
- **OAuth Providers**: GitHub, Google, Facebook, LinkedIn
- **Credentials Provider**: Email/password authentication

### Database
- **PostgreSQL**: Production-ready relational database
- **Prisma ORM 6.0.1**: Type-safe database access
- **Bcrypt**: Password hashing for security

### Development Tools
- **ESLint**: Code linting and quality
- **TypeScript Compiler**: Type checking
- **Prettier**: Code formatting (recommended)

## 🔐 Authentication Architecture

### Authentication Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │───▶│  NextAuth   │───▶│  Provider   │
│             │    │             │    │ (OAuth/Cred)│
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │                   ▼                   │
       │            ┌─────────────┐            │
       │            │  Database   │            │
       │            │   (User)    │            │
       │            └─────────────┘            │
       │                   │                   │
       │                   ▼                   │
       │            ┌─────────────┐            │
       └────────────│ JWT Session │◄───────────┘
                    │   (Client)  │
                    └─────────────┘
```

### Session Management
- **JWT Tokens**: Stateless session storage
- **Secure Cookies**: HttpOnly, SameSite, Secure flags
- **Token Refresh**: Automatic token renewal
- **CSRF Protection**: Built-in CSRF token validation

### Provider Integration
```typescript
// OAuth Provider Configuration
providers: [
  CredentialsProvider({
    // Email/password authentication
    authorize: async (credentials) => {
      // Validate credentials against database
      return user || null;
    }
  }),
  GitHubProvider({
    // GitHub OAuth configuration
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),
  // Additional providers...
]
```

## 🗄️ Database Architecture

### Entity Relationship Diagram
```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │    Post     │       │   Profile   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │◄──────┤ authorId    │       │ userId      │────┐
│ email       │       │ id          │       │ id          │    │
│ name        │       │ title       │       │ bio         │    │
│ password    │       │ content     │       └─────────────┘    │
│ createdAt   │       │ published   │                          │
│ updatedAt   │       │ createdAt   │                          │
└─────────────┘       │ updatedAt   │                          │
       │              └─────────────┘                          │
       └─────────────────────────────────────────────────────────┘
                    One-to-One Relationship
```

### Data Models

#### User Model
```prisma
model User {
  id       Int       @id @default(autoincrement())
  email    String    @unique
  name     String?
  password String?   // For credential authentication
  posts    Post[]    // One-to-many relationship
  profile  Profile?  // One-to-one relationship
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Post Model
```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🎨 UI Architecture

### Component Hierarchy
```
App Layout
├── Navigation
├── Page Content
│   ├── Authentication Components
│   │   ├── LoginButton
│   │   ├── LogoutButton
│   │   └── AuthStatus
│   ├── Form Components
│   │   ├── RegistrationForm
│   │   └── ProfileForm
│   └── Content Components
└── Footer
```

### Styling Strategy
- **Utility-First**: Tailwind CSS for rapid development
- **Component-Based**: Reusable styled components
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: CSS custom properties for theming

### Design System
```css
/* Color Palette */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 98%;
  /* Additional colors... */
}
```

## 🔧 API Architecture

### RESTful API Design
```
Authentication Endpoints:
├── POST /api/auth/register     # User registration
├── GET  /api/auth/signin       # Sign in page
├── POST /api/auth/signin       # Process sign in
├── GET  /api/auth/signout      # Sign out
├── GET  /api/auth/session      # Get session
└── GET  /api/auth/providers    # Available providers

Future Endpoints:
├── GET    /api/users/profile   # Get user profile
├── PUT    /api/users/profile   # Update profile
├── GET    /api/posts           # List posts
├── POST   /api/posts           # Create post
├── PUT    /api/posts/[id]      # Update post
└── DELETE /api/posts/[id]      # Delete post
```

### Error Handling
```typescript
// Standardized error responses
interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

// HTTP Status Codes
200: Success
201: Created
400: Bad Request
401: Unauthorized
403: Forbidden
404: Not Found
409: Conflict
500: Internal Server Error
```

## 🚀 Build & Deployment Architecture

### Build Process
```
Source Code
    │
    ▼
TypeScript Compilation
    │
    ▼
Prisma Client Generation
    │
    ▼
Next.js Build Process
    │
    ▼
Static Assets + Server Bundle
    │
    ▼
Deployment Target
```

### Environment Management
```
Development (.env.local)
├── Local database
├── Development OAuth apps
└── Debug configurations

Production (.env.production)
├── Production database
├── Production OAuth apps
├── Security configurations
└── Performance optimizations
```

## 📊 Performance Considerations

### Frontend Optimization
- **Static Generation**: Pre-rendered pages where possible
- **Image Optimization**: Next.js automatic image optimization
- **Font Optimization**: Local font loading with next/font
- **Bundle Splitting**: Automatic code splitting

### Database Optimization
- **Connection Pooling**: Prisma connection management
- **Query Optimization**: Efficient Prisma queries
- **Indexing**: Database indexes on frequently queried fields
- **Migrations**: Version-controlled schema changes

### Caching Strategy
- **Static Assets**: CDN caching
- **API Responses**: HTTP caching headers
- **Database Queries**: Query result caching
- **Session Data**: JWT token storage

## 🔒 Security Architecture

### Authentication Security
- **Password Hashing**: Bcrypt with salt rounds
- **JWT Security**: Signed tokens with expiration
- **CSRF Protection**: Built-in NextAuth protection
- **Session Security**: Secure cookie configuration

### Data Protection
- **Input Validation**: Server-side validation
- **SQL Injection**: Prisma ORM protection
- **XSS Prevention**: React automatic escaping
- **Environment Variables**: Sensitive data protection

### API Security
- **Rate Limiting**: Future implementation
- **CORS Configuration**: Controlled cross-origin requests
- **HTTPS Enforcement**: Production SSL/TLS
- **Error Handling**: No sensitive data exposure

## 🔄 Future Architecture Considerations

### Scalability
- **Horizontal Scaling**: Stateless JWT sessions
- **Database Scaling**: Read replicas, connection pooling
- **Caching Layer**: Redis for session storage
- **CDN Integration**: Global asset distribution

### Monitoring
- **Error Tracking**: Integration with Sentry
- **Performance Monitoring**: Core Web Vitals
- **Analytics**: User behavior tracking
- **Logging**: Structured application logs

### Feature Extensions
- **Real-time Features**: WebSocket integration
- **File Upload**: Image and document handling
- **Notifications**: Email and push notifications
- **Admin Panel**: Administrative interface

---

This architecture is designed to be maintainable, scalable, and developer-friendly while following modern web development best practices.