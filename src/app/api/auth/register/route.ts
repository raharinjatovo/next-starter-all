import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 }); // 409 Conflict
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt round

    // Create the new user
    const user = await prisma.user.create({
      data: {
        email,
        name, // Name can be optional, so it might be undefined
        password: hashedPassword,
      },
    });

    // Return the created user (excluding password)
    return NextResponse.json({ id: user.id, email: user.email, name: user.name }, { status: 201 }); // 201 Created

  } catch (error) {
    console.error('Registration error:', error);
    // It's good practice to avoid sending detailed error messages to the client in production
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 });
  }
}
