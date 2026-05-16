// Import PrismaClient - this lets us talk to the database
import { PrismaClient } from "@prisma/client";

// Create a single Prisma instance to reuse across requests
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export async function POST(req) {

  try {

    // Get data sent from frontend
    const body = await req.json();

    // Extract email and password
    const { email, password } = body;

    // Check if user exists in database
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // If user does not exist
    if (!existingUser) {
      return Response.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // Compare entered password with hashed password in DB
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If password is wrong
    if (!isPasswordCorrect) {
      return Response.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    // Login successful
    return Response.json(
      {
        message: "Login successful",
        user: existingUser,
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.log(error);

    // Handle unexpected errors
    return Response.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}