import { Request, Response } from "express"
import { PrismaUsuarioRepository } from "../../infrastructure/repositories/PrismaUsuarioRepository"
import { UsuarioLogin } from "../../application/use-cases/UsuarioLogin"
import { UsuarioNuevo } from "../../application/use-cases/UsuarioNuevo"
import { UsuarioPorEmail } from "../../application/use-cases/UsuarioPorEmail"

const repository = new PrismaUsuarioRepository()

export class UsuarioController {
   async login(req: Request, res: Response) {
      try {
         const useCase = new UsuarioLogin(repository)
         const token = await useCase.execute(req.body)
         res.json(token)
      } catch (error: any) {
         res.status(401).json({ error: error.message })
      }
   }

   async crear(req: Request, res: Response) {
      try {
         const useCase = new UsuarioNuevo(repository)
         const result = await useCase.execute(req.body)
         res.status(201).json(result)
      } catch (error: any) {
         res.status(400).json({ error: error.message })
      }
   }

   async buscarPorEmail(req: Request, res: Response) {
      try {
         const useCase = new UsuarioPorEmail(repository)
         const result = await useCase.execute(req.body)
         res.json(result)
      } catch (error: any) {
         res.status(404).json({ error: error.message })
      }
   }
}
