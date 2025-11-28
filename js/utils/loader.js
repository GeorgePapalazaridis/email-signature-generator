function showLoader() {
  const el = document.getElementById("loader");
  if (el) el.classList.remove("hidden");
}

function hideLoader() {
  const el = document.getElementById("loader");
  if (el) el.classList.add("hidden");
}

window.showLoader = showLoader;
window.hideLoader = hideLoader;
