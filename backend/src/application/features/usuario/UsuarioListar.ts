import { unitOfWork } from "@/application/config/UnitOfWork"

export class UsuarioListar {
   async execute() {
      const usuarios = await unitOfWork.usuario.listarTodos()
      return usuarios.map(usuario => usuario.toResult())
   }
}
