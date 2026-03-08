import { IUsuarioRepository } from "@/domain/interfaces/IUsuarioRepository"
import { PrismaUsuarioRepository } from "@/infrastructure/prisma-repos/PrismaUsuarioRepository"
import { IRolRepository } from "@/domain/interfaces/IRolRepository"
import { PrismaRolRepository } from "@/infrastructure/prisma-repos/PrismaRolRepository"
import { ICaracteristicaRepository } from "@/domain/interfaces/ICaracteristicaRepository"
import { PrismaCaracteristicaRepository } from "@/infrastructure/prisma-repos/PrismaCaracteristicaRepository"

class UnitOfWork {
   // Lazy initialization
   private _usuario: IUsuarioRepository | undefined
   private _rol: IRolRepository | undefined
   private _caracteristica: ICaracteristicaRepository | undefined

   // Getters
   get usuario() { return this._usuario ??= new PrismaUsuarioRepository() }
   get rol() { return this._rol ??= new PrismaRolRepository() }
   get caracteristica() { return this._caracteristica ??= new PrismaCaracteristicaRepository() }
}

export const unitOfWork = new UnitOfWork()