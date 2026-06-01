const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const blogs = await prisma.blogPost.findMany({
    select: { id: true, title: true, slug: true }
  });
  console.log(JSON.stringify(blogs, null, 2));
}

main().finally(() => prisma.$disconnect());
