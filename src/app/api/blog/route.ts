import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/logger';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        media: true,
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Blog Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        category: body.category,
        readTime: body.readTime || "5 min read",
        author: body.author || "Admin",
      },
    });

    await logActivity('Created Blog Post', `Published article: ${post.title}`, 'admin@saudievent.com');

    return NextResponse.json(post);
  } catch (error) {
    console.error('Blog Create Error:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
