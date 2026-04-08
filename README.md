# Itaú Uruguay × Auth0 – Demo de integración

Demo interactiva que muestra cómo quedaría el proceso de inicio de sesión de **[Itaú Uruguay](https://www.itau.com.uy/)** potenciado por **[Auth0](https://auth0.com/)**.

## 📺 Pantallas

| Página principal | Login Personal (Cédula) | Login Empresa (RUT) | Flujo Auth0 |
|---|---|---|---|
| Hero + quick-access card | Tipo de doc + cédula + contraseña | RUT + usuario + contraseña | Modal explicativo del flujo OAuth2 |

## 🚀 Cómo correr la demo

### Pre-requisitos
- Node.js ≥ 18
- npm ≥ 9

### Instalación

```bash
git clone https://github.com/fedemartino/itau_auth0.git
cd itau_auth0
npm install
```

### Configuración de Auth0 (opcional para flujo real)

1. Creá una cuenta gratuita en [auth0.com](https://auth0.com/)
2. Creá una **Single Page Application**
3. En la configuración de la app, agregá:
   - **Allowed Callback URLs**: `http://localhost:5173/callback`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`
4. Copiá el archivo `.env.example` a `.env` y completá tus credenciales:

```bash
cp .env.example .env
```

```env
VITE_AUTH0_DOMAIN=tu-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=tu_client_id
```

### Correr en desarrollo

```bash
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173)

### Build de producción

```bash
npm run build
npm run preview
```

## 🏗️ Arquitectura

```
src/
├── auth0-config.js          # Configuración de Auth0 (domain, clientId, scopes)
├── main.jsx                 # Entry point – Auth0Provider + BrowserRouter
├── App.jsx                  # Rutas de la SPA
├── components/
│   ├── Navbar.jsx           # Barra de navegación con estado auth
│   └── Navbar.css
└── pages/
    ├── HomePage.jsx         # Landing page con hero + quick-login card
    ├── HomePage.css
    ├── LoginPage.jsx        # Formularios Personal / Empresa + modal Auth0
    ├── LoginPage.css
    ├── CallbackPage.jsx     # Procesamiento del callback OAuth2
    ├── CallbackPage.css
    ├── ProfilePage.jsx      # Dashboard post-login con datos del token
    └── ProfilePage.css
```

## 🔐 Flujos de login

### Persona física
1. El usuario selecciona **tipo de documento** (CI, Pasaporte, DNI, RNE)
2. Ingresa su **número de cédula** y **contraseña**
3. Al enviar, `loginWithRedirect()` llama a Auth0 con `connection: "personal-cedula"` y `login_hint: <cedula>`

### Empresa
1. El usuario ingresa su **RUT** (Registro Único Tributario), **nombre de usuario** y **contraseña**
2. Al enviar, `loginWithRedirect()` llama a Auth0 con `connection: "empresa-rut"` y `login_hint: <rut>`

### Flujo OAuth2 (Auth0)
```
App  →  loginWithRedirect()  →  Auth0 Universal Login
                                      ↓
                               Verifica credenciales
                               Aplica MFA
                               Detecta anomalías
                                      ↓
App  ←  /callback?code=xxx  ←  Auth0 emite tokens
 ↓
SDK intercambia code → ID Token + Access Token
 ↓
Usuario llega a /perfil
```

## 🛠️ Stack tecnológico

| Herramienta | Uso |
|---|---|
| React 19 | UI |
| Vite 8 | Build tool |
| React Router 7 | Routing client-side |
| @auth0/auth0-react 2 | Autenticación |

## ⚠️ Aviso legal

Este proyecto es una **demo ilustrativa** creada con fines comerciales/demostrativos.  
No está afiliada oficialmente con Itaú Uruguay ni con Okta/Auth0.
