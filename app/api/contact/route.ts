import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function buildEmailHtml(name: string, email: string, message: string, isChallenge: boolean) {
  const label = isChallenge ? 'Challenge' : 'Message'
  const accentColor = '#6D5EF6'
  const bgDark = '#070A12'
  const bgCard = '#0B0F1A'
  const borderColor = '#1a1f35'
  const textPrimary = '#f0f0f5'
  const textSecondary = '#8b8fa8'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New ${label} — Portfolio</title>
</head>
<body style="margin:0;padding:0;background-color:${bgDark};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${bgDark};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:24px;" align="center">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#6D5EF6,#4f46e5);border-radius:12px;padding:1px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:${bgDark};border-radius:11px;padding:10px 20px;">
                          <span style="font-size:16px;font-weight:700;color:${textPrimary};letter-spacing:0.05em;">TM<span style="color:${accentColor};">.</span></span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:${bgCard};border-radius:16px;border:1px solid ${borderColor};overflow:hidden;">

              <!-- Top accent bar -->
              <tr>
                <td style="height:3px;background:linear-gradient(90deg,#6D5EF6,#2DE2E6,#6D5EF6);"></td>
              </tr>

              <!-- Card body -->
              <tr>
                <td style="padding:32px;">

                  <!-- Badge -->
                  <table cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                    <tr>
                      <td style="background:rgba(109,94,246,0.15);border:1px solid rgba(109,94,246,0.3);border-radius:20px;padding:4px 12px;">
                        <span style="font-size:11px;font-weight:600;color:${accentColor};letter-spacing:0.12em;text-transform:uppercase;">
                          ${isChallenge ? '⚡ New Challenge' : '✉️ New Message'}
                        </span>
                      </td>
                    </tr>
                  </table>

                  <!-- Title -->
                  <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:${textPrimary};line-height:1.3;">
                    ${isChallenge ? `${name} challenged you` : `${name} reached out`}
                  </h1>
                  <p style="margin:0 0 28px;font-size:13px;color:${textSecondary};">
                    via your portfolio at tewodrosmillion.dev
                  </p>

                  <!-- Divider -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                    <tr><td style="height:1px;background:${borderColor};"></td></tr>
                  </table>

                  <!-- Sender info -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                    <tr>
                      <td style="padding:16px;background:rgba(255,255,255,0.03);border:1px solid ${borderColor};border-radius:10px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding-bottom:10px;">
                              <span style="font-size:10px;font-weight:600;color:${textSecondary};letter-spacing:0.15em;text-transform:uppercase;">From</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span style="font-size:15px;font-weight:600;color:${textPrimary};">${name}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top:4px;">
                              <a href="mailto:${email}" style="font-size:13px;color:${accentColor};text-decoration:none;">${email}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Message -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                    <tr>
                      <td>
                        <p style="margin:0 0 10px;font-size:10px;font-weight:600;color:${textSecondary};letter-spacing:0.15em;text-transform:uppercase;">
                          ${isChallenge ? 'The Challenge' : 'Message'}
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="border-left:3px solid ${accentColor};padding:14px 16px;background:rgba(109,94,246,0.06);border-radius:0 8px 8px 0;">
                              <p style="margin:0;font-size:14px;color:${textPrimary};line-height:1.7;">
                                ${message.replace(/\n/g, '<br/>')}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- CTA -->
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:linear-gradient(135deg,#6D5EF6,#4f46e5);border-radius:10px;padding:1px;">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="border-radius:9px;overflow:hidden;">
                              <a href="mailto:${email}?subject=Re: Your message to Tewodros Million"
                                style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#6D5EF6,#4f46e5);color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;border-radius:9px;">
                                Reply to ${name} →
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;" align="center">
              <p style="margin:0;font-size:11px;color:rgba(139,143,168,0.5);">
                Tewodros Million · Software Engineer & Builder · Addis Ababa, Ethiopia
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:rgba(139,143,168,0.3);">
                This email was sent from your portfolio contact form.
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
      ? `⚡ New Challenge from your portfolio`
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
