import { unitOfWork } from "@/application/config/UnitOfWork"

export class RolListar {
   async execute() {
      const roles = await unitOfWork.rol.listarTodos()
      return roles.map(rol => rol.toJSON())
   }
}
