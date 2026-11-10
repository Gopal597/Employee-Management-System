const transpoter = require("../config/emailconfig");
const Otp = require("../models/otpmodel");
async function VerifiedMail(req, admin) {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const OtpData = new Otp({
    adminId: admin._id,
    otp: otp,
  });
  await OtpData.save();
  console.log("otp:", OtpData);
  await transpoter.sendMail({
    from: process.env.EMAIL_FROM,
    to: admin.email,
    subject: "Otp verify your account",
    html: ` <center>
<div style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,.1);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#2563eb;padding:35px;">
              <h1 style="margin:0;color:#ffffff;font-size:30px;">
                Email Verification
              </h1>
              <p style="margin-top:8px;color:#dbeafe;font-size:15px;">
                Secure your account
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <h2 style="margin:0;color:#222;">
                Hello ${admin.name},
              </h2>

              <p style="font-size:16px;color:#555;line-height:28px;margin-top:20px;">
                Thank you for registering with us.
                Use the verification code below to complete your email verification.
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:35px 0;">
                <tr>
                  <td align="center">
                    <div style="
                      display:inline-block;
                      background:#eff6ff;
                      border:2px dashed #2563eb;
                      border-radius:10px;
                      padding:20px 45px;
                    ">
                      <div style="font-size:14px;color:#555;">
                        Your OTP Code
                      </div>

                      <div style="
                        font-size:40px;
                        font-weight:bold;
                        letter-spacing:8px;
                        color:#2563eb;
                        margin-top:10px;
                      ">
                        ${otp}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="font-size:15px;color:#555;line-height:28px;">
                This verification code is valid for
                <strong style="color:#dc2626;">10 minutes</strong>.
              </p>

              <!-- Security Notice -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:25px;background:#fff8e6;border-left:5px solid #f59e0b;border-radius:6px;">
                <tr>
                  <td style="padding:18px;">
                    <p style="margin:0;font-size:15px;color:#555;line-height:24px;">
                      <strong>🔒 Security Notice</strong><br>
                      Never share this OTP with anyone. Our support team will never ask for your verification code.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin-top:30px;font-size:15px;color:#666;line-height:26px;">
                If you didn't request this verification, you can safely ignore this email.
              </p>

              <hr style="border:none;border-top:1px solid #eee;margin:35px 0;">

              <p style="margin:0;font-size:15px;color:#555;">
                Regards,<br>
                <strong>Webskitters Academy</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f9fafb;padding:25px;border-top:1px solid #eee;">

              <p style="margin:0;font-size:14px;color:#888;">
                © ${new Date().getFullYear()} Your Company Name. All Rights Reserved.
              </p>

              <p style="margin-top:10px;font-size:13px;color:#999;">
                This is an automated email. Please do not reply.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</div>
 </center>`,
  });
  return otp;
}

module.exports = VerifiedMail;
