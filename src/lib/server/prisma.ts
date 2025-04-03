// import { PrismaClient } from '@prisma/client';

// import { PrismaClient } from "@prisma/client/edge";

// console.log("DATABASE_URL:", process.env.DATABASE_URL);
// export const prisma = new PrismaClient();

import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from '@prisma/client/edge'; //
import { withAccelerate } from '@prisma/extension-accelerate';

export const prisma = new PrismaClient().$extends(withAccelerate());

// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

// export interface Env {
//     DATABASE_URL: string;
// }

// export default {
//     async fetch(request, env, ctx) {
//         const prisma = new PrismaClient({
//             datasourceUrl: env.DATABASE_URL,
//         }).$extends(withAccelerate());

//         const users = await prisma.user.findMany();
//         const result = JSON.stringify(users);
//         return new Response(result);
//     },
// } satisfies ExportedHandler<Env>;