"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Panel } from "@/components/ui/Panel";

/**
 * Gate D — "O Portal Menor": front React que consome a API REST + JWT + CRUD
 * (Route Handlers em app/api/portal/*). Guarda o token em localStorage.
 */

const SESSION_KEY = "arise-portal-session";
const KNOWN_ERRORS = [
  "invalid_email",
  "weak_password",
  "email_taken",
  "invalid_credentials",
  "title_required",
];

interface Item {
  id: string;
  title: string;
  note: string;
  createdAt: number;
}

export function PortalMenor() {
  const t = useTranslations("portal");

  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editNote, setEditNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const errMsg = (code?: string) =>
    t(`errors.${code && KNOWN_ERRORS.includes(code) ? code : "generic"}`);

  function endSession() {
    setToken(null);
    setEmail(null);
    setItems([]);
    localStorage.removeItem(SESSION_KEY);
  }

  // Restaura a sessão do localStorage.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const s = JSON.parse(raw) as { token?: unknown; email?: unknown };
        if (typeof s.token === "string" && typeof s.email === "string") {
          setToken(s.token);
          setEmail(s.email);
        }
      }
    } catch {
      /* ignora */
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Carrega registros quando há token.
  useEffect(() => {
    if (!token) return;
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/portal/items", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!alive) return;
        if (res.status === 401) {
          endSession();
          return;
        }
        const data = await res.json().catch(() => null);
        if (alive) setItems(data?.items ?? []);
      } catch {
        if (alive) setError("generic");
      }
    })();
    return () => {
      alive = false;
    };
  }, [token]);

  async function submitAuth(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/portal/${mode === "login" ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "generic");
        return;
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify({ token: data.token, email: data.email }));
      setToken(data.token);
      setEmail(data.email);
      setAuthPassword("");
    } catch {
      setError("generic");
    } finally {
      setBusy(false);
    }
  }

  async function addItem(e: FormEvent) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title || !token) return;
    setError(null);
    try {
      const res = await fetch("/api/portal/items", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, note: newNote.trim() }),
      });
      if (res.status === 401) return endSession();
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "generic");
        return;
      }
      setItems((prev) => [data.item, ...prev]);
      setNewTitle("");
      setNewNote("");
    } catch {
      setError("generic");
    }
  }

  function startEdit(item: Item) {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditNote(item.note);
  }

  async function saveEdit(id: string) {
    const title = editTitle.trim();
    if (!title || !token) return;
    try {
      const res = await fetch(`/api/portal/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, note: editNote.trim() }),
      });
      if (res.status === 401) return endSession();
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "generic");
        return;
      }
      setItems((prev) => prev.map((i) => (i.id === id ? data.item : i)));
      setEditingId(null);
    } catch {
      setError("generic");
    }
  }

  async function deleteItem(id: string) {
    if (!token) return;
    try {
      const res = await fetch(`/api/portal/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) return endSession();
      if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      setError("generic");
    }
  }

  const inputClass =
    "bg-bg-base/70 text-ink placeholder:text-muted-2 focus:border-cyan/60 w-full min-w-0 rounded-sm border border-white/10 px-3 py-2 text-sm outline-none";
  const primaryBtn =
    "bg-cyan/15 text-cyan hover:bg-cyan/25 font-display rounded-sm px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors disabled:opacity-50";

  return (
    <Panel tone="cyan" cut={20}>
      <div className="flex flex-col gap-5 p-6 sm:p-7">
        {!token ? (
          /* ---- Autenticação ---- */
          <form onSubmit={submitAuth} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {(["login", "register"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMode(m);
                    setError(null);
                  }}
                  className={`font-display rounded-sm px-3 py-1.5 text-[11px] font-semibold tracking-widest uppercase transition-colors ${
                    mode === m ? "bg-cyan/15 text-cyan" : "text-muted hover:text-ink"
                  }`}
                >
                  {t(m)}
                </button>
              ))}
            </div>

            <label className="flex flex-col gap-1">
              <span className="text-muted-2 text-[11px] tracking-widest uppercase">
                {t("email")}
              </span>
              <input
                type="email"
                autoComplete="off"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-muted-2 text-[11px] tracking-widest uppercase">
                {t("password")}
              </span>
              <input
                type="password"
                autoComplete="new-password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className={inputClass}
              />
            </label>

            {error && (
              <p role="alert" className="text-alert text-xs">
                {errMsg(error)}
              </p>
            )}

            <button type="submit" disabled={busy} className={`${primaryBtn} mt-1`}>
              {busy ? t("loading") : t(mode)}
            </button>

            <p className="text-muted-2 text-[11px]">{t("demoNote")}</p>
          </form>
        ) : (
          /* ---- Sessão autenticada (CRUD) ---- */
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted text-xs">{t("loggedInAs", { email: email ?? "" })}</span>
              <button
                type="button"
                onClick={endSession}
                className="font-display text-muted-2 hover:text-alert text-[11px] font-semibold tracking-widest uppercase transition-colors"
              >
                {t("logout")}
              </button>
            </div>

            <form onSubmit={addItem} className="flex flex-col gap-2">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={t("recordTitlePlaceholder")}
                aria-label={t("recordTitlePlaceholder")}
                className={inputClass}
              />
              <div className="flex gap-2">
                <input
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder={t("recordNotePlaceholder")}
                  aria-label={t("recordNotePlaceholder")}
                  className={inputClass}
                />
                <button type="submit" className={primaryBtn}>
                  {t("add")}
                </button>
              </div>
              {error && (
                <p role="alert" className="text-alert text-xs">
                  {errMsg(error)}
                </p>
              )}
            </form>

            {items.length === 0 ? (
              <p className="text-muted-2 py-4 text-center text-sm">{t("empty")}</p>
            ) : (
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-sm border border-white/8 bg-white/[0.02] px-3 py-2"
                  >
                    {editingId === item.id ? (
                      <div className="flex flex-col gap-2">
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className={inputClass}
                          aria-label={t("recordTitlePlaceholder")}
                        />
                        <input
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          className={inputClass}
                          aria-label={t("recordNotePlaceholder")}
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => saveEdit(item.id)}
                            className={primaryBtn}
                          >
                            {t("save")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="font-display text-muted-2 hover:text-ink px-3 py-2 text-[11px] font-semibold tracking-widest uppercase transition-colors"
                          >
                            {t("cancel")}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-ink text-sm font-semibold">{item.title}</p>
                          {item.note && <p className="text-muted-2 mt-0.5 text-xs">{item.note}</p>}
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            className="text-muted-2 hover:text-cyan text-xs"
                          >
                            {t("edit")}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteItem(item.id)}
                            className="text-muted-2 hover:text-alert text-xs"
                          >
                            {t("delete")}
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </Panel>
  );
}
