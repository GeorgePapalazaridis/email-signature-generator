import { logoBase64 } from "../assets/base64/logo-base64.js";
import { translations, setLanguage } from "./translations.js";
import {
  buildSignature,
  SignaturePlatform,
} from "../assets/core/signature/signature-builder.service.js";
import { bindDom } from "./dom-bindings.js";
import { showToast, showThankYouPopup } from "./notifications.js";
import {
  renderOutlookStep4_Image,
  renderOutlookStep4_Legacy, // legacy bookmarklet
  renderThunderbirdStep4,
  renderMondayStep4,
} from "./step4-renderers.js";
import { formatPhoneNumber } from "./utils/phone-formatter.js";

// ===========================
// DOM Refs (new 3-step wizard)
// ===========================
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");

// Buttons
const toStep2Btn = document.getElementById("toStep2Btn");
const toStep3Btn = document.getElementById("toStep3Btn");
const toStep4Btn = document.getElementById("toStep4Btn");

const backToStep1Btn = document.getElementById("backToStep1");
const backToStep2Btn = document.getElementById("backToStep2");
const backToStep3Btn = document.getElementById("backToStep3");

const finishBtn = document.getElementById("finishBtn");

// Inputs
const nameInput = document.getElementById("name");
const titleInput = document.getElementById("title");
const addressInput = document.getElementById("address");
const mobileInput = document.getElementById("mobile");
const phoneInput = document.getElementById("phone");

// Preview box (Step 2)
const previewBox = document.getElementById("preview-box");

// Platform cards (Step 3)
const platformCards = document.querySelectorAll(".platform-card");

// Optional old/final DOM (if we decide to keep them later)
const bookmarkletContainer = document.getElementById("bookmarklet-container");
const bookmarkletLink = document.getElementById("bookmarklet");
const dragTextEl = document.getElementById("dragText");
const instructionEl = document.getElementById("instructionText");

// ===========================
// State
// ===========================
window.selectedPlatform = null;

window.signatureHtml = "";

// ===========================
// Helpers
// ===========================
function showStep(stepEl) {
  [step1, step2, step3, step4].forEach((s) => {
    if (!s) return;
    s.style.display = s === stepEl ? "block" : "none";
  });

  stepEl?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function step1IsValid() {
  return (
    nameInput?.value.trim().length > 0 && titleInput?.value.trim().length > 0
  );
}

function updateToStep2State() {
  if (!toStep2Btn) return;
  toStep2Btn.disabled = !step1IsValid();
}

function buildSignatureHtml() {
  const name = nameInput.value.trim();
  const title = titleInput.value.trim();
  const address = addressInput.value || "Farsalon 153, Larissa, 41335 - Greece";

  const mobile = formatPhoneNumber(mobileInput.value.trim());
  const phone = formatPhoneNumber(
    phoneInput.value.trim() || "+30 2410 623 922"
  );

  return buildSignature({
    platform: SignaturePlatform.HTML_STANDARD,
    data: {
      name,
      title,
      address,
      phone,
      mobile,
      logoBase64,
    },
  });
}

function buildOutlookImageSignatureHtml() {
  const name = nameInput.value.trim();
  const title = titleInput.value.trim();
  const address = addressInput.value || "Farsalon 153, Larissa, 41335 - Greece";

  const mobile = mobileInput.value.trim();
  const phone = phoneInput.value.trim() || "+30 2410 623 922";

  // ΣΗΜΑΝΤΙΚΟ: εδώ χρησιμοποιούμε το Outlook Image template
  return buildSignature({
    platform: SignaturePlatform.OUTLOOK,
    data: {
      name,
      title,
      address,
      phone,
      mobile,
      logoBase64,
    },
  });
}

// ===========================
// Step 1 -> Step 2 (Preview)
// ===========================
[nameInput, titleInput].forEach((el) => {
  el?.addEventListener("input", updateToStep2State);
});

document.addEventListener("DOMContentLoaded", updateToStep2State);

updateToStep2State();

toStep2Btn?.addEventListener("click", () => {
  if (!step1IsValid()) {
    const msg =
      window.currentLang === "gr"
        ? "⚠️ Συμπλήρωσε τουλάχιστον Όνομα και Τίτλο"
        : "⚠️ Please fill in at least Name and Title";
    showToast(msg, "error");
    return;
  }

  window.signatureHtml = buildSignature({
    platform: SignaturePlatform.HTML_STANDARD,

    data: {
      name: nameInput.value.trim(),
      title: titleInput.value.trim(),
      address: addressInput.value || "Farsalon 153, Larissa, 41335 - Greece",
      mobile: mobileInput.value.trim(),
      phone: phoneInput.value.trim() || "+30 2410 623 922",
      logoBase64,
    },
  });

  if (previewBox) {
    previewBox.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.classList.add("signature-wrapper");
    wrapper.innerHTML = window.signatureHtml;
    previewBox.appendChild(wrapper);
  }

  showStep(step2);
});

// Back Step 2 -> Step 1
backToStep1Btn?.addEventListener("click", () => {
  showStep(step1);
});

// ===========================
// Step 2 -> Step 3 (Platform)
// ===========================
toStep3Btn?.addEventListener("click", () => {
  if (!window.signatureHtml) window.signatureHtml = buildSignatureHtml();

  // === Default Outlook Image selection ===
  window.selectedPlatform = SignaturePlatform.OUTLOOK;

  platformCards.forEach((c) => c.classList.remove("selected"));
  const defaultCard = document.querySelector('[data-platform="outlook"]');
  if (defaultCard) defaultCard.classList.add("selected");

  if (toStep4Btn) toStep4Btn.disabled = false;

  showStep(step3);
});

// Back Step 3 -> Step 2
backToStep2Btn?.addEventListener("click", () => {
  showStep(step2);
});

backToStep3Btn?.addEventListener("click", () => {
  // Clear Step 4 content
  const container = document.getElementById("step4Content");
  if (container) container.innerHTML = "";

  // Reset platform selection completely
  window.selectedPlatform = null;
  platformCards.forEach((c) => c.classList.remove("selected"));
  if (toStep4Btn) toStep4Btn.disabled = true;

  // Go back to Step 3
  showStep(step3);
});

// ===========================
// Step 3 Platform selection
// ===========================
platformCards.forEach((card) => {
  card.addEventListener("click", () => {
    platformCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    window.selectedPlatform = card.dataset.platform;

    if (toStep4Btn) toStep4Btn.disabled = false;
  });
});

toStep4Btn?.addEventListener("click", () => {
  if (!window.selectedPlatform) return;

  // Χτίζουμε το σωστό HTML ανά πλατφόρμα
  if (window.selectedPlatform === SignaturePlatform.OUTLOOK) {
    // ➜ Outlook Image: ειδικό template με τα base64 icons
    window.signatureHtml = buildOutlookImageSignatureHtml();
  } else {
    // ➜ Όλα τα υπόλοιπα: standard HTML όπως πριν
    if (!window.signatureHtml) {
      window.signatureHtml = buildSignatureHtml();
    }
  }

  // For Debug
  if (window.selectedPlatform === SignaturePlatform.OUTLOOK) {
    console.log("DEBUG [Step4] OUTLOOK_IMAGE signatureHtml snippet:");
    const idx = window.signatureHtml.indexOf("<!-- PHONE -->");
    console.log(
      idx === -1
        ? window.signatureHtml.slice(0, 400)
        : window.signatureHtml.slice(idx, idx + 400)
    );
  }
  //

  showStep(step4);

  const t = translations[window.currentLang || "gr"];

  if (window.selectedPlatform === SignaturePlatform.OUTLOOK) {
    // 🖼 Render UI για Outlook Image
    renderOutlookStep4_Image(window.signatureHtml, t);

    // 🖼 Bind PNG export button
    const downloadBtn = document.getElementById("outlookImageDownloadBtn");
    if (downloadBtn) {
      downloadBtn.onclick = async () => {
        await exportSignaturePng({
          html: window.signatureHtml, // ΤΩΡΑ είναι Outlook template
          fileName: "prognosis-signature.png",
        });
      };
    }
  }

  if (window.selectedPlatform === SignaturePlatform.OUTLOOK) {
    renderOutlookStep4_Legacy(window.signatureHtml, t);
  }

  if (window.selectedPlatform === "thunderbird") {
    renderThunderbirdStep4(window.signatureHtml, t);
  }

  if (window.selectedPlatform === "monday") {
    renderMondayStep4(window.signatureHtml, t);
  }
});

// ===========================
// Final action (depends on platform)
// ===========================
finishBtn?.addEventListener("click", () => {
  // Reset state
  window.selectedPlatform = null;
  window.signatureHtml = "";

  // Clear platform selections
  platformCards.forEach((c) => c.classList.remove("selected"));
  if (toStep4Btn) toStep4Btn.disabled = true;

  // Clear form
  document.getElementById("signatureForm").reset();
  updateToStep2State();

  // Clear Step 4 content
  const container = document.getElementById("step4Content");
  if (container) container.innerHTML = "";

  // Return to Step 1
  showStep(step1);

  // ✨ Success Popup
  showThankYouPopup();
});

document.addEventListener("language-changed", () => {
  const step4El = document.getElementById("step4");
  const isVisible = step4El && step4El.offsetParent !== null;

  if (!isVisible || !window.selectedPlatform) return;

  const t = translations[window.currentLang];

  if (window.selectedPlatform === SignaturePlatform.OUTLOOK) {
    // Ξαναχτίζουμε outlook image HTML με τη νέα γλώσσα
    window.signatureHtml = buildOutlookImageSignatureHtml();
    renderOutlookStep4_Image(window.signatureHtml, t);
  } else {
    if (!window.signatureHtml) {
      window.signatureHtml = buildSignatureHtml();
    }

    if (window.selectedPlatform === SignaturePlatform.OUTLOOK) {
      renderOutlookStep4_Legacy(window.signatureHtml, t);
    }

    if (window.selectedPlatform === "thunderbird") {
      renderThunderbirdStep4(window.signatureHtml, t);
    }

    if (window.selectedPlatform === "monday") {
      renderMondayStep4(window.signatureHtml, t);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggleBtn");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
  }

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
});

// ===========================
// Init
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  // Default language
  window.currentLang = "gr";
  setLanguage("gr");

  // Δέσιμο DOM handlers
  bindDom({
    onLanguageChange: (lang) => setLanguage(lang),
  });

  console.log("App initialized ✅");
  console.log("Logo base64 preview:", logoBase64.slice(0, 50) + "...");
});

phoneInput?.addEventListener("blur", () => {
  const formatted = formatPhoneNumber(phoneInput.value);
  phoneInput.value = formatted;
});

mobileInput?.addEventListener("blur", () => {
  const formatted = formatPhoneNumber(mobileInput.value);
  mobileInput.value = formatted;
});
