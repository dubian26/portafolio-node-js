import { UsuarioClienteNuevo } from "@/application/features/usuario/UsuarioClienteNuevo"
import { UsuarioLogin } from "@/application/features/usuario/UsuarioLogin"
import { UsuarioPorEmail } from "@/application/features/usuario/UsuarioPorEmail"
import { Router } from "express"

const router = Router()

router.post("/crear-usuario-cliente", async (req, res) => {
   const useCase = new UsuarioClienteNuevo()
   const idResult = await useCase.execute(req.body)
   res.json(idResult)
})

router.post("/login", async (req, res) => {
   const useCase = new UsuarioLogin()
   const tokens = await useCase.execute(req.body)
   res.json(tokens)
})

router.post("/buscar-usuario-por-email", async (req, res) => {
   const useCase = new UsuarioPorEmail()
   const usuario = await useCase.execute(req.body)
   res.json(usuario)
})



export default router
