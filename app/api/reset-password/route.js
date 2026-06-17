import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(req) {

  const body = await req.json()

  // Hash the new password before saving
  const hashedPassword = await bcrypt.hash(body.password, 10)

  // Update user with hashed password
  const updatedUser = await prisma.user.update({
    where: {
      email: body.email,
    },
    data: {
      password: hashedPassword,
    },
  })

  // Return the user object so frontend can save to localStorage
  return Response.json({
    success: true,
    message: "Password updated successfully",
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    }
  })
}