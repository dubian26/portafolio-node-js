import { describe, it, expect, vi, beforeEach } from "vitest"
import { CaracteristicaCrear } from "@/application/features/caracteristica/CaracteristicaCrear"
import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"

vi.mock("@/application/config/UnitOfWork", async (importOriginal) => {
   if (global.useRealDB) return await importOriginal()
   return {
      unitOfWork: {
         caracteristica: {
            buscarPorNombre: vi.fn(),
            insertar: vi.fn()
         }
      }
   }
})

describe("CaracteristicaCrear", () => {
   const useCase = new CaracteristicaCrear()

   beforeEach(() => {
      if (!global.useRealDB) vi.clearAllMocks()
   })

   it.skipIf(global.useRealDB)("debería crear una característica exitosamente (Mock)", async () => {
      const props = {
         nombre: "Color",
         descripcion: "Color del producto"
      }

      vi.mocked(unitOfWork.caracteristica.buscarPorNombre).mockResolvedValue(null)
      vi.mocked(unitOfWork.caracteristica.insertar).mockResolvedValue(undefined)

      const result = await useCase.execute(props)

      expect(result.mensaje).toContain("éxito")
      expect(unitOfWork.caracteristica.insertar).toHaveBeenCalled()
   })

   it.skipIf(global.useRealDB)("debería lanzar error si la característica ya existe (Mock)", async () => {
      const props = { nombre: "EXISTENTE" }
      vi.mocked(unitOfWork.caracteristica.buscarPorNombre).mockResolvedValue({ id: "1" } as any)

      await expect(useCase.execute(props)).rejects.toThrow(CustomError)
      await expect(useCase.execute(props)).rejects.toThrow("ya existe")
   })

   it.runIf(global.useRealDB)("Prueba Real: Crear una Característica en la Base de Datos", async () => {
      const props = {
         nombre: `TEST_CARACT_${Date.now()}`,
         descripcion: "Característica creada desde test real"
      }

      const result = await useCase.execute(props)
      expect(result.mensaje).toContain("éxito")
      expect(result.id).toBeDefined()
   })
})
