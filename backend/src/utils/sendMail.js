import nodemailer from "nodemailer";

const sendMail = async (to, subject, OTP) => {
  // Ensure OTP is a string so we can index into it (e.g., OTP[0])
  OTP = String(OTP);

  // 1. Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"InkFlow" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    text: OTP,
    html: `<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03); overflow: hidden; border: 1px solid #e2e8f0;">
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px 20px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: rgba(99, 102, 241, 0.15); padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(99, 102, 241, 0.3);">
                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 14px; font-weight: bold; color: #818cf8; letter-spacing: 1px;">INKFLOW</span>
                  </td>
                </tr>
              </table>
              <h1 style="color: #ffffff; font-size: 20px; font-weight: 500; margin: 16px 0 0 0; letter-spacing: -0.3px;">Account Verification</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 32px 30px 32px; text-align: left;">
              <p style="color: #334155; margin: 0 0 24px 0; font-size: 15px; line-height: 1.6;">
                Hello Writer,<br><br>
                A request was made to access your InkFlow CMS publisher account. To confirm your identity and proceed with the password reset, please use the secure passkey below:
              </p>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 32px auto;">
                <tr>
                  <td style="padding: 0 4px;"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td width="44" height="52" align="center" style="background-color: #f1f5f9; border-radius: 8px; font-family: monospace; font-size: 24px; font-weight: 700; color: #0f172a; border: 1px solid #cbd5e1;">${OTP[0]}</td></tr></table></td>
                  <td style="padding: 0 4px;"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td width="44" height="52" align="center" style="background-color: #f1f5f9; border-radius: 8px; font-family: monospace; font-size: 24px; font-weight: 700; color: #0f172a; border: 1px solid #cbd5e1;">${OTP[1]}</td></tr></table></td>
                  <td style="padding: 0 4px;"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td width="44" height="52" align="center" style="background-color: #f1f5f9; border-radius: 8px; font-family: monospace; font-size: 24px; font-weight: 700; color: #0f172a; border: 1px solid #cbd5e1;">${OTP[2]}</td></tr></table></td>
                  <td style="padding: 0 8px;"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td width="12" height="52" align="center" style="font-family: monospace; font-size: 20px; font-weight: bold; color: #94a3b8;">-</td></tr></table></td>
                  <td style="padding: 0 4px;"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td width="44" height="52" align="center" style="background-color: #f1f5f9; border-radius: 8px; font-family: monospace; font-size: 24px; font-weight: 700; color: #0f172a; border: 1px solid #cbd5e1;">${OTP[3]}</td></tr></table></td>
                  <td style="padding: 0 4px;"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td width="44" height="52" align="center" style="background-color: #f1f5f9; border-radius: 8px; font-family: monospace; font-size: 24px; font-weight: 700; color: #0f172a; border: 1px solid #cbd5e1;">${OTP[4]}</td></tr></table></td>
                  <td style="padding: 0 4px;"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td width="44" height="52" align="center" style="background-color: #f1f5f9; border-radius: 8px; font-family: monospace; font-size: 24px; font-weight: 700; color: #0f172a; border: 1px solid #cbd5e1;">${OTP[5]}</td></tr></table></td>
                </tr>
              </table>
              <p style="color: #64748b; margin: 24px 0 0 0; font-size: 13px; line-height: 1.5; text-align: center;">
                This verification code expires in 2 minutes.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 30px 32px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 8px; padding: 16px;">
                <tr>
                  <td>
                    <p style="color: #64748b; margin: 0; font-size: 12px; line-height: 1.5;">
                      <strong>Security Reminder:</strong> InkFlow staff will never ask for this code or your password via email, chat, or DM. If you did not request this, please review your workspace security settings.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 32px 40px 32px; background-color: #fafafa;">
              <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 0 0 24px 0;">
              <p style="color: #94a3b8; margin: 0; font-size: 11px; line-height: 1.6; letter-spacing: 0.2px;">
                &copy; 2026 InkFlow CMS Platform.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>`,
  };

  try {
    // 3. Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export default sendMail;
