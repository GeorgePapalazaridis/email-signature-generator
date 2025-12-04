import { setLanguage } from "./translations/translations.apply.js";
import { bindDom } from "./dom-bindings.js";
import "./signature-wizard.js"; // Wizard logic here
import { logoBase64 } from "../assets/base64/logo-base64.js";

// ===========================
// Init
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  // Default language
  window.currentLang = "gr";
  setLanguage("gr");

  // Bind language switch UI
  bindDom({ onLanguageChange: (lang) => setLanguage(lang) });

  console.log("📌 App initialized");
  console.log("🖼 Logo:", logoBase64.slice(0, 30) + "...");
});
