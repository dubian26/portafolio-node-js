import { Rol } from "@/domain/entities/Rol"
import { IRolRepository } from "@/domain/interfaces/IRolRepository"
import { dbClient } from "@/infrastructure/config/DbClient"

export class PrismaRolRepository implements IRolRepository {
   async buscarPorId(id: string): Promise<Rol | null> {
      const record = await dbClient.rol.findUnique({ where: { id } })
      if (!record) return null
      return new Rol(record)
   }

   async buscarPorNombre(nombre: string): Promise<Rol | null> {
      const record = await dbClient.rol.findUnique({ where: { nombre } })
      if (!record) return null
      return new Rol(record)
   }

   async listarTodos(): Promise<Rol[]> {
      const records = await dbClient.rol.findMany()
      return records.map(record => new Rol(record))
   }

   async insertar(rol: Rol): Promise<void> {
      await dbClient.rol.create({
         data: rol.toJSON()
      })
   }

   async actualizar(rol: Rol): Promise<void> {
      const { id, ...data } = rol.toJSON()
      await dbClient.rol.update({
         where: { id },
         data
      })
   }

   async eliminar(id: string): Promise<void> {
      await dbClient.rol.delete({
         where: { id }
      })
   }
}
