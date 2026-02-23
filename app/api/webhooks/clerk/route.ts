import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// TODO: Add Svix signature verification for production security.
// See: https://clerk.com/docs/integrations/webhooks/sync-data#verify-the-webhook-signature

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses?: { email_address: string }[];
    username?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    image_url?: string | null;
  };
}

export async function POST(request: NextRequest) {
  try {
    const event = (await request.json()) as ClerkWebhookEvent;
    const { type, data } = event;

    switch (type) {
      /* ------------------------------------------------------------ */
      /*  user.created – provision a new User row                     */
      /* ------------------------------------------------------------ */
      case "user.created": {
        const email =
          data.email_addresses?.[0]?.email_address ??
          `${data.id}@toolsfinder.io`;
        const username =
          data.username ?? email.split("@")[0] ?? `user_${data.id.slice(-8)}`;
        const name = [data.first_name, data.last_name]
          .filter(Boolean)
          .join(" ") || null;

        await prisma.user.create({
          data: {
            clerkId: data.id,
            email,
            username,
            name,
            avatar: data.image_url ?? null,
          },
        });
        break;
      }

      /* ------------------------------------------------------------ */
      /*  user.updated – sync profile changes                         */
      /* ------------------------------------------------------------ */
      case "user.updated": {
        const email =
          data.email_addresses?.[0]?.email_address ?? undefined;
        const name = [data.first_name, data.last_name]
          .filter(Boolean)
          .join(" ") || null;

        await prisma.user.update({
          where: { clerkId: data.id },
          data: {
            ...(email && { email }),
            ...(data.username && { username: data.username }),
            name,
            avatar: data.image_url ?? null,
          },
        });
        break;
      }

      /* ------------------------------------------------------------ */
      /*  user.deleted – remove the User row (cascades via Prisma)    */
      /* ------------------------------------------------------------ */
      case "user.deleted": {
        // Prisma onDelete: Cascade on related models handles cleanup
        await prisma.user.delete({
          where: { clerkId: data.id },
        });
        break;
      }

      default:
        // Unhandled event type – acknowledge silently
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Webhook /clerk] Error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
