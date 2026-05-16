// Import PrismaClient - this lets us talk to the database
import { PrismaClient } from "@prisma/client";

// Create a single Prisma instance to reuse across requests
const prisma = new PrismaClient();

// Import bcrypt - used to hash passwords so we never store them as plain text
import bcrypt from "bcrypt";

// This function runs when a POST request is sent to /api/signup
export async function POST(req) {
  try {

    // 1. Extract the JSON body from the incoming request
    const body = await req.json();

    // Pull out the three fields we expect from the signup form
    const { name, email, password } = body;

    // 2. Check if a user with this email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email }, // Search by email (it's unique in our schema)
    });

    // If a user was found, stop here and return an error
    if (existingUser) {
      return Response.json(
        { message: "User already exists" },
        { status: 400 } // 400 = Bad Request
      );
    }

    // 3. Hash the password before saving
    // The "10" is the salt rounds - higher = more secure but slower
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save the new user to the database
    // We store the hashed password, never the plain text one
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 5. Return a success response with the new user's data
    // status 201 = "Created" (something new was successfully created)
    return Response.json(
      {
        message: "User created successfully",
        user: newUser,
      },
      { status: 201 }
    );

  } catch (error) {
    // If anything goes wrong (DB down, unexpected error), log it and return 500
    // 500 = Internal Server Error
    console.log("Signup error:", error);

    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}