import { PrismaClient, User, Contact } from '@prisma/client';

const prismaClient = new PrismaClient();

export { prismaClient, User, Contact };