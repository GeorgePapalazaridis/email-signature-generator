import { showToast } from "./notifications.js";

/**
 * Outlook — Web Copy/Paste Flow (Select + Copy Signature HTML)
 */
export function renderOutlookStep4_WebCopyPaste(signatureHtml, t) {
  const container = document.getElementById("step4Content");
  if (!container) return;

  container.innerHTML = `
<div class="step4-card outlook-layout">

  <!-- Step 1 -->
  <div class="step4-instructions">
    <ol class="step4-list">
      <li>${t.outlook_step1}</li>
    </ol>
  </div>

  <div class="signature-preview-label">${t.preview_label}</div>
  <div class="signature-preview-block">
    <div id="signaturePreview" class="signature-wrapper">
      ${signatureHtml}
    </div>
  </div>

  <div class="step4-actions-inner-btns">
    <button id="copyOutlookBtn" class="btn btn-info">
      ${t.copy_signature_btn_label}
    </button>
  </div>

  <div class="step4-instructions">
    <ol class="step4-list" start="2">
      <li>${t.outlook_step2}</li>
    </ol>
  </div>

  <div class="step4-actions-inner-btns">
    <a href="https://outlook.office.com/mail/options/accounts-category/signatures-subcategory"
       target="_blank"
       class="btn btn-info-outline">
      ${t.open_outlook_web_btn_label}
    </a>
  </div>

  <div class="step4-instructions">
    <ol class="step4-list" start="3">
      <li>${t.outlook_step3}</li>
    </ol>
  </div>

</div>
  `;

  bindOutlookCopy(signatureHtml, t);
}

function bindOutlookCopy(signatureHtml, t) {
  const previewEl = document.getElementById("signaturePreview");
  const copyBtn = document.getElementById("copyOutlookBtn");

  if (!copyBtn || !previewEl) return;

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([previewEl.innerHTML], { type: "text/html" }),
        }),
      ]);

      showToast(t.toast_copied_success, "success");
    } catch {
      document.execCommand("copy");
      showToast(t.toast_copy_fallback, "info");
    }
  });
}

/**
 * Thunderbird
 */
export function renderThunderbirdStep4(signatureHtml, t) {
  const container = document.getElementById("step4Content");
  if (!container) return;

  const steps = [
    t.th_step1,
    t.th_step2,
    t.th_step3,
    t.th_step4,
    t.th_step5,
    t.th_step6,
  ]
    .map((step) => `<li>${step}</li>`)
    .join("");

  container.innerHTML = `
<div class="step4-card">
  <div class="step4-instructions">
    <ol class="step4-list">
      ${steps}
    </ol>
  </div>

  <div class="step4-actions-inner-btns">
    <button id="downloadThunderbirdBtn" class="btn btn-info">
      ${t.download_button_label}
    </button>
  </div>
</div>
`;

  document
    .getElementById("downloadThunderbirdBtn")
    ?.addEventListener("click", () => {
      downloadHtmlFile(signatureHtml, "prognosis-signature-thunderbird.html");
      showToast(t.download_success, "success");
    });
}

/**
 * Monday Modal
 */
export function openMondayClipboardModal(signatureHtml, t) {
  const modal = document.getElementById("mondayClipboardModal");
  const codeEl = document.getElementById("mondayClipboardCode");

  const titleEl = document.getElementById("mondayClipboardTitle");
  const descEl = document.getElementById("mondayClipboardDesc");
  const copyBtn = document.getElementById("mondayClipboardCopyBtn");
  const closeBtn = document.getElementById("mondayClipboardCloseBtn");

  if (!modal || !codeEl || !copyBtn || !closeBtn) return;

  titleEl.textContent = t.monday_modal_title;
  descEl.textContent = t.monday_modal_description;
  copyBtn.textContent = t.monday_modal_copy_btn;

  codeEl.value = signatureHtml.trim();

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");

  const handleClose = () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    closeBtn.removeEventListener("click", handleClose);
    modal.removeEventListener("click", handleBackdropClick);
    document.removeEventListener("keydown", handleEsc);
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(signatureHtml);
    showToast(
      ok ? t.monday_copy_success : "Error copying!",
      ok ? "success" : "error"
    );
  };

  const handleBackdropClick = (e) => e.target === modal && handleClose();
  const handleEsc = (e) => e.key === "Escape" && handleClose();

  copyBtn.addEventListener("click", handleCopy);
  closeBtn.addEventListener("click", handleClose);
  modal.addEventListener("click", handleBackdropClick);
  document.addEventListener("keydown", handleEsc);
}

/**
 * Monday
 */
export function renderMondayStep4(signatureHtml, t) {
  const container = document.getElementById("step4Content");
  if (!container) return;

  container.innerHTML = `
<div class="step4-card">
  <div class="step4-instructions">
    <h4 class="step4-subtitle">${t.monday_step_title}</h4>
    <p class="step4-text">${t.monday_step_instructions}</p>

    <ol class="step4-list">
      <li>${t.monday_step_note1}</li>
      <li>${t.monday_step_note2}</li>
      <li>${t.monday_step_note3}</li>
    </ol>
  </div>

  <div class="step4-actions-inner-btns">
    <button id="copyMondayBtn" class="btn btn-info">
      ${t.monday_copy_btn_label}
    </button>
  </div>
</div>
`;

  document
    .getElementById("copyMondayBtn")
    ?.addEventListener("click", () =>
      openMondayClipboardModal(signatureHtml, t)
    );
}

toStep4Btn.addEventListener("click", () => {
  if (!selectedPlatform) return;
  const t = translations[window.currentLang];

  signatureHtml = buildSignature({
    platform: selectedPlatform,
    data: buildData(),
  });

  showStep(step4);

  if (selectedPlatform === SignaturePlatform.OUTLOOK) {
    renderOutlookStep4_WebCopyPaste(signatureHtml, t);
  } else if (selectedPlatform === SignaturePlatform.THUNDERBIRD) {
    renderThunderbirdStep4(signatureHtml, t);
  } else if (selectedPlatform === SignaturePlatform.MONDAY) {
    renderMondayStep4(signatureHtml, t);
  }
});

/**
 * Helpers
 */
function downloadHtmlFile(html, filename = "prognosis-signature.html") {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
