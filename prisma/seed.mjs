import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  // Create 2 rider
  await prisma.user.create({
    data: {
      email: 'rider@example.com',
      role: 'RIDER',
    },
  });

  // Create 2 rider
  await prisma.user.create({
    data: {
      email: 'rider1@example.com',
      role: 'RIDER',
    },
  });

  // Create 2 drivers
  await prisma.user.create({
    data: {
      email: 'driver@example.com',
      role: 'DRIVER',
    },
  });

  await prisma.user.create({
    data: {
      email: 'driver1@example.com',
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
