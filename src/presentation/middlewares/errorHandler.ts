import { CustomError } from "@/domain/errors/CustomError"
import { NextFunction, Request, Response } from "express"

export const errorHandler = (
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   if (err instanceof CustomError) {
      res.status(err.statusCode).json({
         status: "error",
         message: err.message
      })
      return
   }

   console.error("ERROR 💥", err)
   res.status(500).json({
      status: "error",
      message: "Something went wrong"
   })
}
