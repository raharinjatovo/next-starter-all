# Contributing to Next.js Starter

Thank you for your interest in contributing to this Next.js starter template! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/next-starter-all.git
   cd next-starter-all
   ```

3. **Set up the project**
   ```bash
   ./setup.sh
   # or manually:
   npm install
   cp .env.example .env.local
   # Edit .env.local with your values
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing code patterns and conventions
- Use Prettier for code formatting (configured in the project)
- Follow ESLint rules (configured in the project)

### Commit Messages
Use conventional commit format:
```
type(scope): description

Examples:
feat(auth): add LinkedIn OAuth provider
fix(ui): correct responsive layout on mobile
docs(readme): update setup instructions
```

### Pull Request Process
1. Ensure your code follows the existing style
2. Add tests if adding new functionality
3. Update documentation if needed
4. Make sure all existing tests pass
5. Create a clear PR description explaining your changes

## 🧪 Testing

```bash
# Run linting
npm run lint

# Check TypeScript
npm run type-check

# Test build
npm run build
```

## 📁 Project Structure

When adding new features, follow these conventions:

```
src/
├── app/
│   ├── api/              # API routes
│   ├── (auth)/          # Authentication pages
│   ├── components/       # Reusable components
│   └── ...
├── lib/                 # Utility functions and configurations
└── types/               # TypeScript type definitions
```

## 🎯 Areas for Contribution

We welcome contributions in these areas:

### Features
- New authentication providers
- Additional UI components
- Database schema improvements
- API enhancements

### Documentation
- Code comments
- README improvements
- Setup guides
- Examples and tutorials

### Bug Fixes
- Authentication issues
- UI/UX improvements
- Performance optimizations
- Security enhancements

### Testing
- Unit tests
- Integration tests
- E2E tests

## 🔧 Adding New OAuth Providers

To add a new OAuth provider:

1. **Install the provider package** (if needed)
   ```bash
   npm install next-auth-provider-name
   ```

2. **Add to auth configuration** (`src/lib/auth.ts`)
   ```typescript
   import NewProvider from "next-auth/providers/new-provider"
   
   providers: [
     // ... existing providers
     NewProvider({
       clientId: process.env.NEW_PROVIDER_CLIENT_ID,
       clientSecret: process.env.NEW_PROVIDER_CLIENT_SECRET,
     }),
   ]
   ```

3. **Update environment variables** (`.env.example`)
   ```env
   NEW_PROVIDER_CLIENT_ID="your-client-id"
   NEW_PROVIDER_CLIENT_SECRET="your-client-secret"
   ```

4. **Add UI button** (update registration/login components)

5. **Update documentation**

## 🐛 Reporting Issues

When reporting issues, please include:

- **Environment details**: Node.js version, npm version, OS
- **Steps to reproduce**: Clear steps to reproduce the issue
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Screenshots**: If applicable
- **Error messages**: Full error messages and stack traces

## 📖 Documentation

When adding features, please:

- Update the README.md if needed
- Add inline code comments for complex logic
- Update type definitions
- Add examples in the documentation

## 🚀 Release Process

Releases are handled by maintainers:

1. Version bump in `package.json`
2. Update CHANGELOG.md
3. Create GitHub release
4. Update documentation

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Documentation**: Check the README.md first

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Recognition

All contributors will be recognized in the project. Thank you for helping make this starter template better!

---

Happy contributing! 🎉