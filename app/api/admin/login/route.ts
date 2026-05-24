import { NextResponse } from "next/server";
import { z } from "zod";

import {
  adminSessionCookie,
  createSessionToken,
  getAdminPassword,
  isAdminConfigured,
} from "@/lib/admin/auth";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Admin login is not configured. Set ADMIN_PASSWORD (min 8 characters) in Vercel env vars.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message ?? "Invalid data" },
      { status: 400 }
    );
  }

  const expected = getAdminPassword();
  if (parsed.data.password !== expected) {
    return NextResponse.json(
      { success: false, message: "Incorrect password." },
      { status: 401 }
    );
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ success: true });
  response.cookies.set(adminSessionCookie(token));
  return response;
}
