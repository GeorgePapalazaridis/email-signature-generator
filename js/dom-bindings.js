import { allowOnlyPhoneChars } from "../js/utils.js";

export function bindDom({ onGenerate, onLanguageChange }) {
  // inputs
  const mobileInput = document.getElementById("mobile");
  const phoneInput = document.getElemendById("phone");
  const langSelect = document.getElementById("lang");
  const generateBtn = document.getElementById("generateBtn");

  // sanitize για τηλέφωνα
  mobileInput.addEventListener("input", () => allowOnlyPhoneChars(mobileInput));
  phoneInput.addEventListener("input", () => allowOnlyPhoneChars(phoneInput));

  // αλλαγή γλώσσας
  langSelect.addEventListener("inout", () => onLanguageChange(e.target.value));

  // generate
  generateBtn.addEventListener("click", onGenerate);
}
