# API Documentation

This document describes the API endpoints available in the Next.js Starter application.

## Authentication Endpoints

### NextAuth.js Handlers

**Base URL**: `/api/auth`

All authentication is handled by NextAuth.js with the following endpoints:

- `GET/POST /api/auth/signin` - Sign in page and authentication
- `GET/POST /api/auth/signout` - Sign out functionality  
- `GET /api/auth/session` - Get current session
- `GET /api/auth/csrf` - Get CSRF token
- `GET /api/auth/providers` - Get available auth providers
- `GET/POST /api/auth/callback/[provider]` - OAuth callback handlers

### User Registration

**Endpoint**: `POST /api/auth/register`

Register a new user with email and password.

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe" // optional
}
```

#### Response

**Success (201)**
```json
{
  "id": 1,
  "email": "user@example.com", 
  "name": "John Doe"
}
```

**Error (400) - Missing Fields**
```json
{
  "message": "Email and password are required"
}
```

**Error (409) - User Exists**
```json
{
  "message": "User already exists"
}
```

**Error (500) - Server Error**
```json
{
  "message": "An error occurred during registration"
}
```

## Authentication Flow

### Credential Authentication

1. **Register**: `POST /api/auth/register`
2. **Sign In**: `POST /api/auth/signin` with credentials
3. **Session**: Managed via JWT tokens

### OAuth Authentication

1. **Initiate**: `GET /api/auth/signin/[provider]`
2. **Callback**: `GET /api/auth/callback/[provider]`
3. **Auto-registration**: Users created automatically on first OAuth login

### Supported OAuth Providers

- **GitHub**: `/api/auth/signin/github`
- **Google**: `/api/auth/signin/google`
- **Facebook**: `/api/auth/signin/facebook`
- **LinkedIn**: `/api/auth/signin/linkedin`

## Session Management

### Get Current Session

**Client-side** (using next-auth/react):
```javascript
import { useSession } from "next-auth/react"

const { data: session, status } = useSession()
```

**Server-side** (in API routes or pages):
```javascript
import { auth } from "@/lib/auth"

const session = await auth()
```

### Session Object Structure

```typescript
interface Session {
  user: {
    id: string
    email: string
    name?: string
    username?: string // GitHub username if available
    image?: string
  }
  expires: string
}
```

## Database Schema

### User Model
```prisma
model User {
  id       Int       @id @default(autoincrement())
  email    String    @unique
  name     String?
  password String?   // Hashed password for credential auth
  posts    Post[]
  profile  Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
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
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
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

## Error Handling

### Standard Error Responses

All API endpoints return errors in the following format:

```json
{
  "message": "Error description",
  "code": "ERROR_CODE", // optional
  "details": {} // optional additional details
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created (registration success)
- `400` - Bad Request (missing/invalid data)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (insufficient permissions)
- `409` - Conflict (user already exists)
- `500` - Internal Server Error

## Security

### Password Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Plain text passwords are never stored in the database

### CSRF Protection
- NextAuth.js provides built-in CSRF protection
- CSRF tokens are automatically handled

### Session Security
- JWT tokens are signed with `NEXTAUTH_SECRET`
- Sessions have configurable expiration times
- Secure cookie settings in production

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for:
- Registration endpoint
- Authentication attempts
- Password reset requests

## Environment Variables

Required environment variables for API functionality:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="random-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (optional)
GITHUB_ID="github-client-id"
GITHUB_SECRET="github-client-secret"
GOOGLE_CLIENT_ID="google-client-id"
GOOGLE_CLIENT_SECRET="google-client-secret"
```

## Future API Endpoints

Potential endpoints for future development:

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/posts` - List posts
- `POST /api/posts` - Create post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

## Examples

### Register New User
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securepassword',
    name: 'John Doe'
  }),
});

const data = await response.json();
```

### Sign In with Credentials
```javascript
import { signIn } from "next-auth/react"

const result = await signIn('credentials', {
  email: 'user@example.com',
  password: 'securepassword',
  redirect: false,
})
```

### Sign In with OAuth
```javascript
import { signIn } from "next-auth/react"

await signIn('github')
await signIn('google')
```

### Check Authentication Status
```javascript
import { useSession } from "next-auth/react"

function Component() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Access Denied</p>
  
  return <p>Signed in as {session.user.email}</p>
}
```