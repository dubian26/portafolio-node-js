import { unitOfWork } from "@/application/config/UnitOfWork"

export class CaracteristicaListar {
   async execute() {
      const caracteristicas = await unitOfWork.caracteristica.listarTodos()
      return caracteristicas.map(caracteristica => caracteristica.toResult())
   }
}
