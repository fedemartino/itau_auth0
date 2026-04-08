import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginPage.css";

/**
 * LoginPage
 *
 * Demonstrates how Itaú Uruguay's two-track login flow
 * (Personal / Empresa) would look when powered by Auth0.
 *
 * In a real integration:
 *  - The "Ingresar" button calls loginWithRedirect() which sends
 *    the user to Auth0's Universal Login page.
 *  - Auth0 handles credential validation, MFA, anomaly detection, etc.
 *  - After successful login Auth0 redirects to /callback with a code
 *    that the React SDK exchanges for tokens automatically.
 *
 * For this demo the form submits locally and shows an informational
 * modal explaining that it would redirect to Auth0.
 */
export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  // Determine active tab from URL query param
  const initialTab = searchParams.get("tipo") === "empresa" ? "empresa" : "personal";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Personal form state
  const [docType, setDocType] = useState("CI");
  const [docNumber, setDocNumber] = useState("");
  const [personalPassword, setPersonalPassword] = useState("");

  // Enterprise form state
  const [rut, setRut] = useState("");
  const [username, setUsername] = useState("");
  const [empresaPassword, setEmpresaPassword] = useState("");

  // If already authenticated redirect to profile
  useEffect(() => {
    if (isAuthenticated) navigate("/perfil");
  }, [isAuthenticated, navigate]);

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ tipo: "personal", docType, docNumber });
    setShowModal(true);
  };

  const handleEmpresaSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ tipo: "empresa", rut, username });
    setShowModal(true);
  };

  const handleAuth0Login = () => {
    // In a real integration this is the only line needed.
    // We pass connection & login_hint so Auth0 pre-populates the form.
    const params =
      activeTab === "personal"
        ? {
            connection: "personal-cedula",
            login_hint: docNumber,
            screen_hint: "login",
          }
        : {
            connection: "empresa-rut",
            login_hint: rut,
            screen_hint: "login",
          };
    loginWithRedirect({ authorizationParams: params });
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <button className="login-header__back" onClick={() => navigate("/")} aria-label="Volver al inicio">
          ← Volver
        </button>
        <a href="/" className="login-header__logo" aria-label="Itaú Uruguay">
          <ItauWordmark />
        </a>
        <div className="login-header__powered">
          <span>Protegido por</span>
          <Auth0Badge />
        </div>
      </header>

      <main className="login-main">
        <div className="login-box">
          {/* ── Tabs ──────────────────────────────────────── */}
          <div className="login-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === "personal"}
              className={`login-tab ${activeTab === "personal" ? "login-tab--active" : ""}`}
              onClick={() => setActiveTab("personal")}
            >
              <span className="login-tab__icon">👤</span>
              Persona física
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "empresa"}
              className={`login-tab ${activeTab === "empresa" ? "login-tab--active" : ""}`}
              onClick={() => setActiveTab("empresa")}
            >
              <span className="login-tab__icon">🏢</span>
              Empresa
            </button>
          </div>

          {/* ── Personal form ─────────────────────────────── */}
          {activeTab === "personal" && (
            <form
              className="login-form"
              onSubmit={handlePersonalSubmit}
              aria-label="Formulario de ingreso personal"
            >
              <p className="login-form__subtitle">
                Ingresá con tu documento de identidad uruguayo
              </p>

              {/* Document type */}
              <div className="form-group">
                <label className="form-label" htmlFor="docType">
                  Tipo de documento
                </label>
                <select
                  id="docType"
                  className="form-input form-select"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  required
                >
                  <option value="CI">Cédula de Identidad (CI)</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="DNI">DNI</option>
                  <option value="RNE">RNE – Documento extranjero</option>
                </select>
              </div>

              {/* Document number */}
              <div className="form-group">
                <label className="form-label" htmlFor="docNumber">
                  {docType === "CI" ? "Número de cédula" : "Número de documento"}
                </label>
                <input
                  id="docNumber"
                  type="text"
                  className="form-input"
                  placeholder={docType === "CI" ? "Ej: 1234567-8" : "Número de documento"}
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  required
                  autoComplete="username"
                  inputMode="numeric"
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label" htmlFor="personalPassword">
                  Contraseña
                </label>
                <input
                  id="personalPassword"
                  type="password"
                  className="form-input"
                  placeholder="Tu contraseña de Itaú"
                  value={personalPassword}
                  onChange={(e) => setPersonalPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="form-footer">
                <a href="#forgot" className="form-link">
                  Olvidé mi contraseña
                </a>
              </div>

              <button type="submit" className="btn btn--primary btn--lg btn--full">
                Ingresar
              </button>

              <p className="form-register">
                ¿Primera vez?{" "}
                <a href="#register" className="form-link">
                  Registrate aquí
                </a>
              </p>

              {/* Auth0 badge */}
              <div className="form-auth0-note">
                <Auth0Badge small />
                <span>Autenticación segura vía Auth0 — cifrado TLS + MFA</span>
              </div>
            </form>
          )}

          {/* ── Enterprise form ───────────────────────────── */}
          {activeTab === "empresa" && (
            <form
              className="login-form"
              onSubmit={handleEmpresaSubmit}
              aria-label="Formulario de ingreso empresarial"
            >
              <p className="login-form__subtitle">
                Ingresá con el RUT de tu empresa
              </p>

              {/* RUT */}
              <div className="form-group">
                <label className="form-label" htmlFor="rut">
                  RUT (Registro Único Tributario)
                </label>
                <input
                  id="rut"
                  type="text"
                  className="form-input"
                  placeholder="Ej: 21234567800016"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  required
                  autoComplete="organization"
                  inputMode="numeric"
                />
              </div>

              {/* Username */}
              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  Usuario / Nombre de usuario
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-input"
                  placeholder="Nombre de usuario asignado"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label" htmlFor="empresaPassword">
                  Contraseña
                </label>
                <input
                  id="empresaPassword"
                  type="password"
                  className="form-input"
                  placeholder="Contraseña de la cuenta empresarial"
                  value={empresaPassword}
                  onChange={(e) => setEmpresaPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="form-footer">
                <a href="#forgot" className="form-link">
                  Olvidé mi contraseña
                </a>
              </div>

              <button type="submit" className="btn btn--primary btn--lg btn--full">
                Ingresar como empresa
              </button>

              <p className="form-register">
                ¿Nueva empresa?{" "}
                <a href="#register" className="form-link">
                  Registrá tu empresa
                </a>
              </p>

              {/* Auth0 badge */}
              <div className="form-auth0-note">
                <Auth0Badge small />
                <span>Autenticación segura vía Auth0 — cifrado TLS + MFA</span>
              </div>
            </form>
          )}
        </div>

        {/* ── Side info panel ─────────────────────────────── */}
        <aside className="login-side">
          <h2>¿Por qué Auth0?</h2>
          <ul className="login-side__list">
            <li>
              <span className="login-side__icon">🛡️</span>
              <div>
                <strong>Protección avanzada</strong>
                <span>Detección de bots, ataques de fuerza bruta y credenciales comprometidas</span>
              </div>
            </li>
            <li>
              <span className="login-side__icon">📲</span>
              <div>
                <strong>MFA incluido</strong>
                <span>Autenticación de dos factores via SMS, app de autenticación o biometría</span>
              </div>
            </li>
            <li>
              <span className="login-side__icon">⚙️</span>
              <div>
                <strong>Integración rápida</strong>
                <span>Semanas, no meses. SDK disponible para React, Angular, iOS, Android y más</span>
              </div>
            </li>
            <li>
              <span className="login-side__icon">🌍</span>
              <div>
                <strong>Cumplimiento normativo</strong>
                <span>SOC2 Type II, ISO 27001, GDPR y LGPD</span>
              </div>
            </li>
            <li>
              <span className="login-side__icon">🔑</span>
              <div>
                <strong>SSO para empresas</strong>
                <span>Inicio de sesión único entre aplicaciones internas y externas</span>
              </div>
            </li>
          </ul>
        </aside>
      </main>

      {/* ── Auth0 flow modal ──────────────────────────────── */}
      {showModal && (
        <Auth0FlowModal
          data={submittedData}
          onAuth0Login={handleAuth0Login}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

/* ── Auth0 Flow Explanation Modal ───────────────────────────── */
function Auth0FlowModal({ data, onAuth0Login, onClose }) {
  const isPersonal = data?.tipo === "personal";

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Flujo Auth0">
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">×</button>

        <div className="modal__auth0-logo">
          <Auth0Badge />
        </div>

        <h2 className="modal__title">Así funciona Auth0</h2>

        <p className="modal__intro">
          En una integración real, al hacer clic en <strong>"Ingresar"</strong> ocurriría lo siguiente:
        </p>

        <ol className="modal__steps">
          <li>
            <span className="modal__step-num">1</span>
            <div>
              <strong>Redirección a Auth0</strong>
              <p>
                {isPersonal
                  ? `Tu ${data.docType} (${data.docNumber || "xxxxxxx"}) se envía como login_hint a Auth0.`
                  : `El RUT ${data.rut || "xxxxxx"} y usuario "${data.username || "xxx"}" se envían a Auth0.`}
                {" "}La app llama a <code>loginWithRedirect()</code>.
              </p>
            </div>
          </li>
          <li>
            <span className="modal__step-num">2</span>
            <div>
              <strong>Universal Login de Auth0</strong>
              <p>
                El usuario completa la autenticación en la página segura de Auth0
                (personalizable con la marca de Itaú).
                Auth0 verifica credenciales, aplica políticas de MFA y detecta anomalías.
              </p>
            </div>
          </li>
          <li>
            <span className="modal__step-num">3</span>
            <div>
              <strong>Tokens seguros</strong>
              <p>
                Auth0 devuelve un <em>ID Token</em> (datos del usuario) y un
                <em> Access Token</em> (para llamar APIs de Itaú).
                El SDK de React los gestiona automáticamente.
              </p>
            </div>
          </li>
          <li>
            <span className="modal__step-num">4</span>
            <div>
              <strong>Retorno a la app</strong>
              <p>
                El usuario es redirigido a <code>/callback</code> y luego a su perfil.
                Todo el flujo dura ≈ 2 segundos.
              </p>
            </div>
          </li>
        </ol>

        <div className="modal__actions">
          <button className="btn btn--primary btn--md" onClick={onAuth0Login}>
            Probar con Auth0 real →
          </button>
          <button className="btn btn--ghost btn--md" onClick={onClose}>
            Volver al formulario
          </button>
        </div>

        <p className="modal__disclaimer">
          * Esta demo usa credenciales de ejemplo. Para un tenant Auth0 funcional,
          configure <code>VITE_AUTH0_DOMAIN</code> y <code>VITE_AUTH0_CLIENT_ID</code>.
        </p>
      </div>
    </div>
  );
}

/* ── Reusable brand elements ─────────────────────────────────── */
function ItauWordmark() {
  return (
    <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="12" width="10" height="28" rx="2" fill="#F76700"/>
      <rect x="0" y="0" width="10" height="10" rx="2" fill="#F76700"/>
      <text x="16" y="34" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="28" fill="#F76700" letterSpacing="-0.5">
        taú
      </text>
    </svg>
  );
}

function Auth0Badge({ small = false }) {
  const size = small ? 18 : 28;
  return (
    <span className={`auth0-badge ${small ? "auth0-badge--small" : ""}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#EB5424"/>
        <path d="M24 10L30.5 29H17.5L24 10Z" fill="white"/>
        <path d="M17.5 29L10 18H24L17.5 29Z" fill="white" opacity="0.7"/>
        <path d="M30.5 29L38 18H24L30.5 29Z" fill="white" opacity="0.5"/>
      </svg>
      {!small && <span>Auth0</span>}
    </span>
  );
}
