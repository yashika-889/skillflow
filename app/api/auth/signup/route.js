import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '../../../../lib/db.js';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password, name } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      name,
      email,
      password, // Will be hashed by the mongoose pre-save hook
    });

    await user.save();

    // Create JWT token with explicit onboarding status for new users
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        onboardingComplete: false // Always false for new users
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return NextResponse.json({ 
      success: true,
      onboardingComplete: false,
      userId: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('Signup error details:', error);
    console.error('Signup error message:', error.message);
    console.error('Signup error stack:', error.stack);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}