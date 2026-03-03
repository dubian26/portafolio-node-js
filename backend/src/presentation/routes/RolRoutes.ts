import { RolActualizar } from "@/application/features/rol/RolActualizar"
import { RolCrear } from "@/application/features/rol/RolCrear"
import { RolEliminar } from "@/application/features/rol/RolEliminar"
import { RolListar } from "@/application/features/rol/RolListar"
import { RolPorId } from "@/application/features/rol/RolPorId"
import { Router } from "express"

const router = Router()

router.post("/", async (req, res) => {
   const useCase = new RolCrear()
   const result = await useCase.execute(req.body)
   res.json(result)
})

router.put("/:id", async (req, res) => {
   const useCase = new RolActualizar()
   const result = await useCase.execute({ id: req.params.id, ...req.body })
   res.json(result)
})

router.delete("/:id", async (req, res) => {
   const useCase = new RolEliminar()
   const result = await useCase.execute({ id: req.params.id })
   res.json(result)
})

router.get("/", async (req, res) => {
   const useCase = new RolListar()
   const result = await useCase.execute()
   res.json(result)
})

router.get("/:id", async (req, res) => {
   const useCase = new RolPorId()
   const result = await useCase.execute({ id: req.params.id })
   res.json(result)
})

export default router
