import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create a demo user
  const hashedPassword = await bcrypt.hash('demo123', 10);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: hashedPassword,
    },
  });

  console.log('👤 Created demo user:', demoUser.email);

  // Create a demo profile
  const demoProfile = await prisma.profile.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      bio: 'This is a demo user profile created during database seeding.',
    },
  });

  console.log('📝 Created demo profile for user:', demoUser.email);

  // Create demo posts
  const demoPosts = await Promise.all([
    prisma.post.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Welcome to Next.js Starter',
        content: 'This is your first post! You can edit or delete this post and create new ones.',
        published: true,
        authorId: demoUser.id,
      },
    }),
    prisma.post.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'Getting Started Guide',
        content: 'Check out the README.md file for detailed setup instructions and features overview.',
        published: true,
        authorId: demoUser.id,
      },
    }),
    prisma.post.upsert({
      where: { id: 3 },
      update: {},
      create: {
        title: 'Draft Post Example',
        content: 'This is a draft post that is not published yet.',
        published: false,
        authorId: demoUser.id,
      },
    }),
  ]);

  console.log('📝 Created demo posts:', demoPosts.length);

  console.log('✅ Database seed completed!');
  console.log('🔑 Demo login credentials:');
  console.log('   Email: demo@example.com');
  console.log('   Password: demo123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });