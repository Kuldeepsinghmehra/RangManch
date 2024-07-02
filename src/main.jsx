import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Auth0Provider
    domain="dev-7p7s5dr1rh11ar51.us.auth0.com"
    clientId="6FAwdOn7aX54c9YB0AxzEvlZhmTQTwa1"
    authorizationParams={{
      redirect_uri: "https://raangmanch.netlify.app/"
    }}
  >
     <App />
  </Auth0Provider>
  </React.StrictMode>,
)
