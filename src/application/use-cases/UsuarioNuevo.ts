import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository"
import { Usuario } from "../../domain/entities/Usuario"
import { v7 as uuidv7 } from "uuid"

export interface UsuarioNuevoRequest {
   email: string
   password: string
   tipoDocu: string
   numeDocu: string
   nombres: string
   apellidos: string
}

export class UsuarioNuevo {
   constructor(private usuarioRepository: IUsuarioRepository) { }

   async execute(request: UsuarioNuevoRequest) {
      const existe = await this.usuarioRepository.buscarPorEmail(request.email)
      if (existe) {
         throw new Error("El usuario ya existe en la base de datos.")
      }

      const nuevoUsuario = new Usuario({
         id: uuidv7().replace(/-/g, ""),
         email: request.email,
         password: request.password,
         tipoDocu: request.tipoDocu,
         numeDocu: request.numeDocu,
         nombres: request.nombres,
         apellidos: request.apellidos,
         activo: true,
         fechaCreacion: new Date(),
         fechaModifica: new Date()
      })

      await this.usuarioRepository.insertar(nuevoUsuario)

      return {
         id: nuevoUsuario.email,
         mensaje: "Usuario creado con éxito."
      }
   }
}
