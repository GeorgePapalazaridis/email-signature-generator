import { buildOutlookSignature } from "./signature-outlook.template.js";
import { buildFullSignature } from "./signature-full.template.js";

export const SignaturePlatform = {
  OUTLOOK: "outlook",
  THUNDERBIRD: "thunderbird",
  MONDAY: "monday",
};

export function buildSignature({ platform, data }) {
  if (!platform) {
    console.warn("⚠ No platform provided → fallback to Full Signature");
    return buildFullSignature(data);
  }

  switch (platform) {
    case SignaturePlatform.OUTLOOK:
      console.log("📩 Using Outlook Web Signature template");
      return buildOutlookSignature(data);

    case SignaturePlatform.THUNDERBIRD:
    case SignaturePlatform.MONDAY:
      console.log(`📨 Using Full HTML Signature template for: ${platform}`);
      return buildFullSignature(data);

    default:
      console.error("❌ Unknown platform → fallback to Full Signature");
      return buildOutlookSignature(data);
  }
}
