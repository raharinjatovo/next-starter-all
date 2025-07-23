# Deployment Guide

This guide covers deploying your Next.js Starter application to various platforms.

## 🚀 Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Prerequisites
- GitHub account with your repository
- Vercel account (free)
- PostgreSQL database (Railway, Supabase, Neon, etc.)

### Steps

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   Add these in Vercel's Environment Variables section:
   ```env
   DATABASE_URL=your-production-database-url
   NEXTAUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://your-app.vercel.app
   
   # OAuth providers (if using)
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

4. **Database Migration**
   After first deployment, run migrations:
   ```bash
   # In your local terminal with production DATABASE_URL
   npx prisma migrate deploy
   ```

### OAuth Callback URLs for Production
Update your OAuth app settings:
- GitHub: `https://your-app.vercel.app/api/auth/callback/github`
- Google: `https://your-app.vercel.app/api/auth/callback/google`

## 🐳 Docker Deployment

### Dockerfile
Create a `Dockerfile` in your project root:

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/nextdb
      - NEXTAUTH_SECRET=your-secret
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=nextdb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## ☁️ Railway

1. **Create Account**: Sign up at [Railway](https://railway.app)

2. **Connect Repository**
   - Create new project
   - Connect GitHub repository

3. **Add PostgreSQL**
   - Add PostgreSQL service to your project
   - Copy the database URL

4. **Environment Variables**
   ```env
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   NEXTAUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://your-app.railway.app
   ```

5. **Deploy**
   Railway automatically builds and deploys on git push

## 🌊 Netlify

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: out
   ```

2. **Add to next.config.ts**
   ```typescript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

3. **Environment Variables**
   Add in Netlify dashboard

## 🚀 DigitalOcean App Platform

1. **Create App**
   - Connect GitHub repository
   - Choose Node.js

2. **Build Configuration**
   ```yaml
   build_command: npm run build
   run_command: npm start
   ```

3. **Environment Variables**
   Configure in DigitalOcean dashboard

## 🗄️ Database Options

### Supabase (PostgreSQL)
- Free tier available
- Built-in auth (can replace NextAuth if desired)
- Real-time features

### Railway PostgreSQL
- Simple setup
- Integrated with Railway deployment

### Neon (PostgreSQL)
- Serverless PostgreSQL
- Generous free tier

### PlanetScale (MySQL)
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}
```

## 🔐 Environment Variables Checklist

### Required
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXTAUTH_SECRET` - Random secret for JWT signing
- [ ] `NEXTAUTH_URL` - Your production URL

### OAuth (Optional)
- [ ] `GITHUB_ID` & `GITHUB_SECRET`
- [ ] `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- [ ] `FACEBOOK_CLIENT_ID` & `FACEBOOK_CLIENT_SECRET`
- [ ] `LINKEDIN_CLIENT_ID` & `LINKEDIN_CLIENT_SECRET`

## 🔧 Production Checklist

### Security
- [ ] Use strong `NEXTAUTH_SECRET`
- [ ] Enable HTTPS
- [ ] Update OAuth callback URLs
- [ ] Set secure cookie settings
- [ ] Enable CSRF protection

### Performance
- [ ] Enable caching headers
- [ ] Optimize images
- [ ] Use CDN for static assets
- [ ] Monitor bundle size

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor performance
- [ ] Set up uptime monitoring
- [ ] Configure logging

## 🚨 Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Regenerate Prisma client
npx prisma generate

# Check TypeScript
npm run type-check
```

### Database Issues
```bash
# Reset database (caution!)
npx prisma migrate reset

# Apply pending migrations
npx prisma migrate deploy

# Check database status
npx prisma db pull
```

### OAuth Issues
- Verify callback URLs match exactly
- Check client ID/secret are correct
- Ensure NEXTAUTH_URL is set correctly

## 📈 Scaling Considerations

### Database
- Connection pooling (PgBouncer)
- Read replicas
- Database monitoring

### Application
- Horizontal scaling
- Load balancing
- Caching strategies (Redis)

### Infrastructure
- CDN for static assets
- Image optimization service
- API rate limiting

---

Need help with deployment? Check the [troubleshooting section](#-troubleshooting) or open an issue!