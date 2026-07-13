import { SignJWT, jwtVerify } from "jose";
import { createHash, randomBytes } from "node:crypto";

/**
 * Auth do Portal (DEMO). JWT HS256 via `jose`.
 * O hash de senha aqui é SHA-256 + salt (simples, didático) — em produção
 * usaríamos bcrypt/argon2. Não use senhas reais nesta demo.
 */

const secret = new TextEncoder().encode(
  process.env.PORTAL_JWT_SECRET ?? "arise-portal-demo-secret-dev-only",
);

export interface TokenPayload {
  sub: string; // id do usuário
  email: string;
}

export function makeSalt(): string {
  return randomBytes(16).toString("hex");
}

export function hashPassword(password: string, salt: string): string {
  return createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  return hashPassword(password, salt) === hash;
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload.sub !== "string") return null;
    return { sub: payload.sub, email: String(payload.email ?? "") };
  } catch {
    return null;
  }
}

/** Extrai o id do usuário do header Authorization: Bearer <token>. */
export async function getUserIdFromRequest(req: Request): Promise<string | null> {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const payload = await verifyToken(auth.slice(7));
  return payload?.sub ?? null;
}
