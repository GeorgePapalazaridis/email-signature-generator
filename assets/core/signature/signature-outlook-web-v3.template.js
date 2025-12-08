import { callIcon } from "../../base64/icons/call.js";
import { mobileIcon } from "../../base64/icons/mobile.js";
import { wwwIcon } from "../../base64/icons/www.js";
import { factoryIcon } from "../../base64/icons/factory.js";
import { instagramIcon } from "../../base64/icons/instagram.js";
import { facebookIcon } from "../../base64/icons/facebook.js";
import { youtubeIcon } from "../../base64/icons/youtube.js";
import { linkedInIcon } from "../../base64/icons/linkedIn.js";

/**
 * Outlook Web-safe template (V3)
 * - All assets inline Base64
 * - Pure table layout for email client safety
 * - Designed to survive Outlook Web paste sanitizer
 * - Used for: Preview → Copy → Outlook Signature Editor
 */

export function buildOutlookSignatureWebV3({
  name,
  title,
  address,
  phone,
  mobile,
  logoBase64,
  formatPhoneNumber = (x) => x,
}) {
  const safePhone = formatPhoneNumber(phone);
  const safeMobile = formatPhoneNumber(mobile);

  const mobileHTML = safeMobile
    ? `
      <td style="white-space:nowrap; padding-right:18px; vertical-align:middle;">
        <a href="tel:${safeMobile}" style="
            display:inline-flex;
            align-items:center;
            font-size:13px;
            font-weight:500;
            color:#000;
            text-decoration:none;
          ">
          <img src="${mobileIcon}" width="10" height="10"
            style="vertical-align:middle; margin-right:6px; border:0;">
          ${safeMobile}
        </a>
      </td>`
    : `<td style="padding-right:18px;"></td>`;

  return `
<table cellpadding="0" cellspacing="0" role="presentation" style="
  width:100%;
  max-width:467px;
  font-family:Montserrat, Arial, Helvetica, sans-serif;
  color:#000 !important;
">

  <!-- HEADER -->
  <tr>
    <td style="background:#f4f4f4; border-radius:16px; text-align:center; padding:22px;">
      <table role="presentation" width="100%">
        <tr>
          <td style="font-weight:700; font-size:18px; width:50%; color:#000;">
            ${name}
          </td>
          <td style="width:6px; color:#a0a0a0; font-size:26px;">|</td>
          <td style="font-size:15px; width:50%; color:#646464;">
            ${title}
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr><td style="height:14px"></td></tr>

  <!-- LOGO + TAGLINE -->
  <tr>
    <td>
      <table width="100%">
        <tr>
          <td align="center" width="50%">
            <a href="https://www.prognosis-biotech.com" target="_blank" rel="noopener noreferrer"
                style="display:inline-block; text-decoration:none; border:0;">
              <img src="${logoBase64}" width="230"
                style="display:block; height:auto; border:0; border-radius:12px;">
            </a>
          </td>
          <td align="center" width="45%" style="font-size:16px; line-height:1.4; color:#000;">
            Food Safety & Clinical Diagnostics
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr><td style="border-top:1px solid #c8c8c8; padding-top:10px;"></td></tr>

  <!-- CONTACT -->
  <tr>
    <td>
      <table width="100%" style="font-size:13px; color:#000;">
        <tr>
          <td style="white-space:nowrap; padding-right:18px; vertical-align:middle;">
            <a href="tel:${safePhone}" style="
                display:inline-flex;
                align-items:center;
                font-size:13px;
                font-weight:500;
                color:#000;
                text-decoration:none;
              ">
              <img src="${callIcon}" width="14" height="15"
                style="vertical-align:middle; margin-right:6px; border:0;">
              ${safePhone}
            </a>
          </td>

          ${mobileHTML}

          <td style="white-space:nowrap;">
            <img src="${wwwIcon}" width="14" height="14"
              style="vertical-align:middle; margin-right:6px;">
            <a href="https://www.prognosis-biotech.com"
              style="font-weight:600; color:#000; text-decoration:none;">
              www.prognosis-biotech.com
            </a>
          </td>
        </tr>

        <!-- ADDRESS + SOCIAL -->
        <tr>
          <td colspan="2" style="font-size:12px; padding-top:8px;">
            <img src="${factoryIcon}" width="15" height="15"
              style="vertical-align:middle; margin-right:6px;">
            ${address}
          </td>

          <td style="text-align:right; padding-top:8px;">
            <a href="https://www.linkedin.com/company/prognosisbiotech"
               style="margin-left:12px; text-decoration:none; display:inline-block; border:0;">
              <img src="${linkedInIcon}" width="20" height="20" style="display:block; border:0;">
            </a>
          
            <a href="https://www.youtube.com/@prognosisbiotech"
               style="margin-left:12px; text-decoration:none; display:inline-block; border:0;">
              <img src="${youtubeIcon}" width="20" height="20" style="display:block; border:0;">
            </a>
          
            <a href="https://www.facebook.com/prognosisbiotechGR/?locale=el_GR"
               style="margin-left:12px; text-decoration:none; display:inline-block; border:0;">
              <img src="${facebookIcon}" width="20" height="20" style="display:block; border:0;">
            </a>
          
            <a href="https://www.instagram.com/prognosisbiotech/"
               style="margin-left:12px; text-decoration:none; display:inline-block; border:0;">
              <img src="${instagramIcon}" width="20" height="20" style="display:block; border:0;">
            </a>
          </td>

        </tr>
      </table>
    </td>
  </tr>

  <tr><td style="border-top:1px solid #c8c8c8; padding-top:10px;"></td></tr>

  <!-- DISCLAIMER -->
  <tr>
    <td style="font-size:10px; color:#7d7d7d; line-height:1.5; text-align:justify; word-spacing:1px;">
      <strong>DISCLAIMER:</strong>
       This email is intended solely for the recipient(s) and may contain
        confidential information. By reading this email, you agree to treat
        its contents as confidential. For our full email disclaimer, please
        visit: 
      <a href="https://www.prognosis-biotech.com/disclaimer"
        style="color:#3db3f7; text-decoration:underline;">
        https://www.prognosis-biotech.com/disclaimer
      </a>
    </td>
  </tr>

</table>
  `.trim();
}
