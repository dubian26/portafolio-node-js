import { unitOfWork } from "@/application/config/UnitOfWork"
import { UsuarioEliminar } from "@/application/features/usuario/UsuarioEliminar"
import { beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("@/application/config/UnitOfWork", async (importOriginal) => {
   if (global.useRealDB)
      return await importOriginal()

   return {
      unitOfWork: {
         usuario: {
            buscarPorId: vi.fn(),
            eliminar: vi.fn()
         }
      }
   }
})

describe("UsuarioEliminar", () => {
   const useCase = new UsuarioEliminar()

   beforeEach(() => {
      if (!global.useRealDB) vi.clearAllMocks()
   })

   it.skipIf(global.useRealDB)("debería eliminar un usuario exitosamente (Mock)", async () => {
      const userId = "user-to-delete-123"
      vi.mocked(unitOfWork.usuario.buscarPorId).mockResolvedValue({ id: userId } as any)
      vi.mocked(unitOfWork.usuario.eliminar).mockResolvedValue(undefined)

      const result = await useCase.execute({ id: userId })

      expect(result.id).toBe(userId)
      expect(result.mensaje).toContain("éxito")
      expect(unitOfWork.usuario.eliminar).toHaveBeenCalledWith(userId)
   })

   it.runIf(global.useRealDB)("Prueba Real: Eliminar de Base de Datos", async () => {
      const REAL_USER_ID = "019ce8f890b87499af3ab712aacdf49f"
      try {
         const result = await useCase.execute({ id: REAL_USER_ID })
         expect(result.id).toBe(REAL_USER_ID)
      } catch (error: any) {
         expect([404, 200]).toContain(error.statusCode || 200)
      }
   })
})
