import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  // Create a rider
  await prisma.user.create({
    data: {
      email: 'rider@example.com',
      role: 'RIDER',
    },
  });

  // Create a driver
  await prisma.user.create({
    data: {
      email: 'driver@example.com',
      role: 'DRIVER',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
