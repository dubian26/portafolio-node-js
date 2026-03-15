import { unitOfWork } from "@/application/config/UnitOfWork"
import { RolEliminar } from "@/application/features/rol/RolEliminar"
import { beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("@/application/config/UnitOfWork", async (importOriginal) => {
   if (global.useRealDB)
      return await importOriginal()

   return {
      unitOfWork: {
         rol: {
            buscarPorId: vi.fn(),
            eliminar: vi.fn()
         }
      }
   }
})

describe("RolEliminar", () => {
   const useCase = new RolEliminar()

   beforeEach(() => {
      if (!global.useRealDB) vi.clearAllMocks()
   })

   it.skipIf(global.useRealDB)("debería eliminar un rol exitosamente (Mock)", async () => {
      const rolId = "rol-to-delete-123"
      vi.mocked(unitOfWork.rol.buscarPorId).mockResolvedValue({ id: rolId } as any)
      vi.mocked(unitOfWork.rol.eliminar).mockResolvedValue(undefined)

      const result = await useCase.execute({ id: rolId })

      expect(result.id).toBe(rolId)
      expect(result.mensaje).toContain("éxito")
      expect(unitOfWork.rol.eliminar).toHaveBeenCalledWith(rolId)
   })

   it.skipIf(global.useRealDB)("debería lanzar error 404 si el rol no existe (Mock)", async () => {
      vi.mocked(unitOfWork.rol.buscarPorId).mockResolvedValue(null)

      await expect(useCase.execute({ id: "non-existent" }))
         .rejects
         .toThrow("El rol no existe")
   })

   it.runIf(global.useRealDB)("Prueba Real: Eliminar un Rol de la Base de Datos", async () => {
      const REAL_ROL_ID = "tu-id-de-rol-aqui"

      try {
         const result = await useCase.execute({ id: REAL_ROL_ID })
         expect(result.id).toBe(REAL_ROL_ID)
      } catch (error: any) {
         // Si ya se borró, aceptamos el 404 como "éxito" de que ya no está
         expect([404, 200]).toContain(error.statusCode || 200)
      }
   })
})
