import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"
import { UserInfo } from "@/domain/models/UserInfo"
import jwt from "jsonwebtoken"

export interface Props {
   email: string
   password: string
}

export class UsuarioLogin {
   async execute(request: Props) {
      const usuario = await unitOfWork.usuario.buscarPorEmail(request.email)

      if (!usuario || usuario.password !== request.password) {
         throw new CustomError("Credenciales inválidas.", 501)
      }

      const userAccess: UserInfo = {
         id: usuario.id,
         email: usuario.email,
         nombre: usuario.nombres,
         rol: usuario.rol,
         tipo: "access"
      }

      const jwtSecret = process.env.JWT_SECRET || ""
      const jwtEmisor = process.env.JWT_EMISOR || ""
      const expAccessToken = process.env.EXPIRE_ACCESS_TOKEN || "15m"
      const expRefreshToken = process.env.EXPIRE_REFRESH_TOKEN || "1d"

      const accessToken = jwt.sign(userAccess, jwtSecret, {
         expiresIn: expAccessToken as any,
         issuer: jwtEmisor
      })

      const userRefresh: UserInfo = {
         id: usuario.id,
         email: usuario.email,
         nombre: usuario.nombres,
         rol: usuario.rol,
         tipo: "refresh"
      }

      const refreshToken = jwt.sign(userRefresh, jwtSecret, {
         expiresIn: expRefreshToken as any,
         issuer: jwtEmisor
      })

      return { accessToken, refreshToken }
   }
}
