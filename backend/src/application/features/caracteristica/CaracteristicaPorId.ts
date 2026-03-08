import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"

export interface Props {
   id: string
}

export class CaracteristicaPorId {
   async execute(request: Props) {
      const caracteristica = await unitOfWork.caracteristica.buscarPorId(request.id)
      if (!caracteristica) throw new CustomError("La característica no existe.", 404)

      return caracteristica.toResult()
   }
}
