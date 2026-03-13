import { CaracteristicaActualizar } from "@/application/features/caracteristica/CaracteristicaActualizar"
import { CaracteristicaCrear } from "@/application/features/caracteristica/CaracteristicaCrear"
import { CaracteristicaEliminar } from "@/application/features/caracteristica/CaracteristicaEliminar"
import { CaracteristicaListar } from "@/application/features/caracteristica/CaracteristicaListar"
import { CaracteristicaPorId } from "@/application/features/caracteristica/CaracteristicaPorId"
import { authorizeHandler } from "@/presentation/middlewares/authorizeHandler"
import { Router } from "express"

const router = Router()

router.post("/", authorizeHandler, async (req, res) => {
   const useCase = new CaracteristicaCrear()
   const result = await useCase.execute(req.body)
   res.json(result)
})

router.put("/:id", authorizeHandler, async (req, res) => {
   const useCase = new CaracteristicaActualizar()
   const result = await useCase.execute({ id: req.params.id as string, ...req.body })
   res.json(result)
})

router.delete("/:id", authorizeHandler, async (req, res) => {
   const useCase = new CaracteristicaEliminar()
   const result = await useCase.execute({ id: req.params.id as string })
   res.json(result)
})

router.get("/", async (req, res) => {
   const useCase = new CaracteristicaListar()
   const result = await useCase.execute()
   res.json(result)
})

router.get("/:id", async (req, res) => {
   const useCase = new CaracteristicaPorId()
   const result = await useCase.execute({ id: req.params.id as string })
   res.json(result)
})

export default router
