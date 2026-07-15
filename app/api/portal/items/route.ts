import { NextResponse } from "next/server";
import { store, type PortalItem } from "@/lib/portal/store";
import { getUserIdFromRequest } from "@/lib/portal/auth";

const MAX_TITLE = 80;
const MAX_NOTE = 500;

/** GET /api/portal/items — lista os registros do usuário autenticado. */
export async function GET(req: Request) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const items = store.items
    .filter((i) => i.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);

  return NextResponse.json({ items });
}

/** POST /api/portal/items — cria um registro. */
export async function POST(req: Request) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { title?: unknown; note?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const title = String(body.title ?? "")
    .trim()
    .slice(0, MAX_TITLE);
  const note = String(body.note ?? "")
    .trim()
    .slice(0, MAX_NOTE);

  if (!title) return NextResponse.json({ error: "title_required" }, { status: 400 });

  const item: PortalItem = {
    id: crypto.randomUUID(),
    userId,
    title,
    note,
    createdAt: Date.now(),
  };
  store.items.push(item);

  return NextResponse.json({ item }, { status: 201 });
}
