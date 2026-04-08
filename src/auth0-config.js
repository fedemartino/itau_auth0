/**
 * Auth0 Configuration
 *
 * To connect this demo to a real Auth0 tenant:
 * 1. Create a free account at https://auth0.com/
 * 2. Create a Single Page Application
 * 3. Set Allowed Callback URLs, Allowed Logout URLs and Allowed Web Origins to your app URL
 * 4. Replace the values below with your tenant's Domain and Client ID
 * 5. Optionally create two Auth0 connections:
 *    - "Personal" connection for cedula-based login
 *    - "Empresa" connection for RUT-based login
 */
export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || "dev-itau-uy.auth0.com",
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || "YOUR_AUTH0_CLIENT_ID",
  authorizationParams: {
    redirect_uri: window.location.origin + "/callback",
    // scope defines the user info fields we request
    scope: "openid profile email",
  },
};

/**
 * Auth0 Login Hint Params
 *
 * When initiating Auth0 login we can pass extra params to pre-populate fields
 * or route to the correct connection / prompt.
 */
export const personalLoginParams = {
  connection: "personal-cedula",        // Auth0 connection name for personal accounts
  login_hint: "",                        // Can be pre-populated with cedula
  screen_hint: "login",
};

export const enterpriseLoginParams = {
  connection: "empresa-rut",            // Auth0 connection name for enterprise accounts
  screen_hint: "login",
};
