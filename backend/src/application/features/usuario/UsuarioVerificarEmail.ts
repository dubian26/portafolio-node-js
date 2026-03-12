import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"

export interface Props {
   email: string
   codigo: string
}

export class UsuarioVerificarEmail {
   async execute(request: Props) {
      const usuario = await unitOfWork.usuario.buscarPorEmail(request.email)
      if (!usuario) throw new CustomError("El usuario no existe.", 404)

      if (usuario.emailVerificado) {
         throw new CustomError("El email ya ha sido verificado.", 400)
      }

      const codigoVerificacion = await unitOfWork.codigoVerificacion.buscarPorCodigo(request.codigo, "REGISTRO")
      if (!codigoVerificacion) throw new CustomError("Código inválido o ya expirado.", 400)

      if (codigoVerificacion.usuarioId !== usuario.id) {
         throw new CustomError("El código no corresponde a este usuario.", 400)
      }

      if (new Date() > codigoVerificacion.expiracion) {
         throw new CustomError("El código ha expirado.", 400)
      }

      // Mark as used
      await unitOfWork.codigoVerificacion.marcarComoUtilizado(codigoVerificacion.id)

      // Update user status
      usuario.emailVerificado = true
      usuario.activo = true
      await unitOfWork.usuario.actualizar(usuario)

      return {
         mensaje: "Email verificado correctamente. Ya puedes iniciar sesión."
      }
   }
}
