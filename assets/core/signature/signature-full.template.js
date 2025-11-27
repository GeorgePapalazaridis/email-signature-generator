// assets/core/signature/signature-full.template.js

export function buildFullSignature({
  name,
  title,
  address,
  phone,
  mobile,
  logoBase64,
}) {
  const mobileHTML = mobile
    ? `
      <td style="white-space:nowrap; padding-right:14px; vertical-align:middle;">
        <img src="https://www.prognosis-biotech.com/apps/icons/20251008/M.png"
          alt="Mobile" width="10" height="10"
          style="display:inline-block; vertical-align:middle; margin-right:6px; border:0;">
        <a href="tel:${mobile}" style="
          font-family: Arial, sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #000 !important;
          text-decoration:none;
        ">
          ${mobile}
        </a>
      </td>
    `
    : `<td style="padding-right:14px;"></td>`;

  const signature = `
<table cellpadding="0" cellspacing="0" role="presentation" style="width:100%; font-family:Arial, sans-serif; color:#000;">
<tr><td align="center">

  <table cellpadding="0" cellspacing="0" role="presentation" width="100%" style="
    max-width:487px;
    background:#ffffff;
    border-radius:12px;
    padding:20px;
  ">
    <tr>
      <td align="center" style="
        background:#f5f5f5;
        border-radius:12px;
        padding:20px;
        font-size:16px;
      ">
        <strong style="font-size:18px;">${name}</strong> |
        <span style="font-size:15px; color:#646464;">${title}</span>
      </td>
    </tr>

    <tr><td style="height:14px; font-size:0;">&nbsp;</td></tr>

    <tr>
      <td align="center">
        <img src="${logoBase64}" width="200" style="max-width:200px; height:auto; margin-bottom:8px;" alt="ProGnosis Biotech">
        <div style="font-size:15px; line-height:1.3;">
          Food Safety & Clinical Diagnostics
        </div>
      </td>
    </tr>

    <tr><td style="border-top:1px solid #999; height:12px;"></td></tr>

    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-size:13px;">
        <tr>
          <td style="white-space:nowrap; padding-right:14px; vertical-align:middle;">
            <img src="https://www.prognosis-biotech.com/apps/icons/20251008/call.png" width="13" height="13" style="vertical-align:middle; margin-right:6px;">
            <a href="tel:${phone}" style="color:#000 !important; font-weight:500; text-decoration:none;">
              ${phone}
            </a>
          </td>

          ${mobileHTML}

          <td style="white-space:nowrap;">
            <img src="https://www.prognosis-biotech.com/apps/icons/20251008/language.png" width="14" height="14" style="vertical-align:middle; margin-right:6px;">
            <a href="https://www.prognosis-biotech.com" target="_blank" style="color:#000 !important; font-weight:600; text-decoration:none;">
              www.prognosis-biotech.com
            </a>
          </td>
        </tr>
      </table>
    </td></tr>

    <tr>
      <td style="font-size:12px; padding-top:10px;">
        <img src="https://www.prognosis-biotech.com/apps/icons/20251008/factory.png" width="15" height="15" style="vertical-align:middle; margin-right:6px;">
        ${address}
      </td>
    </tr>

    <tr><td style="text-align:right; padding-top:8px;">
      ${[
        ["linkedIn", "https://www.linkedin.com/company/prognosisbiotech"],
        ["youtube", "https://www.youtube.com/@prognosisbiotech"],
        [
          "facebook",
          "https://www.facebook.com/prognosisbiotechGR/?locale=el_GR",
        ],
        ["instagram", "https://www.instagram.com/prognosisbiotech/"],
      ]
        .map(
          ([icon, url]) => `
        <a href="${url}" target="_blank" style="display:inline-block; margin-left:14px;">
          <img src="https://www.prognosis-biotech.com/apps/icons/20251008/${icon}.png"
              width="20" height="20" style="display:block; border:0;">
        </a>
      `
        )
        .join("")}
    </td></tr>

    <tr><td style="border-top:1px solid #999; height:12px;"></td></tr>

    <tr><td style="
      font-size:10px;
      color:#8c8c8c;
      line-height:1.35;
      text-align:justify;
    ">
      <strong style="color:#8c8c8c;">DISCLAIMER:</strong>
      This email is intended solely for the recipient(s) and may contain
      confidential information. For full email disclaimer:
      <a href="https://www.prognosis-biotech.com/disclaimer" style="color:#3db3f7; text-decoration:underline;">
        https://www.prognosis-biotech.com/disclaimer
      </a>
    </td></tr>

  </table>

</td></tr>
</table>
`;

  return signature.trim();
}
