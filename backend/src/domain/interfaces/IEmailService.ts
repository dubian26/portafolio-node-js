export interface IEmailService {
   enviarEmail(to: string, subject: string, html: string): Promise<void>
}
