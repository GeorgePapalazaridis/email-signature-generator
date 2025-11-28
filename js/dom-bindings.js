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
    langSelect.addEventListener("change", async (e) => {
      showLoader();

      await Promise.resolve(onLanguageChange(e.target.value));

      setTimeout(() => hideLoader(), 300);
    });
  }

  console.log("✅ DOM bindings initialized");
}
