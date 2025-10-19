import { allowOnlyPhoneChars } from "../js/utils.js";

export function bindDom({ onGenerate, onLanguageChange }) {
  // ====== DOM ELEMENTS ======
  const mobileInput = document.getElementById("mobile");
  const phoneInput = document.getElementById("phone");
  const langSelect = document.getElementById("lang");
  const generateBtn = document.getElementById("generateBtn");

  // ====== SAFE CHECKS ======
  if (!generateBtn) {
    console.error(
      "❌ Missing #generateBtn in DOM. Cannot bind generate event."
    );
    return;
  }
  if (!langSelect) {
    console.error("❌ Missing #lang selector. Cannot bind language change.");
  }

  // ====== SANITIZE PHONE FIELDS ======
  [mobileInput, phoneInput].forEach((input) => {
    if (input)
      input.addEventListener("input", (e) => allowOnlyPhoneChars(e.target));
  });

  // ====== LANGUAGE CHANGE ======
  if (langSelect)
    langSelect.addEventListener("change", (e) =>
      onLanguageChange(e.target.value)
    );

  // ====== GENERATE BUTTON ======
  generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    onGenerate();
  });

  console.log("✅ DOM bindings initialized");
}
