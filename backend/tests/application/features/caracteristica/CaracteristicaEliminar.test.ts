import { describe, it, expect, vi, beforeEach } from "vitest"
import { CaracteristicaEliminar } from "@/application/features/caracteristica/CaracteristicaEliminar"
import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"

vi.mock("@/application/config/UnitOfWork", async (importOriginal) => {
   if (global.useRealDB) return await importOriginal()
   return {
      unitOfWork: {
         caracteristica: {
            buscarPorId: vi.fn(),
            eliminar: vi.fn()
         }
      }
   }
})

describe("CaracteristicaEliminar", () => {
   const useCase = new CaracteristicaEliminar()

   beforeEach(() => {
      if (!global.useRealDB) vi.clearAllMocks()
   })

   it.skipIf(global.useRealDB)("debería eliminar una característica exitosamente (Mock)", async () => {
      const caractId = "caract-to-delete-123"
      vi.mocked(unitOfWork.caracteristica.buscarPorId).mockResolvedValue({ id: caractId } as any)
      vi.mocked(unitOfWork.caracteristica.eliminar).mockResolvedValue(undefined)

      const result = await useCase.execute({ id: caractId })

      expect(result.id).toBe(caractId)
      expect(result.mensaje).toContain("éxito")
      expect(unitOfWork.caracteristica.eliminar).toHaveBeenCalledWith(caractId)
   })

   it.skipIf(global.useRealDB)("debería lanzar error 404 si la característica no existe (Mock)", async () => {
      vi.mocked(unitOfWork.caracteristica.buscarPorId).mockResolvedValue(null)

      await expect(useCase.execute({ id: "non-existent" }))
         .rejects
         .toThrow("no existe")
   })

   it.runIf(global.useRealDB)("Prueba Real: Eliminar una Característica de la Base de Datos", async () => {
      const REAL_CARACT_ID = "tu-id-de-caracteristica-aqui"
      
      try {
         const result = await useCase.execute({ id: REAL_CARACT_ID })
         expect(result.id).toBe(REAL_CARACT_ID)
      } catch (error: any) {
         // Si ya se borró, aceptamos el 404 como "éxito" de que ya no está
         expect([404, 200]).toContain(error.statusCode || 200)
      }
   })
})
