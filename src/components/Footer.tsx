import { Brand } from "./Brand";
import { Year } from "./Year";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <Brand footer />
        <p>Planificación, coordinación y atención al detalle.</p>
        <a className="footer-top" href="#inicio">
          Volver arriba ↑
        </a>
      </div>
      <div className="container footer-bottom">
        <span>
          © <Year /> Equipo de Obra
          {siteConfig.isDemo ? " · Sitio de demostración" : ""}
        </span>
        <span>Diseño web responsive</span>
      </div>
    </footer>
  );
}
