import { dom } from "./wizard.dom.js";
import { translations } from "../translations/translations.data.js";
import {
  buildSignature,
  SignaturePlatform,
} from "../../assets/core/signature/signature-builder.service.js";
import { formatPhoneNumber } from "../utils/phone-formatter.js";
import { logoBase64 } from "../../assets/base64/logo-base64.js";
import { saveState } from "../services/state-storage.service.js";
import { wizardRuntime } from "./wizard.runtime.js";

export function showStep(stepEl) {
  const steps = [dom.step1, dom.step2, dom.step3, dom.step4];

  steps.forEach((s) => {
    s.style.display = s === stepEl ? "block" : "none";
  });

  stepEl?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function step1IsValid() {
  return (
    dom.nameInput.value.trim().length > 0 &&
    dom.titleInput.value.trim().length > 0
  );
}

export function updateToStep2State() {
  dom.toStep2Btn.disabled = !step1IsValid();
}

export function nothingChangedFromDefaults() {
  const isNameEmpty = dom.nameInput.value.trim() === "";
  const isTitleEmpty = dom.titleInput.value.trim() === "";
  const isMobileEmpty = dom.mobileInput.value.trim() === "";
  const isAddressDefault =
    dom.addressInput.value.trim() === "Farsalon 153, Larissa, 41335 - Greece";
  const isPhoneDefault = dom.phoneInput.value.trim() === "+30 2410 623 922";

  return (
    isNameEmpty &&
    isTitleEmpty &&
    isMobileEmpty &&
    isAddressDefault &&
    isPhoneDefault
  );
}

export function updateClearButtonState() {
  dom.clearBtn.disabled = nothingChangedFromDefaults();
}

export function buildData() {
  const rawPhone = dom.phoneInput.value.trim() || "+30 2410 623 922";
  const rawMobile = dom.mobileInput.value.trim();

  return {
    name: dom.nameInput.value.trim(),
    title: dom.titleInput.value.trim(),
    address: dom.addressInput.value || "Farsalon 153, Larissa, 41335 - Greece",
    phone: formatPhoneNumber(rawPhone),
    mobile: formatPhoneNumber(rawMobile),
    logoBase64,
  };
}

export function buildSignatureHtml() {
  return buildSignature({
    platform: SignaturePlatform.HTML_STANDARD,
    data: buildData(),
  });
}

export function previewSignature() {
  wizardRuntime.signatureHtml = buildSignatureHtml();
  window.signatureHtml = wizardRuntime.signatureHtml;

  saveState({
    ...buildData(),
    signatureHtml: wizardRuntime.signatureHtml,
  });

  dom.previewBox.innerHTML = `<div class="signature-wrapper">${wizardRuntime.signatureHtml}</div>`;
}

export function updateStep4Title(selectedPlatform) {
  const headerEl = document.getElementById("step4Title");
  if (!headerEl) return;

  const t = translations[window.currentLang] ||
    translations["en"] || { steps: {} };

  const titleKeyMap = {
    [SignaturePlatform.OUTLOOK]: "step4TitleOutlook",
    [SignaturePlatform.THUNDERBIRD]: "step4TitleThunderbird",
    [SignaturePlatform.MONDAY]: "step4TitleMonday",
  };

  const key = titleKeyMap[selectedPlatform];
  if (key && t.steps[key]) {
    headerEl.textContent = t.steps[key];
  }
}
