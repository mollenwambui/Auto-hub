 // Import PrismaClient - this lets us talk to the database
import { PrismaClient } from "@prisma/client";

// Create a single Prisma instance to reuse across requests
const prisma = new PrismaClient();

export async function POST(req) {

  // Get email from frontend
  const body = await req.json();

  // Check if email exists in the database
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  // If user does not exist
  if (!user) {
    return Response.json({
      success: false,
      message: "Email does not exist",
    });
  }

  // If email exists
  return Response.json({
    success: true,
    message: "Email found",
  });
}