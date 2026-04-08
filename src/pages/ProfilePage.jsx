import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar.jsx";
import "./ProfilePage.css";

/**
 * ProfilePage
 *
 * Shows the authenticated user's profile info returned by Auth0.
 * Demonstrates the data available after successful login.
 */
export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="callback-spinner" />
      </div>
    );
  }

  if (!isAuthenticated || !user) return null;

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-main">
        <div className="profile-header-card">
          <img
            src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "U")}&background=F76700&color=fff&size=80`}
            alt={user.name}
            className="profile-avatar"
          />
          <div>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <span className="profile-badge">✅ Identidad verificada por Auth0</span>
          </div>
          <button
            className="btn btn--outline btn--sm profile-logout"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Cerrar sesión
          </button>
        </div>

        <div className="profile-grid">
          {/* Account summary */}
          <section className="profile-card">
            <h2>Mis cuentas</h2>
            <div className="account-list">
              <AccountRow
                icon="💳"
                label="Caja de ahorro Pesos"
                number="**** **** 4521"
                balance="UYU 42.350,00"
              />
              <AccountRow
                icon="💵"
                label="Caja de ahorro Dólares"
                number="**** **** 7823"
                balance="USD 1.240,00"
              />
              <AccountRow
                icon="🏦"
                label="Cuenta corriente"
                number="**** **** 0192"
                balance="UYU 8.900,00"
              />
            </div>
          </section>

          {/* Recent activity */}
          <section className="profile-card">
            <h2>Últimos movimientos</h2>
            <div className="activity-list">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="activity-row">
                  <span className="activity-icon">{a.icon}</span>
                  <div className="activity-info">
                    <strong>{a.label}</strong>
                    <small>{a.date}</small>
                  </div>
                  <span className={`activity-amount ${a.positive ? "positive" : "negative"}`}>
                    {a.positive ? "+" : "-"} {a.amount}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Auth0 token info */}
          <section className="profile-card profile-card--token">
            <h2>🔑 Datos de Auth0</h2>
            <p className="token-note">
              Estos son los datos que Auth0 devuelve en el ID Token tras autenticarte:
            </p>
            <pre className="token-json">
              {JSON.stringify(
                {
                  sub: user.sub,
                  name: user.name,
                  email: user.email,
                  email_verified: user.email_verified,
                  updated_at: user.updated_at,
                },
                null,
                2
              )}
            </pre>
          </section>
        </div>
      </main>
    </div>
  );
}

function AccountRow({ icon, label, number, balance }) {
  return (
    <div className="account-row">
      <span className="account-icon">{icon}</span>
      <div className="account-info">
        <strong>{label}</strong>
        <small>{number}</small>
      </div>
      <span className="account-balance">{balance}</span>
    </div>
  );
}

const RECENT_ACTIVITY = [
  { icon: "🛒", label: "Supermercado Disco", date: "Hoy 10:32", amount: "UYU 2.840,00", positive: false },
  { icon: "💸", label: "Transferencia recibida", date: "Ayer 18:45", amount: "UYU 15.000,00", positive: true },
  { icon: "⛽", label: "ANCAP Combustible", date: "05/04 09:12", amount: "UYU 1.200,00", positive: false },
  { icon: "📱", label: "Pago de servicios – Antel", date: "03/04 11:00", amount: "UYU 850,00", positive: false },
];
