import { NextResponse } from "next/server";
import { store } from "@/lib/portal/store";
import { getUserIdFromRequest } from "@/lib/portal/auth";

const MAX_TITLE = 80;
const MAX_NOTE = 500;

type Ctx = { params: Promise<{ id: string }> };

/** PATCH /api/portal/items/[id] — atualiza título/nota (só do dono). */
export async function PATCH(req: Request, { params }: Ctx) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const item = store.items.find((i) => i.id === id && i.userId === userId);
  if (!item) return NextResponse.json({ error: "not_found" }, { status: 404 });

  let body: { title?: unknown; note?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (body.title !== undefined) {
    const title = String(body.title).trim().slice(0, MAX_TITLE);
    if (!title) return NextResponse.json({ error: "title_required" }, { status: 400 });
    item.title = title;
  }
  if (body.note !== undefined) {
    item.note = String(body.note).trim().slice(0, MAX_NOTE);
  }

  return NextResponse.json({ item });
}

/** DELETE /api/portal/items/[id] — remove um registro (só do dono). */
export async function DELETE(req: Request, { params }: Ctx) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const index = store.items.findIndex((i) => i.id === id && i.userId === userId);
  if (index === -1) return NextResponse.json({ error: "not_found" }, { status: 404 });

  store.items.splice(index, 1);
  return NextResponse.json({ ok: true });
}
