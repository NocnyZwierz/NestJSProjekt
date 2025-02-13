/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: '5a429f93-939d-4500-9bfe-dfa3324e7885',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: 'c4d8f1f1-4f72-47a7-8db7-c5ed0b1f72b7',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'a392d9e3-cb7a-4ec3-973e-ef33f70a72db',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
  ];
}

function getClients() {
  return [
    {
      id: 'c4d8f1f1-4f72-47a7-8db7-c5ed0b1f72b7',
      name: 'John Doe',
      address: 'Poland, Warsaw, 123',
    },
    {
      id: 'a392d9e3-cb7a-4ec3-973e-ef33f70a72db',
      name: 'Amanda Cerny',
      address: 'Poland, Cracow, 456',
    },
    {
      id: '5a429f93-939d-4500-9bfe-dfa3324e7885',
      name: 'Christian Bale',
      address: 'England, London, 78',
    },
  ];
}

async function seed() {
  await Promise.all(
    getClients().map(async (client) => {
      const existingClient = await db.client.findUnique({
        where: { id: client.id },
      });
      if (!existingClient) {
        await db.client.create({ data: client });
      }
    })
  );

  await Promise.all(
    getProducts().map(async (product) => {
      const existingProduct = await db.product.findUnique({
        where: { id: product.id },
      });
      if (!existingProduct) {
        await db.product.create({ data: product });
      }
    })
  );

  await Promise.all(
    getOrders().map(async ({ clientId, productId, ...orderData }) => {
      const existingOrder = await db.order.findUnique({
        where: { id: orderData.id },
      });
      if (!existingOrder) {
        await db.order.create({
          data: {
            ...orderData,
            product: { connect: { id: productId } },
            client: { connect: { id: clientId } },
          },
        });
      }
    })
  );
}

seed();