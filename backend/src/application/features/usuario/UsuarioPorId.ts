import { unitOfWork } from "@/application/config/UnitOfWork"

export interface Props {
   id: string
}

export class UsuarioPorId {
   async execute(request: Props) {
      const usuario = await unitOfWork.usuario.buscarPorId(request.id)
      return usuario?.toResult()
   }
}
