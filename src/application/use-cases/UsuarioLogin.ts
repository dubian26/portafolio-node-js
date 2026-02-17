import jwt from "jsonwebtoken"
import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository"

export interface UsuarioLoginRequest {
   email: string
   password: string
}

export class UsuarioLogin {
   constructor(private usuarioRepository: IUsuarioRepository) { }

   async execute(request: UsuarioLoginRequest) {
      const usuario = await this.usuarioRepository.buscarPorEmail(request.email)

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
