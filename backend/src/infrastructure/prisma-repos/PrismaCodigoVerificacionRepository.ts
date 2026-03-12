import { ICodigoVerificacionRepository } from "@/domain/interfaces/ICodigoVerificacionRepository"
import { CodigoVerificacion } from "@/domain/entities/CodigoVerificacion"
import { dbClient } from "@/infrastructure/config/DbClient"

export class PrismaCodigoVerificacionRepository implements ICodigoVerificacionRepository {
   async insertar(codigo: CodigoVerificacion): Promise<void> {
      await dbClient.codigoVerificacion.create({
         data: {
            id: codigo.id,
            usuarioId: codigo.usuarioId,
            codigo: codigo.codigo,
            proposito: codigo.proposito,
            expiracion: codigo.expiracion,
            utilizado: codigo.utilizado,
            fechaCreacion: codigo.fechaCreacion
         }
      })
   }

   async buscarRecientePorUsuarioYProposito(usuarioId: string, proposito: string): Promise<CodigoVerificacion | null> {
      const dbRecord = await dbClient.codigoVerificacion.findFirst({
         where: { usuarioId, proposito },
         orderBy: { fechaCreacion: 'desc' }
      })

      if (!dbRecord) return null
      return new CodigoVerificacion(dbRecord)
   }

   async buscarPorCodigo(codigo: string, proposito: string): Promise<CodigoVerificacion | null> {
      const dbRecord = await dbClient.codigoVerificacion.findFirst({
         where: { codigo, proposito, utilizado: false },
         orderBy: { fechaCreacion: 'desc' }
      })

      if (!dbRecord) return null
      return new CodigoVerificacion(dbRecord)
   }

   async marcarComoUtilizado(id: string): Promise<void> {
      await dbClient.codigoVerificacion.update({
         where: { id },
         data: { utilizado: true }
      })
   }
}
