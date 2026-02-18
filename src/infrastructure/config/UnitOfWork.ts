import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository"
import { PrismaUsuarioRepository } from "../prisma-repos/PrismaUsuarioRepository"

class UnitOfWork {
   // Lazy initialization
   private _usuario: IUsuarioRepository | undefined

   // Getters
   get usuario() { return this._usuario ??= new PrismaUsuarioRepository() }
}

export const unitOfWork = new UnitOfWork()