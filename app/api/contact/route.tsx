import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    try {
      const mainEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Ahmed Mohamed Portfolio <onboarding@resend.dev>",
          to: ["ahmednagdy165@gmail.com"],
          reply_to: [email],
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>New Contact Form Submission</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">
                    New Contact Form Submission
                  </h1>
                  <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                    Someone reached out through your portfolio
                  </p>
                </div>
                
                <!-- Contact Details -->
                <div style="padding: 30px;">
                  <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #6366f1;">
                    <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
                      Contact Details
                    </h2>
                    <div style="display: grid; gap: 12px;">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: #6366f1; font-weight: 600; min-width: 60px;">Name:</span>
                        <span style="color: #334155; font-weight: 500;">${name}</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: #6366f1; font-weight: 600; min-width: 60px;">Email:</span>
                        <a href="mailto:${email}" style="color: #6366f1; text-decoration: none; font-weight: 500;">${email}</a>
                      </div>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: #6366f1; font-weight: 600; min-width: 60px;">Subject:</span>
                        <span style="color: #334155; font-weight: 500;">${subject}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Message Content -->
                  <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                    <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                      Message
                    </h3>
                    <div style="color: #475569; line-height: 1.7; font-size: 16px; white-space: pre-wrap; background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 3px solid #6366f1;">
                      ${message}
                    </div>
                  </div>
                  
                  <!-- Quick Actions -->
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="mailto:${email}?subject=Re: ${subject}" 
                       style="display: inline-block; background: #6366f1; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);">
                      Reply to ${name}
                    </a>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="background: #f1f5f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="color: #64748b; margin: 0; font-size: 14px;">
                    Received on ${new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 12px;">
                    Sent from Ahmed Mohamed Portfolio Contact Form
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        }),
      })

      if (!mainEmailResponse.ok) {
        throw new Error("Failed to send main email")
      }

      const confirmationEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Ahmed Mohamed <onboarding@resend.dev>",
          to: [email],
          reply_to: ["ahmednagdy165@gmail.com"],
          subject: `Thank you for contacting me, ${name}!`,
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Thank you for your message</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">
                    Message Received Successfully
                  </h1>
                  <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                    Thank you for reaching out, ${name}
                  </p>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <div style="width: 80px; height: 80px; background: #10b981; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; font-weight: bold;">
                      ✓
                    </div>
                    <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">
                      Hello ${name}!
                    </h2>
                    <p style="color: #475569; font-size: 18px; line-height: 1.6; margin: 0;">
                      I have received your message and I am excited to connect with you!
                    </p>
                  </div>
                  
                  <!-- Message Summary -->
                  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
                    <h3 style="color: #166534; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">
                      Your Message Summary:
                    </h3>
                    <p style="color: #166534; margin: 0 0 8px 0;"><strong>Subject:</strong> ${subject}</p>
                    <p style="color: #166534; margin: 0;"><strong>Sent:</strong> ${new Date().toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}</p>
                  </div>
                  
                  <!-- What's Next -->
                  <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
                    <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
                      What happens next?
                    </h3>
                    <ul style="color: #475569; line-height: 1.7; font-size: 16px; margin: 0; padding-left: 20px;">
                      <li style="margin-bottom: 8px;">I will review your message carefully</li>
                      <li style="margin-bottom: 8px;">You can expect a personal response within 24-48 hours</li>
                      <li style="margin-bottom: 8px;">I will reach out to discuss your project in detail</li>
                      <li>Feel free to check out my work while you wait</li>
                    </ul>
                  </div>
                  
                  <!-- Social Links -->
                  <div style="text-align: center; margin: 30px 0;">
                    <p style="color: #64748b; margin: 0 0 16px 0; font-size: 16px;">
                      Connect with me:
                    </p>
                    <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
                      <a href="https://github.com/a-nagdy" 
                         style="display: inline-block; background: #1f2937; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px;">
                        GitHub
                      </a>
                      <a href="mailto:ahmednagdy165@gmail.com" 
                         style="display: inline-block; background: #6366f1; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px;">
                        Email
                      </a>
                    </div>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="background: #f1f5f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="color: #64748b; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">
                    Ahmed Mohamed
                  </p>
                  <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                    Full-Stack Developer specializing in React, Next.js, and Magento 2
                  </p>
                  <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 12px;">
                    Cairo, Egypt | ahmednagdy165@gmail.com
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        }),
      })

      const mainEmailData = await mainEmailResponse.json()
      console.log("Main email sent successfully:", mainEmailData)

      if (confirmationEmailResponse.ok) {
        const confirmationData = await confirmationEmailResponse.json()
        console.log("Confirmation email sent successfully:", confirmationData)
      } else {
        console.log("Confirmation email failed, but main email was sent")
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      console.log("Fallback - Contact form submission:", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json(
      {
        message:
          "Message sent successfully! Thank you for reaching out. You should receive a confirmation email shortly.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
