import { describe, it, expect, vi, beforeEach } from "vitest"
import { CaracteristicaListar } from "@/application/features/caracteristica/CaracteristicaListar"
import { unitOfWork } from "@/application/config/UnitOfWork"
import { Caracteristica } from "@/domain/entities/Caracteristica"

vi.mock("@/application/config/UnitOfWork", async (importOriginal) => {
   if (global.useRealDB) return await importOriginal()
   return {
      unitOfWork: {
         caracteristica: {
            listarTodos: vi.fn()
         }
      }
   }
})

describe("CaracteristicaListar", () => {
   const useCase = new CaracteristicaListar()

   beforeEach(() => {
      if (!global.useRealDB) vi.clearAllMocks()
   })

   it.skipIf(global.useRealDB)("debería listar todas las características (Mock)", async () => {
      const mockCaracts = [
         new Caracteristica({ id: "1", nombre: "Talla", descripcion: "Desc", activo: true, fechaPublicacion: new Date(), fechaCreacion: new Date(), fechaModifica: new Date() }),
         new Caracteristica({ id: "2", nombre: "Material", descripcion: "Desc", activo: true, fechaPublicacion: new Date(), fechaCreacion: new Date(), fechaModifica: new Date() })
      ]

      vi.mocked(unitOfWork.caracteristica.listarTodos).mockResolvedValue(mockCaracts)

      const result = await useCase.execute()

      expect(result).toHaveLength(2)
      expect(result[0].nombre).toBe("Talla")
      expect(unitOfWork.caracteristica.listarTodos).toHaveBeenCalled()
   })

   it.runIf(global.useRealDB)("Prueba Real: Listar características de la Base de Datos", async () => {
      const result = await useCase.execute()
      expect(Array.isArray(result)).toBe(true)
      console.log(`Se encontraron ${result.length} características en la DB.`)
   })
})
