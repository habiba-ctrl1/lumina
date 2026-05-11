import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/logger';

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
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
    const body = await request.json();
    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        readTime: body.readTime || "5 min read",
        published: body.published ?? false,
        authorId: body.authorId, // Should come from session in real app
      },
    });

    await logActivity('Created Blog Post', `Published article: ${post.title}`, 'admin@saudievent.com');

    return NextResponse.json(post);
  } catch (error) {
    console.error('Blog Create Error:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
