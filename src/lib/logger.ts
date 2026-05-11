import prisma from './prisma';

export async function logActivity(action: string, details?: string, userEmail?: string) {
  try {
    await prisma.activityLog.create({
      data: {
        action,
        details,
        userEmail,
      },
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}
