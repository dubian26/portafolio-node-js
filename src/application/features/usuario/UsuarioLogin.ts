import jwt from "jsonwebtoken"
import { unitOfWork } from "../../../infrastructure/config/UnitOfWork"

export interface UsuarioLoginRequest {
   email: string
   password: string
}

export class UsuarioLogin {
   async execute(request: UsuarioLoginRequest) {
      const usuario = await unitOfWork.usuario.buscarPorEmail(request.email)

      if (!usuario || usuario.password !== request.password) {
         throw new Error("Credenciales inválidas.")
      }

      const payload = {
         email: usuario.email,
         tipoDocu: usuario.tipoDocu,
         numeDocu: usuario.numeDocu,
         nombres: usuario.nombres,
         apellidos: usuario.apellidos
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
         expiresIn: "1h",
         issuer: process.env.JWT_EMISOR
      })

      return token
   }
}
