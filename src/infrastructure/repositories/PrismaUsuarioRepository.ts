import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository"
import { Usuario } from "../../domain/entities/Usuario"

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
   throw new Error("DATABASE_URL no está definida en las variables de entorno")
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export class PrismaUsuarioRepository implements IUsuarioRepository {
   async buscarPorId(id: string): Promise<Usuario | null> {
      const record = await prisma.usuario.findUnique({ where: { id } })
      if (!record) return null
      return new Usuario(record)
   }

   async buscarPorEmail(email: string): Promise<Usuario | null> {
      const record = await prisma.usuario.findUnique({ where: { email } })
      if (!record) return null
      return new Usuario(record)
   }

   async insertar(usuario: Usuario): Promise<void> {
      await prisma.usuario.create({
         data: usuario.toJSON()
      })
   }

   async actualizar(usuario: Usuario): Promise<void> {
      const { id, ...data } = usuario.toJSON()
      await prisma.usuario.update({
         where: { id },
         data
      })
   }
}
