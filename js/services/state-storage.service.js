const STORAGE_KEY = "signatureWizardState";

export function saveState(partial = {}) {
  const existing = loadState() || {};
  const updated = { ...existing, ...partial };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("⚠️ Failed to save state:", e);
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn("⚠️ Failed to load state:", e);
    return null;
  }
}

export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("⚠️ Failed to clear state:", e);
  }
}
