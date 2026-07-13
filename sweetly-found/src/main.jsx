import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import { AccountProvider } from "./context/AccountContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AccountProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AccountProvider>
  </React.StrictMode>
);
