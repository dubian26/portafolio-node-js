import { UsuarioLogin } from "@/application/features/usuario/UsuarioLogin"
import { UsuarioNuevo } from "@/application/features/usuario/UsuarioNuevo"
import { UsuarioPorEmail } from "@/application/features/usuario/UsuarioPorEmail"
import { Router } from "express"

const router = Router()

router.post("/login", async (req, res) => {
   const useCase = new UsuarioLogin()
   const token = await useCase.execute(req.body)
   res.json(token)
})

router.post("/buscar-usuario-por-email", async (req, res) => {
   const useCase = new UsuarioPorEmail()
   const usuario = await useCase.execute(req.body)
   res.json(usuario)
})

router.post("/crear-usuario", async (req, res) => {
   const useCase = new UsuarioNuevo()
   const usuario = await useCase.execute(req.body)
   res.json(usuario)
})

export default router
