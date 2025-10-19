export function buildSignature({
  name,
  title,
  address,
  phone,
  mobile,
  logoBase64,
}) {
  let mobileHTML = "";

  if (mobile) {
    mobileHTML = `
      <!-- Mobile -->
      <td style="white-space:nowrap; padding-right:18px; vertical-align:middle; min-width:130px;">
        <img src="https://www.prognosis-biotech.com/apps/icons/20251008/M.png"
            alt="Mobile" width="10" height="10"
            style="display:inline-block; vertical-align:middle; margin-right:6px; border:0;">
        <a href="tel:${mobile}"
          style="font-family:'Montserrat', Arial, Helvetica, sans-serif;
                font-size:13px; font-weight:500; color:#000; text-decoration:none;
                display:inline-block; vertical-align:middle;">
          ${mobile}
        </a>
      </td>
    `;
  } else {
    mobileHTML = `
      <!-- Empty placeholder to preserve layout -->
      <td style="min-width:130px; padding-right:18px;"> </td>
    `;
  }

  // 🧩 HTML template of signature
  const signature = `
   
  <table
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  style="
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
    color: #222;
    line-height: 1.5;
    width: 487px;
    table-layout: fixed;
  "
>
  <tr>
    <td>
      <!-- Header -->
      <table role="presentation" width="100%">
        <tr>
          <td
            style="background: #f8f8f8; border-radius: 12px; padding: 22px 14px"
          >
            <table role="presentation" width="100%">
              <tr>
                <td
                  valign="middle"
                  style="
                    font-weight: bold;
                    font-size: 18px;
                    color: #000;
                    width: 50%;
                  "
                >
                  ${name}
                </td>
                <!-- Divider -->
                <td
                  valign="middle"
                  style="
                    width: 1px;
                    background: #b3b2b2;
                    font-size: 6px;
                    line-height: 0;
                  "
                >
                  &nbsp;
                </td>
                <td
                  valign="middle"
                  style="
                    font-size: 15px;
                    color: #646464;
                    width: 52%;
                    text-align: center;
                  "
                >
                  ${title}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Spacer -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td style="height:8px; line-height:8px; font-size:0; mso-line-height-rule:exactly;">&nbsp;</td>
        </tr>
      </table>

      <!-- Logo + Tagline -->
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="border-collapse: collapse; table-layout: fixed"
      >
        <tr>
          <td
            valign="middle"
            style="padding: 4px 0; width: 50%; height: 64px; text-align: center"
          >
            <a
              href="https://www.prognosis-biotech.com"
              target="_blank"
              style="text-decoration: none"
            >
              <img
                alt="ProGnosis Biotech"
                src="${logoBase64}"
                style="
                  display: inline-block;
                  vertical-align: middle;
                  border: 0;
                  max-width: 200px;
                  height: auto;
                  margin: 0 auto;
                "
              />
            </a>
          </td>
          <td
            valign="middle"
            align="center"
            style="
              padding: 4px 0;
              width: 50%;
              height: 64px;
              text-align: center;
              word-break: break-word;
              white-space: normal;
            "
          >
            <span
              style="
                display: inline-block;
                vertical-align: middle;
                font-family: Montserrat, Arial, Helvetica, sans-serif;
                font-size: 16px;
                font-weight: 400;
                color: #000;
                line-height: 1.35;
              "
            >
              Food Safety &amp; Clinical Diagnostics
            </span>
          </td>
        </tr>
      </table>

      <!-- Divider (top of contact section) -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="text-align: center">
            <table
              role="presentation"
              width="487px"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td
                  style="
                    border-top: 1px solid #646464;
                    height: 10px;
                    line-height: 10px;
                    font-size: 0;
                    mso-line-height-rule: exactly;
                  "
                >
                  &nbsp;
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Contact + Social block -->
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="
          font-family: 'Montserrat', Arial, Helvetica, sans-serif;
          font-size: 13px;
          color: #333;
          border-collapse: collapse;
        "
      >
        <tr>
          <!-- Phone -->
          <td
            style="
              font-size: 13px;
              color: #000;
              white-space: nowrap;
              padding-right: 14px;
              vertical-align: middle;
            "
          >
            <img
              src="https://www.prognosis-biotech.com/apps/icons/20251008/call.png"
              alt="Phone"
              width="13"
              height="14"
              style="
                display: inline-block;
                vertical-align: middle;
                margin-right: 6px;
                border: 0;
              "
            />
            <a
              href="tel:${phone}"
              style="
                font-family: 'Montserrat', Arial, Helvetica, sans-serif;
                font-size: 13px;
                font-weight: 500;
                color: #000;
                text-decoration: none;
                display: inline-block;
                vertical-align: middle;
              "
            >
              ${phone}
            </a>
          </td>

          <!-- Mobile -->
          ${mobileHTML}

          <!-- Website -->
          <td
            style="
              font-size: 13px;
              color: #000;
              white-space: nowrap;
              padding-right: 14px;
              vertical-align: middle;
            "
          >
            <img
              src="https://www.prognosis-biotech.com/apps/icons/20251008/language.png"
              alt="Website"
              width="14"
              height="14"
              style="
                display: inline-block;
                vertical-align: -1.5px;
                margin-right: 6px;
                border: 0;
              "
            />
            <a
              href="https://www.prognosis-biotech.com"
              target="_blank"
              style="
                font-family: 'Montserrat', Arial, Helvetica, sans-serif;
                font-size: 13px;
                font-weight: 600;
                color: #000;
                text-decoration: none;
                display: inline-block;
                vertical-align: middle;
              "
            >
              www.prognosis-biotech.com
            </a>
          </td>
        </tr>

        <!-- Row 2: Address + Social -->
        <tr>
          <!-- Address -->
          <td
            colspan="2"
            style="
              font-size: 12px;
              color: #000;
              padding-top: 6px;
              vertical-align: middle;
              white-space: nowrap;
            "
          >
            <img
              src="https://www.prognosis-biotech.com/apps/icons/20251008/factory.png"
              alt="Address"
              width="15"
              height="15"
              style="
                display: inline-block;
                vertical-align: middle;
                margin-right: 6px;
                border: 0;
              "
            />
            <span style="display: inline-block; vertical-align: middle">
              ${address}
            </span>
          </td>

          <!-- Social icons -->
          <td
            style="
              padding-top: 6px;
              white-space: nowrap;
              text-align: right;
              vertical-align: middle;
              padding-bottom: 8px;
              padding-right: 14px;
            "
          >
            <!-- LinkedIn -->
            <a
              href="https://www.linkedin.com/company/prognosisbiotech"
              target="_blank"
              style="
                display: inline-block;
                vertical-align: middle;
                margin-left: 14px;
                text-decoration: none;
              "
            >
              <img
                src="https://www.prognosis-biotech.com/apps/icons/20251008/linkedIn.png"
                alt="LinkedIn"
                width="20"
                height="20"
                style="display: block; border: 0"
              />
            </a>
            <!-- YouTube -->
            <a
              href="https://www.youtube.com/@prognosisbiotech"
              target="_blank"
              style="
                display: inline-block;
                vertical-align: middle;
                margin-left: 14px;
                text-decoration: none;
              "
            >
              <img
                src="https://www.prognosis-biotech.com/apps/icons/20251008/youtube.png"
                alt="YouTube"
                width="20"
                height="20"
                style="display: block; border: 0"
              />
            </a>
            <!-- Facebook -->
            <a
              href="https://www.facebook.com/prognosisbiotechGR/?locale=el_GR"
              target="_blank"
              style="
                display: inline-block;
                vertical-align: middle;
                margin-left: 14px;
                text-decoration: none;
              "
            >
              <img
                src="https://www.prognosis-biotech.com/apps/icons/20251008/facebook.png"
                alt="Facebook"
                width="20"
                height="20"
                style="display: block; border: 0"
              />
            </a>
            <!-- Instagram -->
            <a
              href="https://www.instagram.com/prognosisbiotech/"
              target="_blank"
              style="
                display: inline-block;
                vertical-align: middle;
                margin-left: 14px;
                text-decoration: none;
              "
            >
              <img
                src="https://www.prognosis-biotech.com/apps/icons/20251008/instagram.png"
                alt="Instagram"
                width="20"
                height="20"
                style="display: block; border: 0"
              />
            </a>
          </td>
        </tr>
      </table>

      <!-- Divider (bottom of contact section) -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="text-align: center">
            <table
              role="presentation"
              width="487px"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td
                  style="
                    border-top: 1px solid #646464;
                    height: 10px;
                    line-height: 10px;
                    font-size: 0;
                    mso-line-height-rule: exactly;
                  "
                >
                  &nbsp;
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Disclaimer -->
      <table width="487px">
        <tr>
          <td
            style="
              font-family: 'Montserrat', Arial, 'Open Sans', sans-serif;
              font-size: 10px;
              color: #b4b2b2;
              line-height: 1.3;
              text-align: justify;
              padding-top: 4px;
            "
          >
            <span style="font-weight: 600">DISCLAIMER:</span> This email is
            intended solely for the recipient(s) and may contain confidential
            information. By reading this email, you agree to treat its contents
            as confidential. For our full email disclaimer, please visit:
            <a
              href="https://www.prognosis-biotech.com/disclaimer"
              target="_blank"
              style="
                color: #3db3f7;
                text-decoration: underline;
                font-style: italic;
              "
              >https://www.prognosis-biotech.com/disclaimer</a
            >
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;

  return signature.trim();
}
