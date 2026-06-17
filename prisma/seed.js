// Import PrismaClient
const { PrismaClient } = require("@prisma/client")

// Create a Prisma instance
const prisma = new PrismaClient()

async function main() {

  // Insert multiple cars into the database at once
  await prisma.car.createMany({
    data: [
      { name: "Toyota Land Cruiser", price: 8500000, year: 2022, mileage: "12,000 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600" },
      { name: "Mercedes Benz C200", price: 5200000, year: 2021, mileage: "18,000 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600" },
      { name: "Toyota Fielder", price: 1800000, year: 2019, mileage: "45,000 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600" },
      { name: "Subaru Forester", price: 2400000, year: 2020, mileage: "32,000 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600" },
      { name: "BMW X5", price: 7800000, year: 2022, mileage: "8,000 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
      { name: "Mazda Demio", price: 950000, year: 2018, mileage: "61,000 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600" },
    ]
  })

  console.log("Cars seeded successfully!")
}

// Run the main function
main()
  .catch(console.error)               // If anything fails — log the error
  .finally(() => prisma.$disconnect()) // Always disconnect from the database when done