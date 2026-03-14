import { IEmailService } from "@/domain/interfaces/IEmailService"
import nodemailer from "nodemailer"

export class EmailService implements IEmailService {
   private transporter: nodemailer.Transporter

   constructor() {
      this.transporter = nodemailer.createTransport({
         host: "smtp.googlemail.com",
         port: 465,
         secure: true,
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
         },
         // Activamos logs detallados para ver qué pasa exactamente en Railway
         debug: true,
         logger: true,
         tls: {
            rejectUnauthorized: false,
            servername: "smtp.gmail.com"
         },
         connectionTimeout: 25000,
         greetingTimeout: 25000,
         socketTimeout: 25000,
      })
   }

   async enviarEmail(to: string, subject: string, html: string): Promise<void> {
      // Extraemos el OTP del HTML para el log de la demo
      const otpMatch = html.match(/<b>(\d{6})<\/b>/)
      const otp = otpMatch ? otpMatch[1] : "N/A"

      console.log("-----------------------------------------")
      console.log(`[DEMO MODE] Enviando email a: ${to}`)
      console.log(`[DEMO MODE] OTP: ${otp}`)
      console.log("-----------------------------------------")

      try {
         if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn("[WARN] EMAIL_USER o EMAIL_PASS no configurados. Saltando envío real.")
            return
         }

         await this.transporter.sendMail({
            from: `"Tienda Online Demo" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
         })
         console.log(`[SUCCESS] Email enviado correctamente a: ${to}`)
      } catch (error) {
         console.error("Error enviando email OTP via Nodemailer:", error)
      }
   }
}
