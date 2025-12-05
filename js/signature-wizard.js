import { translations } from "./translations/translations.data.js";
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
import { saveState, clearState } from "./services/state-storage.service.js";

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

const clearBtn = document.getElementById("clearBtn");

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

function nothingChangedFromDefaults() {
  const isNameEmpty = nameInput.value.trim() === "";
  const isTitleEmpty = titleInput.value.trim() === "";
  const isMobileEmpty = mobileInput.value.trim() === "";
  const isAddressDefault =
    addressInput.value.trim() === "Farsalon 153, Larissa, 41335 - Greece";
  const isPhoneDefault = phoneInput.value.trim() === "+30 2410 623 922";

  return (
    isNameEmpty &&
    isTitleEmpty &&
    isMobileEmpty &&
    isAddressDefault &&
    isPhoneDefault
  );
}

function updateClearButtonState() {
  document.getElementById("clearBtn").disabled = nothingChangedFromDefaults();
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

function previewSignature() {
  window.signatureHtml = buildSignatureHtml();
  previewBox.innerHTML = `<div class="signature-wrapper">${window.signatureHtml}</div>`;
}

function updateStep4Title() {
  const headerEl = document.getElementById("step4Title");
  const t = translations[window.currentLang];

  const titleKeyMap = {
    [SignaturePlatform.OUTLOOK]: "step4TitleOutlook",
    [SignaturePlatform.THUNDERBIRD]: "step4TitleThunderbird",
    [SignaturePlatform.MONDAY]: "step4TitleMonday",
  };

  const key = titleKeyMap[window.selectedPlatform];

  if (headerEl && key && t?.steps[key]) {
    headerEl.textContent = t.steps[key];
  }
}

// ===========================
// Step 1 -> Step 2 (Preview)
// ===========================
[nameInput, titleInput, addressInput, mobileInput, phoneInput].forEach((el) =>
  el?.addEventListener("input", () => {
    updateToStep2State();
    updateClearButtonState();

    if (!nothingChangedFromDefaults()) {
      saveState({ ...buildData() });
    }
  })
);

document.addEventListener("DOMContentLoaded", updateToStep2State);

clearBtn?.addEventListener("click", () => {
  clearState(); // remove saved data
  document.getElementById("signatureForm").reset();

  addressInput.value = "Farsalon 153, Larissa, 41335 - Greece";
  phoneInput.value = "+30 2410 623 922";

  saveState({ currentStep: 1 });

  window.signatureHtml = "";
  window.selectedPlatform = null;

  updateToStep2State(); // disable next button
  updateClearButtonState();
  showStep(step1);

  console.log("🧹 Wizard form cleared");
});

toStep2Btn?.addEventListener("click", () => {
  if (!step1IsValid()) {
    const t = translations[window.currentLang] || translations["en"];
    showToast(t.form.alertMissing, "error");
    return;
  }

  previewSignature();
  saveState({ signatureHtml: window.signatureHtml, currentStep: 2 });
  showStep(step2);
});

backToStep1Btn?.addEventListener("click", () => {
  saveState({ currentStep: 1 });
  showStep(step1);
});

// ===========================
// Step 2 -> Step 3 (Platform)
// ===========================
toStep3Btn?.addEventListener("click", () => {
  if (!window.signatureHtml) window.signatureHtml = buildSignatureHtml();

  window.selectedPlatform = SignaturePlatform.OUTLOOK;

  platformCards.forEach((c) => c.classList.remove("selected"));
  saveState({ selectedPlatform: window.selectedPlatform, currentStep: 3 });

  document
    .querySelector('[data-platform="outlook"]')
    ?.classList.add("selected");

  toStep4Btn.disabled = false;
  showStep(step3);
});

backToStep2Btn?.addEventListener("click", () => {
  saveState({ currentStep: 2 });
  showStep(step2);
});

// ===========================
// Platform Selection
// ===========================
platformCards.forEach((card) => {
  card.addEventListener("click", () => {
    platformCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    window.selectedPlatform = card.dataset.platform;
    saveState({
      selectedPlatform: window.selectedPlatform,
      currentStep: 3,
    });
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

  saveState({
    signatureHtml: window.signatureHtml,
    selectedPlatform: window.selectedPlatform,
    currentStep: 4,
  });

  showStep(step4);
  updateStep4Title(); // 💡 Εδώ μπαίνει τώρα

  const t = translations[window.currentLang];

  if (window.selectedPlatform === SignaturePlatform.OUTLOOK) {
    renderOutlookStep4_WebCopyPaste(window.signatureHtml, t);
  } else if (window.selectedPlatform === SignaturePlatform.THUNDERBIRD) {
    renderThunderbirdStep4(window.signatureHtml, t);
  } else if (window.selectedPlatform === SignaturePlatform.MONDAY) {
    renderMondayStep4(window.signatureHtml, t);
  }
});

backToStep3Btn?.addEventListener("click", () => {
  saveState({ currentStep: 3 });
  step4Container.innerHTML = "";
  window.selectedPlatform = null;
  toStep4Btn.disabled = true;
  showStep(step3);
});

// ===========================
// Finish / Reset flow
// ===========================
finishBtn?.addEventListener("click", resetWizard);

function resetWizard() {
  // Clear internal state
  window.selectedPlatform = null;
  window.signatureHtml = "";

  // Reset form UI
  document.getElementById("signatureForm").reset();
  addressInput.value = "Farsalon 153, Larissa, 41335 - Greece";
  phoneInput.value = "+30 2410 623 922";

  updateToStep2State();
  updateClearButtonState();

  // Clear platform selection
  platformCards.forEach((c) => c.classList.remove("selected"));
  toStep4Btn.disabled = true;
  step4Container.innerHTML = "";

  // Clear saved state
  clearState();
  saveState({ currentStep: 1 }); // Persist correct step for refresh

  // Go to Step 1 and show success
  showStep(step1);
  showThankYouPopup();

  console.log("🧹 Wizard fully reset");
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

  updateStep4Title(); // 💡 Διορθώνει τον τίτλο Step 4 σύμφωνα με τη γλώσσα

  const t = translations[window.currentLang];
  window.signatureHtml = buildSignature({
    platform: window.selectedPlatform,
    data: buildData(),
  });

  if (window.selectedPlatform === SignaturePlatform.OUTLOOK) {
    renderOutlookStep4_WebCopyPaste(window.signatureHtml, t);
  } else if (window.selectedPlatform === SignaturePlatform.THUNDERBIRD) {
    renderThunderbirdStep4(window.signatureHtml, t);
  } else if (window.selectedPlatform === SignaturePlatform.MONDAY) {
    renderMondayStep4(window.signatureHtml, t);
  }
});

export function restoreWizardState(saved) {
  if (!saved) return;

  // Restore form
  nameInput.value = saved.name || "";
  titleInput.value = saved.title || "";
  addressInput.value = saved.address || "";
  mobileInput.value = saved.mobile || "";
  phoneInput.value = saved.phone || "";

  // Restore preview
  if (saved.signatureHtml) {
    window.signatureHtml = saved.signatureHtml;
    previewBox.innerHTML = `<div class="signature-wrapper">${saved.signatureHtml}</div>`;
  }

  // Restore platform
  if (saved.selectedPlatform) {
    window.selectedPlatform = saved.selectedPlatform;
    document
      .querySelector(`[data-platform="${saved.selectedPlatform}"]`)
      ?.classList.add("selected");
    toStep4Btn.disabled = false;
  }

  updateClearButtonState();

  // Restore step — with state correction
  if (!saved.currentStep || saved.currentStep < 1 || saved.currentStep > 4) {
    saved.currentStep = 1;
  }

  if (saved.currentStep === 4 && !saved.selectedPlatform) {
    saved.currentStep = 3;
  }

  const steps = [step1, step2, step3, step4];
  showStep(steps[saved.currentStep - 1]);

  console.log("✨ Wizard restored");
}
