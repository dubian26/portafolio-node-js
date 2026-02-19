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

      return usuario?.toResult()
   }
}
