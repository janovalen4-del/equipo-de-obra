import type { ReactNode } from "react";
import Link from "next/link";
import { requireAuth } from "@/lib/session";
import { siteConfig } from "@/lib/site";
import { logout } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-topbar__brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="M5 34V16L20 5l15 11v18H23V23h-6v11H5Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M12 17h4m8 0h4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <strong>{siteConfig.name} — Panel</strong>
        </div>

        <div className="admin-topbar__actions">
          <Link className="admin-link" href="/">
            Ver sitio
          </Link>
          <a className="admin-link" href="/api/admin/export">
            Exportar CSV
          </a>
          <form action={logout}>
            <button className="admin-link admin-link--button" type="submit">
              Salir
            </button>
          </form>
        </div>
      </header>

      <main className="admin-main">{children}</main>
    </div>
  );
}
