export function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

export function setPlaceholder(id, value) {
  const el = document.getElementById(id);
  if (el) el.placeholder = value;
}
