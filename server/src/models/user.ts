import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '../database/connection';

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

// Validation schemas (matching frontend)
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

// Type inference
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export class UserModel {
  // Find user by email
  static async findByEmail(email: string): Promise<User | undefined> {
    console.log(`[DEBUG] Looking for user with email: ${email}`);
    const user = await db('users').where({ email }).first();
    return user;
  }

  // Create new user
  static async create(userData: RegisterInput): Promise<User> {
    console.log(`[DEBUG] Creating new user with email: ${userData.email}`);
    
    // Check if user already exists
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Create new user
    const [id] = await db('users').insert({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    const newUser = await db('users').where({ id }).first();
    console.log(`[DEBUG] User created successfully: ${newUser.id}`);
    
    return newUser;
  }

  // Verify password
  static async verifyPassword(user: User, password: string): Promise<boolean> {
    console.log(`[DEBUG] Verifying password for user: ${user.email}`);
    return bcrypt.compare(password, user.password);
  }

  // Get user by ID (excluding password)
  static async findById(id: number): Promise<Omit<User, 'password'> | undefined> {
    console.log(`[DEBUG] Looking for user with ID: ${id}`);
    const user = await db('users').where({ id }).first();
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return undefined;
  }
}
