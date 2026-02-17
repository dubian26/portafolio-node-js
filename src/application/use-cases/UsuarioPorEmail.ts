import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository"

export interface UsuarioPorEmailRequest {
   email: string
}

export class UsuarioPorEmail {
   constructor(private usuarioRepository: IUsuarioRepository) { }

   async execute(request: UsuarioPorEmailRequest) {
      const usuario = await this.usuarioRepository.buscarPorEmail(request.email)
      if (!usuario) {
         throw new Error("Usuario no encontrado.")
      }
      return usuario.toJSON()
   }
}
