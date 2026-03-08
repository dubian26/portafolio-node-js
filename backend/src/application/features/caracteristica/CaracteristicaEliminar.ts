import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"

export interface Props {
   id: string
}

export class CaracteristicaEliminar {
   async execute(request: Props) {
      const existe = await unitOfWork.caracteristica.buscarPorId(request.id)
      if (!existe) throw new CustomError("La característica no existe.", 404)

      await unitOfWork.caracteristica.eliminar(request.id)

      return {
         id: request.id,
         mensaje: "Característica eliminada con éxito."
      }
   }
}
