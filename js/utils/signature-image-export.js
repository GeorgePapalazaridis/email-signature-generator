/**
 * HTML Signature ➜ PNG Export (optimized for Outlook)
 */
export async function exportSignaturePng({
  html,
  fileName = "prognosis-signature.png",
}) {
  if (!window.html2canvas) {
    throw new Error("html2canvas is not loaded");
  }

  // Off-screen render container
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-99999px";
  wrapper.style.top = "0";
  wrapper.style.zIndex = "-1";
  wrapper.style.background = "#ffffff";
  wrapper.style.padding = "16px";
  wrapper.style.width = "max-content";
  wrapper.style.maxWidth = "650px";
  wrapper.style.boxSizing = "border-box";
  wrapper.innerHTML = html;

  document.body.appendChild(wrapper);

  const scale = window.devicePixelRatio > 1 ? 2 : 1;

  const canvas = await window.html2canvas(wrapper, {
    backgroundColor: "#ffffff",
    scale,
    useCORS: true,
    logging: false,
  });

  const dataUrl = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => wrapper.remove(), 50);

  return dataUrl;
}
