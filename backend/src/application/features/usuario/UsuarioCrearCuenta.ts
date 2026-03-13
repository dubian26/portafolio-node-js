import { unitOfWork } from "@/application/config/UnitOfWork"
import { Rol } from "@/domain/entities/Rol"
import { Usuario } from "@/domain/entities/Usuario"
import { CodigoVerificacion } from "@/domain/entities/CodigoVerificacion"
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
         activo: false,
         emailVerificado: false,
         fechaCreacion: new Date(),
         fechaModifica: new Date()
      })

      await unitOfWork.usuario.insertar(nuevoUsuario)

      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      const codigoVerificacion = new CodigoVerificacion({
         id: uuidv7().replace(/-/g, ""),
         usuarioId: nuevoUsuario.id,
         codigo: otp,
         proposito: "REGISTRO",
         expiracion: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
         utilizado: false,
         fechaCreacion: new Date()
      })

      await unitOfWork.codigoVerificacion.insertar(codigoVerificacion)

      // No esperamos el envío del email para que la respuesta HTTP no se quede colgada
      // si el servicio de correo tiene problemas de conexión en producción (ej. Railway).
      unitOfWork.emailService.enviarEmail(
         nuevoUsuario.email,
         "Verifica tu correo electrónico",
         `<h1>¡Bienvenido a la Tienda Online!</h1><p>Tu código de verificación es: <b>${otp}</b></p><p>Este código espirará en 15 minutos.</p>`
      )

      return {
         id: nuevoUsuario.id,
         email: nuevoUsuario.email,
         mensaje: "Usuario creado. Por favor verifica tu email con el código OTP enviado."
      }
   }
}
