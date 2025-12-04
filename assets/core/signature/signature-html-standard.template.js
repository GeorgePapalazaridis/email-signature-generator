export function buildHtmlStandardSignature({
  name,
  title,
  address,
  phone,
  mobile,
  logoBase64,
}) {
  const mobileHTML = mobile
    ? `
<td style="white-space:nowrap; padding-right:18px; vertical-align:middle; min-width:130px;">
    <img src="https://www.prognosis-biotech.com/apps/icons/20251008/M.png" alt="Mobile" width="10" height="10"
        style="display:inline-block; vertical-align:middle; margin-right:6px; border:0;">
    <a href="tel:${mobile}" style="
        display:inline-flex;
        align-items:center;
        font-family:'Montserrat', Arial, Helvetica, sans-serif;
        font-size:13px; font-weight:500; color:#000 !important; text-decoration:none;
        ">
        ${mobile}
    </a>
</td>
`
    : `<td style="min-width:130px; padding-right:18px;"></td>`;

  const signature = `
<table cellpadding="0" cellspacing="0" role="presentation" style="
  width:100%;
  background:#ffffff !important;
  padding:12px;
  border-radius:12px;
  font-family:'Montserrat', Arial, Helvetica, sans-serif;
  color:#000 !important;
">
    <tr>
        <td>
            <table cellpadding="0" cellspacing="0" role="presentation" width="487" style="
                background:#ffffff !important;
                border-radius:12px;
                padding:12px;
                width:100%;
                max-width:467px;
                margin:0;
            ">
                <!-- HEADER -->
                <tr>
                    <td>
                        <table width="100%" role="presentation" style="
                            background:#f5f5f5 !important;
                            border-radius:12px;
                            padding:22px 14px;
                        ">
                            <tr>
                                <td valign="middle"
                                    style="font-weight:700; font-size:18px; color:#000 !important; width:50%; text-align:center;">
                                    ${name}
                                </td>
                                <td style="width:6px; text-align:center; color:#a0a0a0 !important; font-size:26px;">|
                                </td>
                                <td valign="middle"
                                    style="font-size:15px; color:#646464 !important; width:50%; text-align:center;">
                                    ${title}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td style="height:14px; line-height:14px; font-size:0">&nbsp;</td>
                </tr>

                <!-- LOGO + TAGLINE -->
                <tr>
                    <td>
                        <table width="100%" role="presentation" style="table-layout:fixed;">
                            <tr>
                                <td width="50%" align="center">
                                    <img src="${logoBase64}" alt="ProGnosis Biotech"
                                        style="display:block; width:200px; max-width:200px; height:auto; border:0;">
                                </td>
                                <td width="50%" align="center"
                                    style="font-size:16px; font-weight:400; color:#000 !important; line-height:1.35;">
                                    Food Safety & Clinical Diagnostics
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- DIVIDER -->
                <tr>
                    <td style="padding-top:14px; padding-bottom:8px;">
                        <div style="width:100%; border-top:1px solid #999999 !important;"></div>
                    </td>
                </tr>

                <!-- CONTACT -->
                <tr>
                    <td>
                        <table width="100%" role="presentation" style="font-size:13px; color:#000 !important;">
                            <tr>
                                <td style="white-space:nowrap; padding-right:14px; vertical-align:middle;">
                                    <img src="https://www.prognosis-biotech.com/apps/icons/20251008/call.png" width="13"
                                        height="14" style="vertical-align:middle; margin-right:6px">
                                    <a href="tel:${phone}" style="
                                        display:inline-flex;
                                        align-items:center;
                                        font-size:13px;
                                        font-weight:500;
                                        color:#000 !important;
                                        text-decoration:none;
                                    ">
                                        ${phone}
                                    </a>
                                </td>
                                ${mobileHTML}
                                <td style="white-space:nowrap; vertical-align:middle;">
                                    <img src="https://www.prognosis-biotech.com/apps/icons/20251008/language.png"
                                        width="14" height="14" style="vertical-align:-1px; margin-right:6px">
                                    <a href="https://www.prognosis-biotech.com" target="_blank"
                                        style="color:#000 !important; font-weight:600; text-decoration:none;">
                                        www.prognosis-biotech.com
                                    </a>
                                </td>
                            </tr>

                            <!-- ADDRESS -->
                            <tr>
                                <td colspan="2" style="font-size:12px; padding-top:8px; vertical-align:middle;">
                                    <img src="https://www.prognosis-biotech.com/apps/icons/20251008/factory.png"
                                        width="15" height="15" style="vertical-align:middle; margin-right:6px">
                                    ${address}
                                </td>

                                <!-- SOCIAL ICONS -->
                                <td style="text-align:right; padding-top:8px;">
                                    ${[
                                      [
                                        "linkedIn",
                                        "https://www.linkedin.com/company/prognosisbiotech",
                                      ],
                                      [
                                        "youtube",
                                        "https://www.youtube.com/@prognosisbiotech",
                                      ],
                                      [
                                        "facebook",
                                        "https://www.facebook.com/prognosisbiotechGR/?locale=el_GR",
                                      ],
                                      [
                                        "instagram",
                                        "https://www.instagram.com/prognosisbiotech/",
                                      ],
                                    ]
                                      .map(
                                        ([icon, url]) => `
                                    <a href="${url}" target="_blank" style="display:inline-block; margin-left:12px;">
                                        <img src="https://www.prognosis-biotech.com/apps/icons/20251008/${icon}.png"
                                            width="20" height="20" style="display:block; border:0;">
                                    </a>
                                    `
                                      )
                                      .join("")}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- DIVIDER BOTTOM -->
                <tr>
                    <td style="padding-top:10px; padding-bottom:10px;">
                        <div style="width:100%; border-top:1px solid #999999 !important;"></div>
                    </td>
                </tr>

                <!-- DISCLAIMER -->
                <tr>
                    <td style="
                        font-size:10px;
                        color:#b4b2b2 !important;
                        line-height:1.35;
                        text-align:justify;
    ">
                        <strong style="color:#b4b2b2 !important">DISCLAIMER:</strong>
                        This email is intended solely for the recipient(s) and may contain confidential information.
                        For our full email disclaimer, please visit:
                        <a href="https://www.prognosis-biotech.com/disclaimer"
                            style="color:#3db3f7 !important; text-decoration:underline; font-style:italic;">
                            https://www.prognosis-biotech.com/disclaimer
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
`;

  return signature.trim();
}
