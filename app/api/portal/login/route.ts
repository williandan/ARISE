import { NextResponse } from "next/server";
import { store } from "@/lib/portal/store";
import { verifyPassword, signToken } from "@/lib/portal/auth";

export async function POST(req: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = String(body.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(body.password ?? "");

  const user = store.users.get(email);
  if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const token = await signToken({ sub: user.id, email });
  return NextResponse.json({ token, email }, { status: 200 });
}
