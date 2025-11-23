import { allowOnlyPhoneChars } from "../js/utils.js";

export function bindDom({ onLanguageChange }) {
  const mobileInput = document.getElementById("mobile");
  const phoneInput = document.getElementById("phone");
  const langSelect = document.getElementById("lang");

  // sanitize phone fields
  [mobileInput, phoneInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", (e) => allowOnlyPhoneChars(e.target));
  });

  // language change
  if (langSelect && onLanguageChange) {
    langSelect.addEventListener("change", (e) =>
      onLanguageChange(e.target.value)
    );
  }

  console.log("✅ DOM bindings initialized");
}
