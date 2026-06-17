// Import PrismaClient - this lets us talk to the database
import { PrismaClient } from "@prisma/client";

// Create a single Prisma instance to reuse across requests
const prisma = new PrismaClient();
export async function GET() {
    const cars = await prisma.car.findMany()
    return Response.json(cars)
}