import { translations, setLanguage } from "./translations.js";
import { bindDom } from "./dom-bindings.js";
import { showToast, showThankYouPopup } from "./notifications.js";

import {
  renderOutlookStep4_WebCopyPaste,
  renderThunderbirdStep4,
  renderMondayStep4,
} from "./step4-renderers.js";

import {
  buildSignature,
  SignaturePlatform,
} from "../assets/core/signature/signature-builder.service.js";

import { logoBase64 } from "../assets/base64/logo-base64.js";
import { formatPhoneNumber } from "./utils/phone-formatter.js";

// ===========================
// DOM Refs
// ===========================
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");

const previewBox = document.getElementById("preview-box");
const step4Container = document.getElementById("step4Content");

const platformCards = document.querySelectorAll(".platform-card");

const toStep2Btn = document.getElementById("toStep2Btn");
const toStep3Btn = document.getElementById("toStep3Btn");
const toStep4Btn = document.getElementById("toStep4Btn");

const backToStep1Btn = document.getElementById("backToStep1");
const backToStep2Btn = document.getElementById("backToStep2");
const backToStep3Btn = document.getElementById("backToStep3");
const finishBtn = document.getElementById("finishBtn");

const nameInput = document.getElementById("name");
const titleInput = document.getElementById("title");
const addressInput = document.getElementById("address");
const mobileInput = document.getElementById("mobile");
const phoneInput = document.getElementById("phone");

// ===========================
// State
// ===========================
window.signatureHtml = "";
window.selectedPlatform = null;

// ===========================
// Helpers
// ===========================
function showStep(stepEl) {
  [step1, step2, step3, step4].forEach((s) => {
    s.style.display = s === stepEl ? "block" : "none";
  });
  stepEl?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function step1IsValid() {
  return (
    nameInput.value.trim().length > 0 && titleInput.value.trim().length > 0
  );
}

function updateToStep2State() {
  toStep2Btn.disabled = !step1IsValid();
}

function buildData() {
  const rawPhone = phoneInput.value.trim() || "+30 2410 623 922";
  const rawMobile = mobileInput.value.trim();

  return {
    name: nameInput.value.trim(),
    title: titleInput.value.trim(),
    address: addressInput.value || "Farsalon 153, Larissa, 41335 - Greece",
    phone: formatPhoneNumber(rawPhone),
    mobile: formatPhoneNumber(rawMobile),
    logoBase64,
  };
}

function buildSignatureHtml() {
  return buildSignature({
    platform: SignaturePlatform.HTML_STANDARD,
    data: buildData(),
  });
}

// ===========================
// Step 1 -> Step 2 (Preview)
// ===========================
[nameInput, titleInput].forEach((el) =>
  el?.addEventListener("input", updateToStep2State)
);
document.addEventListener("DOMContentLoaded", updateToStep2State);

function previewSignature() {
  window.signatureHtml = buildSignatureHtml();
  previewBox.innerHTML = `<div class="signature-wrapper">${window.signatureHtml}</div>`;
}

toStep2Btn?.addEventListener("click", () => {
  if (!step1IsValid()) {
    const t = translations[window.currentLang] || translations["en"];
    showToast(t.form.alertMissing, "error");
    return;
  }

  previewSignature();
  showStep(step2);
});

backToStep1Btn?.addEventListener("click", () => showStep(step1));

// ===========================
// Step 2 -> Step 3 (Platform)
// ===========================
toStep3Btn?.addEventListener("click", () => {
  if (!window.signatureHtml) window.signatureHtml = buildSignatureHtml();

  window.selectedPlatform = SignaturePlatform.OUTLOOK;

  platformCards.forEach((c) => c.classList.remove("selected"));
  document
    .querySelector('[data-platform="outlook"]')
    ?.classList.add("selected");

  toStep4Btn.disabled = false;
  showStep(step3);
});

backToStep2Btn?.addEventListener("click", () => showStep(step2));

// ===========================
// Platform Selection
// ===========================
platformCards.forEach((card) => {
  card.addEventListener("click", () => {
    platformCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    window.selectedPlatform = card.dataset.platform;
    toStep4Btn.disabled = false;
  });
});

// ===========================
// Step 3 -> Step 4
// ===========================
toStep4Btn?.addEventListener("click", () => {
  if (!window.selectedPlatform) return;

  window.signatureHtml = buildSignature({
    platform: window.selectedPlatform,
    data: buildData(),
  });

  showStep(step4);
  const t = translations[window.currentLang];

  if (window.selectedPlatform === SignaturePlatform.OUTLOOK) {
    renderOutlookStep4_WebCopyPaste(window.signatureHtml, t);
  } else if (window.selectedPlatform === "thunderbird") {
    renderThunderbirdStep4(window.signatureHtml, t);
  } else if (window.selectedPlatform === "monday") {
    renderMondayStep4(window.signatureHtml, t);
  }
});

backToStep3Btn?.addEventListener("click", () => {
  step4Container.innerHTML = "";
  window.selectedPlatform = null;
  platformCards.forEach((c) => c.classList.remove("selected"));
  toStep4Btn.disabled = true;
  showStep(step3);
});

// ===========================
// Finish / Reset flow
// ===========================
finishBtn?.addEventListener("click", resetWizard);

function resetWizard() {
  window.selectedPlatform = null;
  window.signatureHtml = "";

  document.getElementById("signatureForm").reset();
  updateToStep2State();

  platformCards.forEach((c) => c.classList.remove("selected"));
  toStep4Btn.disabled = true;
  step4Container.innerHTML = "";

  showStep(step1);
  showThankYouPopup();
}

// ===========================
// Theme Toggle
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeToggleBtn");
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");

  if (saved) {
    root.setAttribute("data-theme", saved);
    btn.textContent = saved === "dark" ? "☀️" : "🌙";
  }

  btn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    btn.textContent = next === "dark" ? "☀️" : "🌙";
  });
});

// ===========================
// Translation Change Handling
// ===========================

document.addEventListener("language-changed", () => {
  const step4Visible =
    step4 && step4.style.display !== "none" && window.selectedPlatform;

  if (!step4Visible) return;

  const t = translations[window.currentLang];
  window.signatureHtml = buildSignature({
    platform: window.selectedPlatform,
    data: buildData(),
  });

  if (window.selectedPlatform === SignaturePlatform.OUTLOOK) {
    renderOutlookStep4_WebCopyPaste(window.signatureHtml, t);
  } else if (window.selectedPlatform === "thunderbird") {
    renderThunderbirdStep4(window.signatureHtml, t);
  } else if (window.selectedPlatform === "monday") {
    renderMondayStep4(window.signatureHtml, t);
  }
});

// ===========================
// Init
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  window.currentLang = "gr";
  setLanguage("gr");
  bindDom({ onLanguageChange: (lang) => setLanguage(lang) });

  updateToStep2State();
  console.log("🚀 Signature Wizard Active");
});
