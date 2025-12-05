import { dom } from "./wizard.dom.js";
import { showStep } from "./wizard.core.js";
import { wizardRuntime } from "./wizard.runtime.js";
import {
  saveState,
  clearState as storageClear,
} from "../services/state-storage.service.js";
import { debug } from "../utils/debug.js";

export function restoreWizardState(saved) {
  if (!saved) return;

  // Restore form fields
  dom.nameInput.value = saved.name || "";
  dom.titleInput.value = saved.title || "";
  dom.addressInput.value =
    saved.address || "Farsalon 153, Larissa, 41335 - Greece";
  dom.mobileInput.value = saved.mobile || "";
  dom.phoneInput.value = saved.phone || "+30 2410 623 922";

  // Restore signature preview
  if (saved.signatureHtml) {
    wizardRuntime.signatureHtml = saved.signatureHtml;
    dom.previewBox.innerHTML = `<div class="signature-wrapper">${saved.signatureHtml}</div>`;
  }

  // Restore platform
  wizardRuntime.selectedPlatform = saved.selectedPlatform || null;
  if (saved.selectedPlatform) {
    dom.platformCards.forEach((c) => c.classList.remove("selected"));
    document
      .querySelector(`[data-platform="${saved.selectedPlatform}"]`)
      ?.classList.add("selected");
  }

  // Restore step (with corrections)
  let step = saved.currentStep || 1;
  if (step < 1 || step > 4) step = 1;
  if (step === 4 && !saved.selectedPlatform) step = 3;

  const steps = [dom.step1, dom.step2, dom.step3, dom.step4];
  showStep(steps[step - 1]);

  debug.log("✨ Wizard restored");
}

// Single source of truth for updates
export function setState(partial) {
  saveState(partial);
}

// Reset using the service
export function clearWizardState() {
  storageClear();
}
