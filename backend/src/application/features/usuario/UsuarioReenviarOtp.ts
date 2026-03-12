import { unitOfWork } from "@/application/config/UnitOfWork"
import { CodigoVerificacion } from "@/domain/entities/CodigoVerificacion"
import { CustomError } from "@/domain/errors/CustomError"
import { v7 as uuidv7 } from "uuid"

export interface Props {
   email: string
}

export class UsuarioReenviarOtp {
   async execute(request: Props) {
      const usuario = await unitOfWork.usuario.buscarPorEmail(request.email)
      if (!usuario) throw new CustomError("El usuario no existe.", 404)

      if (usuario.emailVerificado) {
         throw new CustomError("El email ya ha sido verificado.", 400)
      }

      const reciente = await unitOfWork.codigoVerificacion.buscarRecientePorUsuarioYProposito(usuario.id, "REGISTRO")
      if (reciente) {
         const diffSegundos = (new Date().getTime() - reciente.fechaCreacion.getTime()) / 1000
         if (diffSegundos < 60) {
            throw new CustomError(`Debes esperar ${Math.ceil(60 - diffSegundos)} segundos antes de solicitar otro código.`, 429)
         }
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      const nuevoCodigo = new CodigoVerificacion({
         id: uuidv7().replace(/-/g, ""),
         usuarioId: usuario.id,
         codigo: otp,
         proposito: "REGISTRO",
         expiracion: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
         utilizado: false,
         fechaCreacion: new Date()
      })

      await unitOfWork.codigoVerificacion.insertar(nuevoCodigo)

      await unitOfWork.emailService.enviarEmail(
         usuario.email,
         "Reenvío: Verifica tu correo electrónico",
         `<h1>¡Bienvenido a la Tienda Online!</h1><p>Tu nuevo código de verificación es: <b>${otp}</b></p><p>Este código espirará en 15 minutos.</p>`
      )

      return {
         mensaje: "Se ha reenviado un nuevo código a tu correo."
      }
   }
}
