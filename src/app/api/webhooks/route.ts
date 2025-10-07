import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { EventType } from "svix/dist/api/eventType";
import { User } from "@/generated/prisma/client";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  // 1) Read required Svix signature headers (Clerk uses Svix under the hood)

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  //Get the Headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  //If there are no Headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no axis headers", {
      status: 400,
    });
  }

  // Get The Body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    // 3) Verify the webhook request
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // When the user is created or Updated

  if (evt.type === "user.created" || evt.type === "user.updated") {
    const data = JSON.parse(body).data;
    const user: Partial<User> = {
      id: data.id,
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0].email_address,
      picture: data.image_url,
    };
    if (!user) return;

    //PUSH USER TO DATA BASE
    const dbUser = await db.user.upsert({
      where: {
        email: user.email,
      },
      update: user,
      create: {
        id: user.id!,
        name: user.name!,
        email: user.email!,
        picture: user.picture!,
        role: user.role ?? "USER",
      },
    });

    //Edit User Role/ Metadata on clerk
    const clerk = await clerkClient();

    await clerk.users.updateUserMetadata(data.id, {
      privateMetadata: {
        role: dbUser.role || "USER",
      },
    });
  }

  //When a User is Deleted
  if (evt.type === "user.deleted") {
    const userId = JSON.parse(body).data.id;
    await db.user.delete({
      where: {
        id: userId,
      },
    });
  }

  return new Response("", { status: 200 });
}
