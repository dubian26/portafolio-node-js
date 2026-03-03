import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"

export interface Props {
   id: string
}

export class RolPorId {
   async execute({ id }: Props) {
      const rol = await unitOfWork.rol.buscarPorId(id)
      if (!rol) throw new CustomError("El rol no existe.", 404)
      return rol.toJSON()
   }
}
