import { buildOutlookSignatureNew } from "./signature-outlook-image.template.js";
import { buildOutlookSignatureLegacy } from "./signature-outlook-legacy.template.js";
import { buildHtmlStandardSignature } from "./signature-html-standard.template.js";
import { formatPhoneNumber } from "../../../../js/utils/phone-formatter.js";

export const SignaturePlatform = {
  OUTLOOK_IMAGE: "outlook_image",
  OUTLOOK_LEGACY: "outlook_legacy",
  THUNDERBIRD: "thunderbird",
  MONDAY: "monday",
  HTML_STANDARD: "html_standard",
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
    console.warn("⚠ No platform provided → fallback to Full Signature");
    return buildHtmlStandardSignature(normalizedData);
  }

  // 3️⃣ Επιλογή template ανά πλατφόρμα
  switch (platform) {
    case SignaturePlatform.OUTLOOK_IMAGE:
      console.log("🖼 Using Outlook IMAGE Signature template");
      return buildOutlookSignatureNew(normalizedData);

    case SignaturePlatform.OUTLOOK_LEGACY:
      console.log("🧩 Using Outlook LEGACY HTML Bookmarklet template");
      return buildOutlookSignatureLegacy(normalizedData);

    case SignaturePlatform.THUNDERBIRD:
    case SignaturePlatform.MONDAY:
    case SignaturePlatform.HTML_STANDARD:
      console.log("🧩 Using HTML STANDARD Signature template");
      return buildHtmlStandardSignature(normalizedData);

    default:
      console.error("❌ Unknown platform → fallback to Outlook IMAGE");
      return buildOutlookSignatureNew(normalizedData);
  }
}
