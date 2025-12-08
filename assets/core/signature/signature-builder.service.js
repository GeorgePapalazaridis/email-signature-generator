import { buildOutlookSignatureWebV3 } from "./signature-outlook-web-v3.template.js";
import { buildHtmlStandardSignature } from "./signature-html-standard.template.js";
import { formatPhoneNumber } from "../../../js/utils/phone-formatter.js";
import { debug } from "../../../js/utils/debug.js";

/**
 * Primary HTML Signature builder & platform routing engine.
 * - Normalizes raw user data (phone/mobile formatting)
 * - Routes to the correct signature template based on platform
 * - Provides graceful fallbacks to ensure UI safety
 * - Extendable for additional platforms if needed
 */

export const SignaturePlatform = {
  OUTLOOK: "outlook",
  HTML_STANDARD: "html_standard",
  THUNDERBIRD: "thunderbird",
  MONDAY: "monday",
};

export function buildSignature({ platform, data }) {
  // 1️⃣ Normalize μία φορά
  const normalizedData = {
    ...data,
    phone: formatPhoneNumber(data.phone),
    mobile: formatPhoneNumber(data.mobile),
  };

  // 2️⃣ Default / fallback → standard full HTML
  if (!platform) {
    debug.warn("⚠ No platform provided → fallback to full HTML");

    return buildHtmlStandardSignature(normalizedData);
  }

  // 3️⃣ Επιλογή template ανά πλατφόρμα
  switch (platform) {
    case SignaturePlatform.OUTLOOK:
      debug.log("🖼 Using Outlook IMAGE - Web V3 template");

      return buildOutlookSignatureWebV3(normalizedData);

    case SignaturePlatform.THUNDERBIRD:
    case SignaturePlatform.MONDAY:
    case SignaturePlatform.HTML_STANDARD:
      debug.log("🧩 Using HTML Standard template");

      return buildHtmlStandardSignature(normalizedData);

    default:
      debug.error("❌ Unknown platform → fallback to Web V3 template");

      return buildOutlookSignatureWebV3(normalizedData);
  }
}
