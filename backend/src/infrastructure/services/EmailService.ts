import { IEmailService } from "@/domain/interfaces/IEmailService"
import { Resend } from "resend"

export class EmailService implements IEmailService {
   private resend: Resend

   constructor() {
      // By default initializes with RESEND_API_KEY environment variable if no string is provided.
      // Or you can explicitly pass process.env.RESEND_API_KEY if desired.
      this.resend = new Resend(process.env.RESEND_API_KEY || "re_dummy") 
   }

   async enviarEmail(to: string, subject: string, html: string): Promise<void> {
      try {
         await this.resend.emails.send({
            from: "Acme <onboarding@resend.dev>", // Replace with your verified domain
            to: [to],
            subject: subject,
            html: html
         })
      } catch (error) {
         console.error("Error enviando email OTP", error)
      }
   }
}
