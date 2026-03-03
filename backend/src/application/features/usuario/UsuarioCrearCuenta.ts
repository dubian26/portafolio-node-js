import { unitOfWork } from "@/application/config/UnitOfWork"
import { Rol } from "@/domain/entities/Rol"
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

      const rol = await unitOfWork.rol.buscarPorNombre(Rol.CLIENTE)
      if (!rol) throw new CustomError(`El rol ${Rol.CLIENTE} no existe.`, 501)

      const nuevoUsuario = new Usuario({
         id: uuidv7().replace(/-/g, ""),
         email: request.email,
         password: request.password,
         nombres: request.nombres,
         apellidos: request.apellidos,
         rolId: rol.id,
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
