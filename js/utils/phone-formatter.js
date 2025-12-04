export function formatPhoneNumber(input) {
  if (!input) return "";

  let cleaned = input.replace(/[^\d+]/g, "");

  // International format → keep it (e.g. +351, +44, +49 ...)
  if (cleaned.startsWith("+") && !cleaned.startsWith("+30")) {
    return cleaned;
  }

  // Greece with +30
  if (cleaned.startsWith("+30")) {
    cleaned = cleaned.replace("+30", "");
  }

  // Greece mobile or landline
  if (/^69\d{8}$/.test(cleaned)) {
    return `+30 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
      6
    )}`;
  }

  if (/^2\d{9}$/.test(cleaned)) {
    return `+30 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
      6
    )}`;
  }

  // Unknown format → best effort or leave raw
  return cleaned;
}
