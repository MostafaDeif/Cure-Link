import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RoleProvider } from "./Context/RoleContext.jsx";
import { LanguageProvider } from "./Context/LanguageContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <RoleProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </RoleProvider>
  </CartProvider>,
);
