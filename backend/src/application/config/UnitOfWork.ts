import { IUsuarioRepository } from "@/domain/interfaces/IUsuarioRepository"
import { PrismaUsuarioRepository } from "@/infrastructure/prisma-repos/PrismaUsuarioRepository"
import { IRolRepository } from "@/domain/interfaces/IRolRepository"
import { PrismaRolRepository } from "@/infrastructure/prisma-repos/PrismaRolRepository"

class UnitOfWork {
   // Lazy initialization
   private _usuario: IUsuarioRepository | undefined
   private _rol: IRolRepository | undefined

   // Getters
   get usuario() { return this._usuario ??= new PrismaUsuarioRepository() }
   get rol() { return this._rol ??= new PrismaRolRepository() }
}

export const unitOfWork = new UnitOfWork()