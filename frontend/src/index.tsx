import React from "react"
import ReactDOM from "react-dom/client"
//import "./index.css"
import "./index.css"
import App from "./App"
//import { LoanProvider } from "./contexts/LoanContext"
//import { LoanProvider } from "./contexts/LoanContext"
import { AuthProvider } from "./contexts/AuthContext"
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)

