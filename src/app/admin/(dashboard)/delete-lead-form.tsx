"use client";

import { deleteLead } from "./actions";

export function DeleteLeadForm({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteLead}
      onSubmit={(event) => {
        if (!window.confirm(`¿Eliminar la consulta de ${name}?`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        className="admin-delete"
        type="submit"
        aria-label={`Eliminar consulta de ${name}`}
      >
        Eliminar
      </button>
    </form>
  );
}
