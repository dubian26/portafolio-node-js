import { UsuarioLogin } from "@/application/features/usuario/UsuarioLogin"
import { UsuarioNuevo } from "@/application/features/usuario/UsuarioNuevo"
import { UsuarioPorEmail } from "@/application/features/usuario/UsuarioPorEmail"
import { Request, Response } from "express"

export class UsuarioController {
   async login(req: Request, res: Response) {
      try {
         const useCase = new UsuarioLogin()
         const token = await useCase.execute(req.body)
         res.json(token)
      } catch (error: any) {
         res.status(401).json({ error: error.message })
      }
   }

   async crear(req: Request, res: Response) {
      try {
         const useCase = new UsuarioNuevo()
         const result = await useCase.execute(req.body)
         res.status(201).json(result)
      } catch (error: any) {
         res.status(400).json({ error: error.message })
      }
   }

   async buscarPorEmail(req: Request, res: Response) {
      try {
         const useCase = new UsuarioPorEmail()
         const result = await useCase.execute(req.body)
         res.json(result)
      } catch (error: any) {
         res.status(404).json({ error: error.message })
      }
   }
}
