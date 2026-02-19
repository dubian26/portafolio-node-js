import { UsuarioCrearCuenta } from "@/application/features/usuario/UsuarioCrearCuenta"
import { UsuarioLogin } from "@/application/features/usuario/UsuarioLogin"
import { UsuarioPorEmail } from "@/application/features/usuario/UsuarioPorEmail"
import { UsuarioRefrescarToken } from "@/application/features/usuario/UsuarioRefrescarToken"
import { Router } from "express"

const router = Router()

router.post("/crear-cuenta-usuario", async (req, res) => {
   const useCase = new UsuarioCrearCuenta()
   const idResult = await useCase.execute(req.body)
   res.json(idResult)
})

router.post("/login", async (req, res) => {
   const useCase = new UsuarioLogin()
   const tokens = await useCase.execute(req.body)
   res.json(tokens)
})

router.post("/refrescar-token", async (req, res) => {
   const accessToken = "??"
   const refreshToken = "??" // Como puedo obtener el accessToken y refreshToken?
   const useCase = new UsuarioRefrescarToken()
   const tokens = await useCase.execute({ accessToken, refreshToken })
   res.json(tokens)
})

router.post("/buscar-usuario-por-email", async (req, res) => {
   const useCase = new UsuarioPorEmail()
   const usuario = await useCase.execute(req.body)
   res.json(usuario)
})



export default router
