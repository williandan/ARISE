import { NextResponse } from "next/server";
import { store } from "@/lib/portal/store";
import { makeSalt, hashPassword, signToken } from "@/lib/portal/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (password.length < 4) {
    return NextResponse.json({ error: "weak_password" }, { status: 400 });
  }
  if (store.users.has(email)) {
    return NextResponse.json({ error: "email_taken" }, { status: 409 });
  }

  const salt = makeSalt();
  const user = {
    id: crypto.randomUUID(),
    email,
    salt,
    passwordHash: hashPassword(password, salt),
  };
  store.users.set(email, user);

  const token = await signToken({ sub: user.id, email });
  return NextResponse.json({ token, email }, { status: 201 });
}
