# Next.js Starter - Complete Authentication & Database Template

A comprehensive Next.js starter template that includes everything you need to build a modern web application with authentication, database integration, and responsive design.

## 🚀 Features

### Authentication System
- **Multiple OAuth Providers**: GitHub, Google, Facebook, LinkedIn
- **Email/Password Authentication**: Secure credential-based login with bcrypt password hashing
- **Session Management**: JWT-based sessions with NextAuth v5
- **User Registration**: Complete signup flow with form validation
- **Automatic User Creation**: OAuth users are automatically created in database

### Database & ORM
- **PostgreSQL**: Production-ready database
- **Prisma ORM**: Type-safe database access with migrations
- **Complete Schema**: Users, Posts, and Profiles with proper relationships
- **Password Security**: Bcrypt hashing for credential authentication

### UI & Styling
- **Tailwind CSS**: Utility-first styling with custom theme
- **Responsive Design**: Mobile-first approach
- **Modern Components**: Clean, accessible UI components
- **Dark Mode Ready**: Structured for easy dark mode implementation

### Modern Stack
- **Next.js 15**: Latest version with App Router
- **React 19 RC**: Cutting-edge React features
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency

## 🛠️ Tech Stack

- **Framework**: Next.js 15.0.3
- **Frontend**: React 19.0.0 RC, TypeScript
- **Authentication**: NextAuth v5 (beta)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready configuration

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- OAuth provider credentials (optional, for social login)

## ⚡ Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd next-starter-all
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/next_starter"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Facebook and LinkedIn credentials if needed
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/     # NextAuth handlers
│   │       └── register/          # User registration API
│   ├── register/                  # Registration page
│   ├── profile/                   # User profile pages
│   ├── components/                # Reusable UI components
│   ├── parts/                     # Layout components
│   │   └── Header.tsx            # Footer component
│   ├── AuthButton.tsx            # Login/Logout buttons
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   └── prisma.ts                 # Prisma client setup
└── prisma/
    ├── schema.prisma             # Database schema
    └── migrations/               # Database migrations
```

## 🔐 Authentication Flow

### Credential Authentication
1. User registers with email/password on `/register`
2. Password is hashed with bcrypt and stored in database
3. User can login with credentials via NextAuth

### OAuth Authentication
1. User clicks OAuth provider button
2. Redirected to provider for authorization
3. User automatically created in database on first login
4. Session established with JWT

### Session Management
- JWT tokens store user session data
- Sessions persist across browser sessions
- Automatic token refresh handling

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id       Int       @id @default(autoincrement())
  email    String    @unique
  name     String?
  password String?   // For credential auth
  posts    Post[]
  profile  Profile?
}
```

### Post Model
```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

### Profile Model
```prisma
model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}
```

## 🚀 Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database commands
npx prisma studio          # Database GUI
npx prisma migrate dev     # Create and apply migration
npx prisma generate        # Generate Prisma client
```

## 🔧 Configuration

### OAuth Providers Setup

#### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Add Client ID and Secret to `.env.local`

#### Google OAuth
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Add Client ID and Secret to `.env.local`

### Database Configuration
- Default: PostgreSQL
- Can be configured for other databases supported by Prisma
- Update `DATABASE_URL` in `.env.local` with your connection string

## 📱 Responsive Design

The application is built with mobile-first responsive design:
- Tailwind CSS breakpoints for all screen sizes
- Optimized forms and buttons for touch interfaces
- Accessible navigation and interactions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Other Platforms
- Compatible with any Node.js hosting platform
- Ensure PostgreSQL database is accessible
- Set all required environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the [Issues](../../issues) page
2. Review the environment setup
3. Ensure all dependencies are installed
4. Verify database connection

## 🔄 Updates

This starter template is regularly updated to include:
- Latest Next.js features
- Security updates
- New authentication providers
- Improved components and patterns

---

**Happy Coding!** 🎉
