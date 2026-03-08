import { Caracteristica } from "@/domain/entities/Caracteristica"
import { ICaracteristicaRepository } from "@/domain/interfaces/ICaracteristicaRepository"
import { dbClient } from "@/infrastructure/config/DbClient"

export class PrismaCaracteristicaRepository implements ICaracteristicaRepository {
   async buscarPorId(id: string): Promise<Caracteristica | null> {
      const record = await dbClient.caracteristica.findUnique({ where: { id } })
      if (!record) return null
      return new Caracteristica(record)
   }

   async buscarPorNombre(nombre: string): Promise<Caracteristica | null> {
      const record = await dbClient.caracteristica.findUnique({ where: { nombre } })
      if (!record) return null
      return new Caracteristica(record)
   }

   async listarTodos(): Promise<Caracteristica[]> {
      const records = await dbClient.caracteristica.findMany()
      return records.map(record => new Caracteristica(record))
   }

   async insertar(caracteristica: Caracteristica): Promise<void> {
      await dbClient.caracteristica.create({
         data: caracteristica.toJSON()
      })
   }

   async actualizar(caracteristica: Caracteristica): Promise<void> {
      const { id, ...data } = caracteristica.toJSON()
      await dbClient.caracteristica.update({
         where: { id },
         data
      })
   }

   async eliminar(id: string): Promise<void> {
      await dbClient.caracteristica.delete({
         where: { id }
      })
   }
}
