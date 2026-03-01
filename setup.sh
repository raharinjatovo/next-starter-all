#!/bin/bash

# Next.js Starter Setup Script
echo "🚀 Setting up Next.js Starter Project..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js $(node -v) detected"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    print_info "Creating .env.local from example..."
    cp .env.example .env.local
    print_warning "Please edit .env.local with your actual values"
    echo ""
    echo "Required environment variables to configure:"
    echo "  - DATABASE_URL (PostgreSQL connection string)"
    echo "  - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
    echo "  - OAuth provider credentials (optional)"
    echo ""
else
    print_status ".env.local already exists"
fi

# Install dependencies
print_info "Installing dependencies..."
if npm install; then
    print_status "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Check if tsx is available for seed script
if ! npm list tsx --depth=0 &> /dev/null; then
    print_info "Installing tsx for database seeding..."
    npm install --save-dev tsx
fi

# Check if Prisma is available
if command -v npx prisma &> /dev/null; then
    print_info "Setting up database..."
    
    # Generate Prisma client
    print_info "Generating Prisma client..."
    if npx prisma generate; then
        print_status "Prisma client generated successfully"
    else
        print_error "Failed to generate Prisma client"
        exit 1
    fi
    
    echo ""
    print_status "Database setup complete!"
    echo ""
    print_info "Next database steps:"
    echo "  1. Configure your DATABASE_URL in .env.local"
    echo "  2. Run: npm run db:migrate   (to apply migrations)"
    echo "  3. Run: npm run db:seed      (to add demo data)"
    echo "  4. Run: npm run db:studio    (to view database)"
else
    print_error "Prisma not found. Please run 'npm install' first."
fi

echo ""
print_status "Setup complete!"
echo ""
print_info "📋 Next steps:"
echo "  1. Edit .env.local with your database URL and secrets"
echo "  2. Set up your PostgreSQL database"
echo "  3. Run 'npm run db:migrate' to set up your database schema"
echo "  4. Run 'npm run db:seed' to add demo data (optional)"
echo "  5. Run 'npm run dev' to start the development server"
echo ""
print_info "📚 Documentation:"
echo "  - README.md       - Project overview and features"
echo "  - API.md          - API documentation"
echo "  - DEPLOYMENT.md   - Deployment guides"
echo "  - CONTRIBUTING.md - How to contribute"
echo ""
print_info "🔑 Demo credentials (after seeding):"
echo "  Email: demo@example.com"
echo "  Password: demo123"
echo ""
print_status "Happy coding! 🎉"