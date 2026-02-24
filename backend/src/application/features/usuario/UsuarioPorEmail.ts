import { unitOfWork } from "@/application/config/UnitOfWork"

export interface Props {
   email: string
}

export class UsuarioPorEmail {
   async execute(request: Props) {
      const usuario = await unitOfWork.usuario.buscarPorEmail(request.email)
      return usuario?.toResult()
   }
}
