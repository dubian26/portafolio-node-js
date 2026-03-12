import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"

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

      if (!usuario.emailVerificado) {
         const error = new CustomError("Email no verificado.", 403)
         error.addDetails({ needOtp: true, email: usuario.email })
         throw error
      }

      return usuario?.toResult()
   }
}
