/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable prettier/prettier */
 
 
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

import * as bcrypt from 'bcrypt';

const prisma:PrismaClient = new PrismaClient();

async function seed() {
  // Seed roles
  const roles = await prisma.role.createMany({
    data: [
      {
        name: 'admin',
      },
      {
        name: 'user',
      },
      {
        name: 'superuser',
      },
      {
        name: 'seller',
      },
    ],
    skipDuplicates: true,
  });

  // Seed users
  const salt=await bcrypt.genSalt(10);
  const users = await Promise.all(
    Array.from({ length: 20 }).map(async() =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          firstname: faker.person.firstName(),
          lastname: faker.person.lastName(),
          password: await bcrypt.hash("admin1234",salt),
          phone: faker.phone.number({style:'national'}),
          profile: faker.image.avatar(),
          emailConfirm:true
        },
      }),
    ),
  );

//   Seed user roles
  await Promise.all(
        users.map((user) =>
          prisma.userRole.create({
            data: {
              userId: user.id,
              roleId: 1,
            },
          }),
        ),
      );

  // Seed shops
  const shops = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.shops.create({
        data: {
          name: faker.company.name(),
          address: '1020 rue des fontaines, 77100',
          phone: faker.phone.number({style:'national'}),
          userId:
            users[faker.helpers.rangeToNumber({ min: 0, max: users.length - 1 })].id,
        },
      }),
    ),
  );

  // Seed products
  const products = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price()),
          quantity: faker.helpers.rangeToNumber({ min: 1, max: 100 }),
          isAvailable: faker.datatype.boolean(),
          shopId:
            shops[faker.helpers.rangeToNumber({ min: 0, max: shops.length - 1 })].id,
          image: faker.image.avatar(),
          description: faker.lorem.sentence(),
        },
      }),
    ),
  );

  // Seed categories
  const categories = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.category.create({
        data: {
          name: faker.commerce.productName(),
        },
      }),
    ),
  );

  // Seed product categories
  await Promise.all(
    products.map((product) =>
      Promise.all(
        categories.map((category) =>
          prisma.productCategory.create({
            data: {
              productId: product.id,
              categoryId: category.id,
            },
          }),
        ),
      ),
    ),
  );

  // Seed orders
  const orders = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.order.create({
        data: {
          userId:
            users[faker.helpers.rangeToNumber({ min: 0, max: users.length - 1 })].id,
          totalAmount: parseFloat(faker.commerce.price()),
          status: faker.helpers.shuffle([
            'PENDING',
            'PROCESSING',
            'COMPLETED',
            'CANCELLED',
          ])[0],
        },
      }),
    ),
  );

  // Seed order items
  await Promise.all(
    orders.map((order) =>
      Promise.all(
        products.map((product) =>
          prisma.orderItem.create({
            data: {
              orderId: order.id,
              productId: product.id,
              quantity: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
              price: parseFloat(faker.commerce.price()),
            },
          }),
        ),
      ),
    ),
  );

  // Seed payments
  const payments = await Promise.all(
    orders.map((order) =>
      prisma.payment.create({
        data: {
          orderId: order.id,
          amount: parseFloat(faker.commerce.price()),
          status: faker.helpers.shuffle(['PENDING', 'SUCCESS', 'FAILED'])[0],
          method: faker.helpers.shuffle(['CASH', 'CARD', 'MOBILE'])[0],
        },
      }),
    ),
  );

  // Seed deliveries
  const deliveries = await Promise.all(
    orders.map((order) =>
      prisma.delivery.create({
        data: {
          orderId: order.id,
          status: faker.helpers.shuffle([
            'PENDING',
            'INTRANSIT',
            'DELIVERED',
            'CANCELLED',
          ])[0],
          deliveryAddress: faker.location.streetAddress(),
          deliveryDate: faker.date.future(),
        },
      }),
    ),
  );

  // Seed groups
  const groups = await prisma.group.createMany({
        data:[ 
            {
                name: 'admin',
            },
            {
                name: 'seller',
            },
            {
                name: 'user',
            },
        ],
        skipDuplicates: true,
    });

  // Seed group roles
//   await Promise.all(
//     groups.map((group) =>
//       Promise.all(
//         roles.map((role) =>
//           prisma.groupRole.create({
//             data: {
//               groupId: group.id,
//               roleId: role.id,
//             },
//           }),
//         ),
//       ),
//     ),
//   );

  // Seed user groups
//   await Promise.all(
//     users.map((user) =>
//       Promise.all(
//         groups.map((group) =>
//           prisma.userGroup.create({
//             data: {
//               userId: user.id,
//               groupId: group.id,
//             },
//           }),
//         ),
//       ),
//     ),
//   );

  console.log('Seeding completed!');
}

seed()
  .catch((e) => {
    console.error(e);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () =>await prisma.$disconnect());
