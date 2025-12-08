import { allowOnlyPhoneChars } from "../js/utils/phone-validator.js";
import { debug } from "../js/utils/debug.js";

/**
 * Binds UI elements to application logic without mixing business functionality.
 *
 * Provides:
 * - Phone number sanitization
 * - Language selector change event
 *
 * Keeps wizard logic fully separated from DOM interactions.
 */

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

  debug.log("✅ DOM bindings initialized");
}
