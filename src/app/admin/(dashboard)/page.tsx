import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { updateLeadStatus } from "./actions";
import { DeleteLeadForm } from "./delete-lead-form";
import { LEAD_STATUSES, LEAD_STATUS_LABELS } from "@/lib/lead";

export default async function AdminDashboard() {
  await requireAuth();

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="admin-section">
      <div className="admin-section__head">
        <div>
          <h1>Consultas</h1>
          <p>
            {leads.length}{" "}
            {leads.length === 1 ? "consulta recibida" : "consultas recibidas"}
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <p className="admin-empty">
          Todavía no hay consultas. Cuando alguien complete el formulario del
          sitio, van a aparecer acá.
        </p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Zona</th>
                <th>Servicio</th>
                <th>Detalle</th>
                <th>Estado</th>
                <th aria-label="Acciones"></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    {lead.createdAt.toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="admin-strong">{lead.name}</td>
                  <td>
                    <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                  </td>
                  <td>{lead.zone}</td>
                  <td>{lead.service}</td>
                  <td className="admin-message">{lead.message ?? "—"}</td>
                  <td>
                    <form action={updateLeadStatus} className="admin-status">
                      <input type="hidden" name="id" value={lead.id} />
                      <select name="status" defaultValue={lead.status}>
                        {LEAD_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {LEAD_STATUS_LABELS[status]}
                          </option>
                        ))}
                      </select>
                      <button type="submit">Guardar</button>
                    </form>
                  </td>
                  <td>
                    <DeleteLeadForm id={lead.id} name={lead.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
