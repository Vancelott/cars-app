import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

const prisma = new PrismaClient()

export async function POST( 
    request: Request
    ) {
  try {
    const body = await request.json()

    const { email, username, password, confirmPassword } = body;

    const schema = z.object({
        email: z.string().email({ message: "Invalid email address" })
      });
    
    let errorMessage = '';
    let errorPassword = '';
    let errorEmail = '';
    let errorUsername = '';
      
    const isValid = schema.safeParse({email})
    if(isValid.success == false) {
      errorEmail = 'Invalid email address.'
    }

    if (!email || !username || !password || !confirmPassword) {
        errorMessage += 'Missing required credentials.'
        // return new NextResponse('Missing credentials', { status: 400})
    }

    // if (!email) {
    //   errorEmail += 'Invalid/missing email address.'
    // }

    if (!username) {
      errorUsername += 'Please enter a username.'
    }

    if (password !== confirmPassword) {
      errorPassword += 'The password confirmation does not match.';
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      errorPassword += 'The password has to be at least 8 characters.';
    }

    if (
      errorPassword ===
      "The password confirmation does not match.The password has to be at least 8 characters." ||
      errorPassword ===
      "The password has to be at least 8 characters.The password confirmation does not match. "
    ) {
      errorPassword = "";
      errorPassword = "The password has to be at least 8 characters and match the password confirmation.";
    }

    if (errorPassword.length > 0 || errorMessage.length > 0 || 
        errorEmail.length > 0 || errorUsername.length > 0) {
      return await NextResponse.json(
        { error: errorMessage, data: { password: errorPassword, email: errorEmail, name: errorUsername } },
        { status: 400 }
      );
    }

    if (body.password === body.confirmPassword) {
        const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma?.user.create({
      data: {
        email,
        username,
        hashedPassword
      }
    });

    return NextResponse.json(user);
    }} catch (error) {
    console.log(error);
    return NextResponse.error;
  }
}
