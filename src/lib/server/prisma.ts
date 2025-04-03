// import { PrismaClient } from '@prisma/client';

// export const prisma = new PrismaClient();

import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

export const prisma = new PrismaClient().$extends(withAccelerate());