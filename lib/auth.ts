import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getDbUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  return user;
}

export async function getOrCreateDbUser() {
  const { userId } = await auth();
  if (!userId) return null;

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    const email =
      clerkUser.emailAddresses[0]?.emailAddress ?? `${userId}@toolsfinder.io`;
    const username =
      clerkUser.username ??
      email.split("@")[0] ??
      `user_${userId.slice(-8)}`;

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        username,
        name:
          [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
          null,
        avatar: clerkUser.imageUrl,
      },
    });
  }

  return user;
}

export async function requireDbUser() {
  const user = await getOrCreateDbUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function requireAdmin() {
  const user = await requireDbUser();
  if (user.role !== "ADMIN") throw new Error("Forbidden");
  return user;
}
