import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./CallbackPage.css";

/**
 * CallbackPage
 *
 * Auth0 redirects back here after successful authentication.
 * The Auth0 React SDK automatically handles the code exchange.
 * We just show a loading state and redirect once done.
 */
export default function CallbackPage() {
  const { isLoading, error, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/perfil", { replace: true });
    }
    if (!isLoading && error) {
      navigate("/login", { replace: true });
    }
  }, [isLoading, isAuthenticated, error, navigate]);

  return (
    <div className="callback-page">
      <div className="callback-card">
        <div className="callback-spinner" aria-hidden="true" />
        <h2>Verificando identidad…</h2>
        <p>Auth0 está procesando tu inicio de sesión de forma segura.</p>
        {error && (
          <p className="callback-error">
            Error: {error.message}
          </p>
        )}
      </div>
    </div>
  );
}
