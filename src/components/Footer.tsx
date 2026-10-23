import { Brand } from "./Brand";
import { Year } from "./Year";

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
        </span>
        <span>Diseño web responsive</span>
      </div>
    </footer>
  );
}
