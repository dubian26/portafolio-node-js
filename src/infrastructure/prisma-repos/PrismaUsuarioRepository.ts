import { Usuario } from "../../domain/entities/Usuario"
import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository"
import { dbClient } from "../config/DbClient"

export class PrismaUsuarioRepository implements IUsuarioRepository {
   async buscarPorId(id: string): Promise<Usuario | null> {
      const record = await dbClient.usuario.findUnique({ where: { id } })
      if (!record) return null
      return new Usuario(record)
   }

   async buscarPorEmail(email: string): Promise<Usuario | null> {
      const record = await dbClient.usuario.findUnique({ where: { email } })
      if (!record) return null
      return new Usuario(record)
   }

   async insertar(usuario: Usuario): Promise<void> {
      await dbClient.usuario.create({
         data: usuario.toJSON()
      })
   }

   async actualizar(usuario: Usuario): Promise<void> {
      const { id, ...data } = usuario.toJSON()
      await dbClient.usuario.update({
         where: { id },
         data
      })
   }
}
