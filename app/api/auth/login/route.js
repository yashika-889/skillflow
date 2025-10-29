import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '../../../../lib/db.js';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(request) {
  try {
    console.log('Attempting to connect to database...');
    await connectDB();
    console.log('Database connected successfully');

    const { email, password } = await request.json();
    console.log('Login attempt for email:', email);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    console.log('User found:', user.email);

    // Verify password
    try {
      console.log('Attempting password verification...');
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        console.log('Password verification failed');
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }
      console.log('Password verified successfully');
    } catch (error) {
      console.error('Error verifying password:', error);
      return NextResponse.json(
        { message: 'Error verifying credentials' },
        { status: 500 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        onboardingComplete: user.onboardingComplete || false
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    const cookieStore = cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return NextResponse.json({ 
      success: true,
      onboardingComplete: user.onboardingComplete || false,
      userId: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}