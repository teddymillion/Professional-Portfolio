import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function buildEmailHtml(name: string, email: string, message: string, isChallenge: boolean) {
  const accent = '#6D5EF6'
  const accentLight = '#ede9fe'
  const accentDark = '#4f46e5'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Portfolio Contact</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#1a1040;border-radius:10px;padding:10px 20px;">
                    <span style="font-size:16px;font-weight:700;color:#ffffff;letter-spacing:2px;">TM<span style="color:${accent};">.</span></span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(109,94,246,0.12);">

              <!-- Top gradient bar -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:4px;background:linear-gradient(90deg,${accent},#2DE2E6,${accent});font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Body -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:32px 32px 24px;">

                    <!-- Badge -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                      <tr>
                        <td style="background-color:${accentLight};border-radius:20px;padding:5px 14px;">
                          <span style="font-size:11px;font-weight:700;color:${accent};letter-spacing:1px;text-transform:uppercase;">
                            ${isChallenge ? '⚡ New Challenge' : '✉️ New Message'}
                          </span>
                        </td>
                      </tr>
                    </table>

                    <!-- Headline -->
                    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#0f0a2e;line-height:1.3;">
                      ${isChallenge ? `${name} challenged you` : `${name} reached out`}
                    </h1>
                    <p style="margin:0 0 24px;font-size:13px;color:#6b7280;">
                      via your portfolio contact form
                    </p>

                    <!-- Divider -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                      <tr><td style="height:1px;background-color:#e5e7eb;font-size:0;line-height:0;">&nbsp;</td></tr>
                    </table>

                    <!-- Sender info -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="background-color:#f9f8ff;border:1px solid #e0d9ff;border-radius:10px;padding:16px;">
                          <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:1.5px;text-transform:uppercase;">From</p>
                          <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#0f0a2e;">${name}</p>
                          <a href="mailto:${email}" style="font-size:13px;color:${accent};text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                    </table>

                    <!-- Message label -->
                    <p style="margin:0 0 10px;font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:1.5px;text-transform:uppercase;">
                      ${isChallenge ? 'The Challenge' : 'Message'}
                    </p>

                    <!-- Message block -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="border-left:4px solid ${accent};background-color:#f9f8ff;border-radius:0 10px 10px 0;padding:16px 18px;">
                          <p style="margin:0;font-size:14px;color:#374151;line-height:1.75;">
                            ${message.replace(/\n/g, '<br/>')}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="border-radius:10px;background-color:${accent};">
                          <a href="mailto:${email}?subject=Re: Your message to Tewodros Million"
                            style="display:inline-block;padding:13px 26px;background-color:${accent};color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.3px;">
                            Reply to ${name} &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Card footer -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#f9f8ff;border-top:1px solid #e5e7eb;padding:16px 32px;">
                    <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
                      Tewodros Million &middot; Software Engineer &amp; Builder &middot; Addis Ababa, Ethiopia
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Bottom note -->
          <tr>
            <td style="padding-top:20px;" align="center">
              <p style="margin:0;font-size:11px;color:#9ca3af;">
                Sent from your portfolio contact form
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim()
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const isChallenge = name === 'Challenge'
    const subjectLine = isChallenge
      ? `⚡ New Challenge — Portfolio`
      : `✉️ New message from ${name} — Portfolio`

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS?.replace(/\s/g, ''),
      },
    })

    await transporter.sendMail({
      from: `"TM Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: subjectLine,
      html: buildEmailHtml(name, email, message, isChallenge),
    })

    return NextResponse.json({ success: true, message: "Message sent! I'll get back to you soon." }, { status: 200 })
  } catch (error: any) {
    console.error('Contact form error:', error?.message ?? error)
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
  }
}
