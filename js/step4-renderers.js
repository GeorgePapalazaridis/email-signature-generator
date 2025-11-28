import { showToast } from "./notifications.js";

/**
 * Bookmarklet creator
 */
export function makeBookmarklet(signature, t) {
  return `javascript:(function(){
    function visible(el){return !!(el && el.offsetParent !== null);}
    function findEditor(win){
      var ed = win.document.querySelector('div[role="textbox"][contenteditable="true"]');
      if (visible(ed)) return ed;
      var cands = win.document.querySelectorAll('[contenteditable="true"], div[role="textbox"]');
      for (var i=0;i<cands.length;i++){ if(visible(cands[i])) return cands[i]; }
      var ifr = win.document.querySelectorAll('iframe');
      for (var j=0;j<ifr.length;j++){
        try { var r = findEditor(ifr[j].contentWindow); if (r) return r; } catch(e){}
      }
      return null;
    }
    var editor = findEditor(window);
    if(editor){
      editor.innerHTML = ${JSON.stringify(signature)};
      alert(${JSON.stringify(t.success)});
    } else {
      alert(${JSON.stringify(t.notFound)});
    }
  })();`;
}

/**
 * Outlook
 */
export function renderOutlookStep4(signatureHtml, t) {
  const container = document.getElementById("step4Content");
  if (!container) return;

  container.innerHTML = `
<div class="step4-card">
  <div class="step4-instructions">
    <ol class="step4-list">

      <li>
        <strong>${t.outlook_step1_title}</strong>
        <div class="step4-btn-wrapper">
          <a id="bookmarkletButton" class="btn btn-info">
            ${t.bookmarkletLabel}
          </a>
        </div>
        <p class="step4-note">
          ${t.outlook_step1_note_intro}<br>
          ${t.outlook_step1_note_mac}<br>
          ${t.outlook_step1_note_win}
        </p>
      </li>

      <li>
        <strong>${t.outlook_step2_title}</strong>
        <div class="step4-btn-wrapper">
          <a href="https://outlook.office.com/" target="_blank"
            class="btn btn-info-outline">
            ${t.outlook_open_button}
          </a>
        </div>
      </li>

      <li>
        <strong>${t.outlook_step3_title}</strong>
        <p class="step4-text">${t.outlook_step3_text}</p>
      </li>

      <li>
        <strong>${t.outlook_step4_title}</strong>
        <p class="step4-text">${t.outlook_step4_text}</p>
      </li>

    </ol>
  </div>
</div>
`;

  const btn = document.getElementById("bookmarkletButton");
  if (btn) btn.href = makeBookmarklet(signatureHtml, t);
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

  <div class="step4-actions">
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

  <div class="step4-actions">
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
