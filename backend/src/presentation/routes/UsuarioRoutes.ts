import { UsuarioActualizar } from "@/application/features/usuario/UsuarioActualizar"
import { UsuarioEliminar } from "@/application/features/usuario/UsuarioEliminar"
import { UsuarioInactivar } from "@/application/features/usuario/UsuarioInactivar"
import { UsuarioListar } from "@/application/features/usuario/UsuarioListar"
import { UsuarioPorEmail } from "@/application/features/usuario/UsuarioPorEmail"
import { UsuarioPorId } from "@/application/features/usuario/UsuarioPorId"
import { authorizeHandler } from "@/presentation/middlewares/authorizeHandler"
import { Router } from "express"

const router = Router()

router.get("/", authorizeHandler, async (req, res) => {
   const useCase = new UsuarioListar()
   const result = await useCase.execute()
   res.json(result)
})

router.get("/:id", authorizeHandler, async (req, res) => {
   const useCase = new UsuarioPorId()
   const result = await useCase.execute({ id: req.params.id as string })
   res.json(result)
})

router.get("/email/:email", authorizeHandler, async (req, res) => {
   const useCase = new UsuarioPorEmail()
   const result = await useCase.execute({ email: req.params.email as string })
   res.json(result)
})

router.put("/:id", authorizeHandler, async (req, res) => {
   const useCase = new UsuarioActualizar()
   const result = await useCase.execute({ id: req.params.id as string, ...req.body })
   res.json(result)
})

router.delete("/:id", authorizeHandler, async (req, res) => {
   const useCase = new UsuarioEliminar()
   const result = await useCase.execute({ id: req.params.id as string })
   res.json(result)
})

router.put("/:id/inactivar", authorizeHandler, async (req, res) => {
   const useCase = new UsuarioInactivar()
   const result = await useCase.execute({ id: req.params.id as string })
   res.json(result)
})

export default router
