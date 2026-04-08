import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth0();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="Itaú Uruguay – Inicio">
          <ItauLogo />
        </Link>

        {/* Main Nav Links */}
        <ul className="navbar__links">
          <li><a href="#personas">Personas</a></li>
          <li><a href="#empresas">Empresas</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#simuladores">Simuladores</a></li>
          <li><a href="#atencionalcliente">Atención al cliente</a></li>
        </ul>

        {/* Auth area */}
        <div className="navbar__auth">
          {isAuthenticated ? (
            <div className="navbar__user-menu">
              <span className="navbar__user-name">
                Hola, {user?.name?.split(" ")[0] || "Usuario"}
              </span>
              <Link to="/perfil" className="btn btn--ghost btn--sm">Mi perfil</Link>
              <button
                className="btn btn--outline btn--sm"
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              >
                Salir
              </button>
            </div>
          ) : (
            <button className="btn btn--primary btn--sm" onClick={() => navigate("/login")}>
              Ingresar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function ItauLogo() {
  return (
    <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Stylised "i" mark */}
      <rect x="0" y="10" width="8" height="22" rx="2" fill="#F76700"/>
      <rect x="0" y="0" width="8" height="8" rx="2" fill="#F76700"/>
      {/* "taú" wordmark */}
      <text x="14" y="27" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="22" fill="#F76700" letterSpacing="-0.5">
        taú
      </text>
    </svg>
  );
}
