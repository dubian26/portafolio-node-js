export class CustomError extends Error {
   readonly statusCode: number
   public details?: any

   constructor(message: string, statusCode: number) {
      super(message)
      this.statusCode = statusCode
      Error.captureStackTrace(this, this.constructor)
   }

   public addDetails(details: any) {
      this.details = details
   }
}
