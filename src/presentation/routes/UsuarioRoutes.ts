import { UsuarioController } from "@/presentation/controllers/UsuarioController"
import { Router } from "express"

const router = Router()
const controller = new UsuarioController()

router.post("/login", (req, res) => controller.login(req, res))
router.post("/buscar-usuario-por-email", (req, res) => controller.buscarPorEmail(req, res))
router.post("/crear-usuario", (req, res) => controller.crear(req, res))

export default router
