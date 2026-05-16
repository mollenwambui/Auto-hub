// Import PrismaClient - this lets us talk to the database
import { PrismaClient } from "@prisma/client";

// Create Prisma instance
const prisma = new PrismaClient();

export async function POST(req) {

  // Get data from frontend
  const body = await req.json();

  // Update user password
  const updatedUser = await prisma.user.update({
    where: {
      email: body.email,
    },

    data: {
      password: body.password,
    },
  });

  console.log(updatedUser);

  // Send response back
  return Response.json({
    success: true,
    message: "Password updated successfully",
  });
}