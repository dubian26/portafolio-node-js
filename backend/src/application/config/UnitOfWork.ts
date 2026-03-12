import { IUsuarioRepository } from "@/domain/interfaces/IUsuarioRepository"
import { PrismaUsuarioRepository } from "@/infrastructure/prisma-repos/PrismaUsuarioRepository"
import { IRolRepository } from "@/domain/interfaces/IRolRepository"
import { PrismaRolRepository } from "@/infrastructure/prisma-repos/PrismaRolRepository"
import { ICaracteristicaRepository } from "@/domain/interfaces/ICaracteristicaRepository"
import { PrismaCaracteristicaRepository } from "@/infrastructure/prisma-repos/PrismaCaracteristicaRepository"
import { ICodigoVerificacionRepository } from "@/domain/interfaces/ICodigoVerificacionRepository"
import { PrismaCodigoVerificacionRepository } from "@/infrastructure/prisma-repos/PrismaCodigoVerificacionRepository"
import { IEmailService } from "@/domain/interfaces/IEmailService"
import { EmailService } from "@/infrastructure/services/EmailService"

class UnitOfWork {
   // Lazy initialization
   private _usuario: IUsuarioRepository | undefined
   private _rol: IRolRepository | undefined
   private _caracteristica: ICaracteristicaRepository | undefined
   private _codigoVerificacion: ICodigoVerificacionRepository | undefined
   private _emailService: IEmailService | undefined

   // Getters
   get usuario() { return this._usuario ??= new PrismaUsuarioRepository() }
   get rol() { return this._rol ??= new PrismaRolRepository() }
   get caracteristica() { return this._caracteristica ??= new PrismaCaracteristicaRepository() }
   get codigoVerificacion() { return this._codigoVerificacion ??= new PrismaCodigoVerificacionRepository() }
   get emailService() { return this._emailService ??= new EmailService() }
}

export const unitOfWork = new UnitOfWork()