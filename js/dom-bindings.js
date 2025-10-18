import { allowOnlyPhoneChars } from "../js/utils.js";

export function bindDom({ onGenerate, onLanguageChange }) {
  // Inputs
  const mobileInput = document.getElementById("mobile");
  const phoneInput = document.getElementById("phone");
  const langSelect = document.getElementById("lang");
  const generateBtn = document.getElementById("generateBtn");

  // Sanitize phone fields
  [mobileInput, phoneInput].forEach((input) =>
    input.addEventListener("input", (e) => allowOnlyPhoneChars(e.target))
  );

  // Language change
  langSelect.addEventListener("change", (e) =>
    onLanguageChange(e.target.value)
  );

  // Generate button
  generateBtn.addEventListener("click", onGenerate);
}
