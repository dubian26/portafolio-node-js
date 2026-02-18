import { CustomError } from "@/domain/errors/CustomError"
import { UserInfo } from "@/domain/models/UserInfo"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

// Extendemos la interfaz Request para incluir el usuario decodificado
export interface AuthenticatedRequest extends Request {
   user?: UserInfo
}

export const authorizeHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
   const authHeader = req.headers.authorization

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new CustomError("No autorizado. Token inexistente.", 401)
   }

   const token = authHeader.split(" ")[1]

   try {
      const jwtSecret = process.env.JWT_SECRET || ""
      const decoded = jwt.verify(token, jwtSecret) as UserInfo
      req.user = decoded
      next()
   } catch (error) {
      throw new CustomError("Token inválido o expirado.", 401)
   }
}
