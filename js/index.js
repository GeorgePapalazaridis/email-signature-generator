import { setLanguage } from "./translations/translations.apply.js";
import { bindDom } from "./dom-bindings.js";
import "./signature-wizard.js"; // Wizard logic here
import { logoBase64 } from "../assets/base64/logo-base64.js";
import { loadState, saveState } from "./services/state-storage.service.js";
import { restoreWizardState } from "./signature-wizard.js";

// ===========================
// Init
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  // Load saved state before applying translations/UI
  const saved = loadState();

  // 1. Restore current language
  window.currentLang = saved?.lang || "gr";
  setLanguage(window.currentLang);

  // 2. Sync <select id="lang"> με την τρέχουσα γλώσσα
  const langSelect = document.getElementById("lang");
  if (langSelect) {
    langSelect.value = window.currentLang;
  }

  // 3. Bind language change
  bindDom({
    onLanguageChange: (lang) => {
      window.currentLang = lang;
      saveState({ lang });
      setLanguage(lang);
    },
  });

  // 4. Restore wizard UI (χωρίς να πειράζουμε τη γλώσσα εδώ μέσα)
  restoreWizardState(saved);

  console.log("📌 App initialized");
  console.log("🖼 Logo:", logoBase64.slice(0, 30) + "...");
});
