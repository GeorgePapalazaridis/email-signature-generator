import { dom } from "./wizard.dom.js";
import {
  showStep,
  step1IsValid,
  updateToStep2State,
  nothingChangedFromDefaults,
  updateClearButtonState,
  buildData,
  buildSignatureHtml,
  previewSignature,
  updateStep4Title,
} from "./wizard.core.js";
import { wizardRuntime } from "./wizard.runtime.js";
import { translations } from "../translations/translations.data.js";
import { showToast, showThankYouPopup } from "../notifications.js";
import {
  renderOutlookStep4_WebCopyPaste,
  renderThunderbirdStep4,
  renderMondayStep4,
} from "../step4-renderers.js";
import {
  buildSignature,
  SignaturePlatform,
} from "../../assets/core/signature/signature-builder.service.js";
import { saveState, clearState } from "../services/state-storage.service.js";
import { debug } from "../utils/debug.js";

export function initWizardSteps() {
  // ==========================
  // Step 1 → Step 2 (Preview)
  // ==========================
  [
    dom.nameInput,
    dom.titleInput,
    dom.addressInput,
    dom.mobileInput,
    dom.phoneInput,
  ].forEach((el) =>
    el?.addEventListener("input", () => {
      updateToStep2State();
      updateClearButtonState();

      if (!nothingChangedFromDefaults()) {
        saveState({ ...buildData() });
      }
    })
  );

  document.addEventListener("DOMContentLoaded", updateToStep2State);

  dom.clearBtn?.addEventListener("click", () => {
    clearState();
    document.getElementById("signatureForm").reset();

    dom.addressInput.value = "Farsalon 153, Larissa, 41335 - Greece";
    dom.phoneInput.value = "+30 2410 623 922";

    saveState({ currentStep: 1 });

    wizardRuntime.signatureHtml = "";
    wizardRuntime.selectedPlatform = null;

    updateToStep2State();
    updateClearButtonState();
    showStep(dom.step1);

    debug.log("🧹 Wizard form cleared");
  });

  dom.toStep2Btn?.addEventListener("click", () => {
    if (!step1IsValid()) {
      const t = translations[window.currentLang] || translations["en"];
      showToast(t.form.alertMissing, "error");
      return;
    }

    previewSignature();
    saveState({
      signatureHtml: wizardRuntime.signatureHtml,
      currentStep: 2,
    });
    showStep(dom.step2);
  });

  dom.backToStep1Btn?.addEventListener("click", () => {
    saveState({ currentStep: 1 });
    showStep(dom.step1);
  });

  // ==========================
  // Step 2 → Step 3 (Platform)
  // ==========================
  dom.toStep3Btn?.addEventListener("click", () => {
    if (!wizardRuntime.signatureHtml) {
      wizardRuntime.signatureHtml = buildSignatureHtml();
    }

    wizardRuntime.selectedPlatform = SignaturePlatform.OUTLOOK;

    dom.platformCards.forEach((c) => c.classList.remove("selected"));
    document
      .querySelector('[data-platform="outlook"]')
      ?.classList.add("selected");

    saveState({
      selectedPlatform: wizardRuntime.selectedPlatform,
      currentStep: 3,
    });

    dom.toStep4Btn.disabled = false;
    showStep(dom.step3);
  });

  dom.backToStep2Btn?.addEventListener("click", () => {
    saveState({ currentStep: 2 });
    showStep(dom.step2);
  });

  // ==========================
  // Platform Selection
  // ==========================
  dom.platformCards.forEach((card) => {
    card.addEventListener("click", () => {
      dom.platformCards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");

      wizardRuntime.selectedPlatform = card.dataset.platform;
      saveState({
        selectedPlatform: wizardRuntime.selectedPlatform,
        currentStep: 3,
      });

      dom.toStep4Btn.disabled = false;
    });
  });

  // ==========================
  // Step 3 → Step 4
  // ==========================
  dom.toStep4Btn?.addEventListener("click", () => {
    if (!wizardRuntime.selectedPlatform) return;

    wizardRuntime.signatureHtml = buildSignature({
      platform: wizardRuntime.selectedPlatform,
      data: buildData(),
    });

    saveState({
      signatureHtml: wizardRuntime.signatureHtml,
      selectedPlatform: wizardRuntime.selectedPlatform,
      currentStep: 4,
    });

    showStep(dom.step4);
    updateStep4Title(wizardRuntime.selectedPlatform);

    const t = translations[window.currentLang];

    if (wizardRuntime.selectedPlatform === SignaturePlatform.OUTLOOK) {
      renderOutlookStep4_WebCopyPaste(wizardRuntime.signatureHtml, t);
    } else if (
      wizardRuntime.selectedPlatform === SignaturePlatform.THUNDERBIRD
    ) {
      renderThunderbirdStep4(wizardRuntime.signatureHtml, t);
    } else if (wizardRuntime.selectedPlatform === SignaturePlatform.MONDAY) {
      renderMondayStep4(wizardRuntime.signatureHtml, t);
    }
  });

  dom.backToStep3Btn?.addEventListener("click", () => {
    saveState({ currentStep: 3 });
    dom.step4Container.innerHTML = "";
    wizardRuntime.selectedPlatform = null;
    dom.toStep4Btn.disabled = true;
    showStep(dom.step3);
  });

  // ==========================
  // Finish / Reset flow
  // ==========================
  dom.finishBtn?.addEventListener("click", resetWizard);

  function resetWizard() {
    wizardRuntime.selectedPlatform = null;
    wizardRuntime.signatureHtml = "";

    document.getElementById("signatureForm").reset();
    dom.addressInput.value = "Farsalon 153, Larissa, 41335 - Greece";
    dom.phoneInput.value = "+30 2410 623 922";

    updateToStep2State();
    updateClearButtonState();

    dom.platformCards.forEach((c) => c.classList.remove("selected"));
    dom.toStep4Btn.disabled = true;
    dom.step4Container.innerHTML = "";

    clearState();
    saveState({ currentStep: 1 });

    showStep(dom.step1);
    showThankYouPopup();

    debug.log("🧹 Wizard fully reset");
  }

  // ==========================
  // Translation Change Handling (Step 4)
  // ==========================
  document.addEventListener("language-changed", () => {
    const step4Visible =
      dom.step4 &&
      dom.step4.style.display !== "none" &&
      wizardRuntime.selectedPlatform;

    if (!step4Visible) return;

    updateStep4Title(wizardRuntime.selectedPlatform);

    const t = translations[window.currentLang];
    wizardRuntime.signatureHtml = buildSignature({
      platform: wizardRuntime.selectedPlatform,
      data: buildData(),
    });

    if (wizardRuntime.selectedPlatform === SignaturePlatform.OUTLOOK) {
      renderOutlookStep4_WebCopyPaste(wizardRuntime.signatureHtml, t);
    } else if (
      wizardRuntime.selectedPlatform === SignaturePlatform.THUNDERBIRD
    ) {
      renderThunderbirdStep4(wizardRuntime.signatureHtml, t);
    } else if (wizardRuntime.selectedPlatform === SignaturePlatform.MONDAY) {
      renderMondayStep4(wizardRuntime.signatureHtml, t);
    }
  });
}
