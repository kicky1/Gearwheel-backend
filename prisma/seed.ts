import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;
async function main() {

  const password1 = await bcrypt.hash('password-sabin', roundsOfHashing);
  const password2 = await bcrypt.hash('password-alex', roundsOfHashing);


  const userData1 = {
    email: 'krzysiekwicki1@gmail.com',
    name: 'Krzysiek',
    password: password1,
  };

  const userData2 = {
    email: 'krzysiekwicki2@gmail.com',
    name: 'Krzysiek2',
    password: password2,
 };

  const user1 = await prisma.user.create({
    data: userData1,
  });

  const user2 = await prisma.user.create({
    data: userData2,
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
