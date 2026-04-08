import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar.jsx";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  return (
    <div className="home">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__text">
            <span className="hero__eyebrow">Banca Digital</span>
            <h1 className="hero__title">
              Tu banco,<br />
              <span>en todos lados.</span>
            </h1>
            <p className="hero__subtitle">
              Operá con total seguridad desde donde estés.
              Itaú Uruguay ahora potenciado por <strong>Auth0</strong>.
            </p>
            <div className="hero__ctas">
              {isAuthenticated ? (
                <button className="btn btn--primary btn--lg" onClick={() => navigate("/perfil")}>
                  Ir a mi cuenta
                </button>
              ) : (
                <>
                  <button className="btn btn--primary btn--lg" onClick={() => navigate("/login")}>
                    Ingresá ahora
                  </button>
                  <button className="btn btn--outline btn--lg" onClick={() => navigate("/login?tipo=empresa")}>
                    Acceso empresas
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Quick-access login card */}
          <div className="hero__card">
            <QuickLoginCard />
          </div>
        </div>
      </section>

      {/* ── Feature strip ─────────────────────────────────── */}
      <section className="features">
        <div className="features__inner">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-item">
              <span className="feature-item__icon" aria-hidden="true">{f.icon}</span>
              <h3 className="feature-item__title">{f.title}</h3>
              <p className="feature-item__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Auth0 banner ──────────────────────────────────── */}
      <section className="auth0-banner">
        <div className="auth0-banner__inner">
          <div className="auth0-banner__badge">
            <Auth0Logo />
            <span>Powered by Auth0</span>
          </div>
          <h2>Seguridad de nivel bancario, sin complicaciones</h2>
          <p>
            Itaú Uruguay integra Auth0 para ofrecerte autenticación multifactor,
            inicio de sesión único y gestión de identidad de clase mundial —
            todo de forma transparente para vos.
          </p>
          <ul className="auth0-banner__list">
            <li>✅ MFA (autenticación multifactor)</li>
            <li>✅ Inicio de sesión social (Google, Apple)</li>
            <li>✅ Detección de anomalías en tiempo real</li>
            <li>✅ Cumplimiento SOC2 &amp; ISO 27001</li>
            <li>✅ Acceso unificado: Personal y Empresas</li>
          </ul>
          <button className="btn btn--primary btn--md" onClick={() => navigate("/login")}>
            Probá la demo →
          </button>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer__inner">
          <p>© 2024 Itaú Uruguay. Demo de integración Auth0 — solo con fines ilustrativos.</p>
          <p className="footer__links">
            <a href="https://auth0.com" target="_blank" rel="noreferrer">Auth0</a>
            {" · "}
            <a href="https://www.itau.com.uy" target="_blank" rel="noreferrer">Itaú Uruguay</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Quick-login card ───────────────────────────────────────── */
function QuickLoginCard() {
  const navigate = useNavigate();
  return (
    <div className="quick-card">
      <h2 className="quick-card__title">Ingresá a tu cuenta</h2>

      <button
        className="quick-card__option"
        onClick={() => navigate("/login?tipo=personal")}
      >
        <span className="quick-card__option-icon">👤</span>
        <div>
          <strong>Persona física</strong>
          <small>Accedé con tu Cédula de Identidad</small>
        </div>
        <span className="quick-card__arrow">›</span>
      </button>

      <button
        className="quick-card__option"
        onClick={() => navigate("/login?tipo=empresa")}
      >
        <span className="quick-card__option-icon">🏢</span>
        <div>
          <strong>Empresa</strong>
          <small>Accedé con tu RUT</small>
        </div>
        <span className="quick-card__arrow">›</span>
      </button>

      <div className="quick-card__powered">
        <Auth0Logo small />
        <span>Autenticación segura por Auth0</span>
      </div>
    </div>
  );
}

/* ── Auth0 logo SVG ──────────────────────────────────────────── */
function Auth0Logo({ small = false }) {
  const size = small ? 20 : 32;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Auth0">
      <circle cx="24" cy="24" r="24" fill="#EB5424"/>
      <path d="M24 10L30.5 29H17.5L24 10Z" fill="white"/>
      <path d="M17.5 29L10 18H24L17.5 29Z" fill="white" opacity="0.7"/>
      <path d="M30.5 29L38 18H24L30.5 29Z" fill="white" opacity="0.5"/>
    </svg>
  );
}

/* ── Static data ─────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: "🔒",
    title: "Seguridad máxima",
    desc: "Autenticación multifactor y detección de anomalías en tiempo real.",
  },
  {
    icon: "📱",
    title: "100% digital",
    desc: "Operá desde tu celular, tablet o computadora las 24 horas.",
  },
  {
    icon: "⚡",
    title: "Acceso instantáneo",
    desc: "Inicio de sesión en segundos con tu cédula o RUT.",
  },
  {
    icon: "🌐",
    title: "Experiencia unificada",
    desc: "Un solo acceso para cuentas personales y empresariales.",
  },
];
