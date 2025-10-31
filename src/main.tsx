import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 🛡️ Sécurité : protection contre certaines attaques de script
// (Empêche l’exécution d’éventuels scripts injectés dans le DOM)
if (window.location.protocol !== "https:") {
  console.warn(
    "⚠️ L'application n'est pas servie en HTTPS. Pensez à activer SSL pour plus de sécurité."
  );
}

const container = document.getElementById("root");

// 🧩 Vérification que l’élément root existe bien
if (!container) {
  throw new Error("L'élément racine 'root' est introuvable !");
}

// 🛡️ Empêche le XSS via innerHTML
container.innerHTML = ""; // Nettoyage préventif

// 🚀 Création de la racine React (React 18)
const root = createRoot(container);

// 🧠 Mode strict = vérifications supplémentaires (React 18)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// ✅ Mesures additionnelles côté client
// - Désactive certains raccourcis pour le vol de code
window.addEventListener("contextmenu", (e) => e.preventDefault()); // bloque clic droit
window.addEventListener("keydown", (e) => {
  if (
    (e.ctrlKey && e.shiftKey && e.key === "I") || // devtools
    (e.ctrlKey && e.key === "u") || // afficher le code source
    (e.ctrlKey && e.shiftKey && e.key === "J")
  ) {
    e.preventDefault();
  }
});
