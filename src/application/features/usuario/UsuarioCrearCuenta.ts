import { unitOfWork } from "@/application/config/UnitOfWork"
import { Usuario } from "@/domain/entities/Usuario"
import { CustomError } from "@/domain/errors/CustomError"
import { v7 as uuidv7 } from "uuid"

export interface Props {
   email: string
   password: string
   nombres: string
   apellidos: string
}

export class UsuarioCrearCuenta {
   async execute(request: Props) {
      const existe = await unitOfWork.usuario.buscarPorEmail(request.email)
      if (existe) throw new CustomError("El usuario ya existe en la base de datos.", 501)

      const nuevoUsuario = new Usuario({
         id: uuidv7().replace(/-/g, ""),
         email: request.email,
         password: request.password,
         nombres: request.nombres,
         apellidos: request.apellidos,
         rol: "cliente",
         activo: true,
         fechaCreacion: new Date(),
         fechaModifica: new Date()
      })

      await unitOfWork.usuario.insertar(nuevoUsuario)

      return {
         id: nuevoUsuario.id,
         mensaje: "Usuario creado con éxito."
      }
   }
}
