import { unitOfWork } from "@/application/config/UnitOfWork"
import { RolCrear } from "@/application/features/rol/RolCrear"
import { CustomError } from "@/domain/errors/CustomError"
import { beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("@/application/config/UnitOfWork", async (importOriginal) => {
   if (global.useRealDB)
      return await importOriginal()

   return {
      unitOfWork: {
         rol: {
            buscarPorNombre: vi.fn(),
            insertar: vi.fn()
         }
      }
   }
})

describe("RolCrear", () => {
   const useCase = new RolCrear()

   beforeEach(() => {
      if (!global.useRealDB) vi.clearAllMocks()
   })

   it.skipIf(global.useRealDB)("debería crear un rol exitosamente (Mock)", async () => {
      const props = {
         nombre: "ADMIN_TEST",
         descripcion: "Descripción de prueba"
      }

      vi.mocked(unitOfWork.rol.buscarPorNombre).mockResolvedValue(null)
      vi.mocked(unitOfWork.rol.insertar).mockResolvedValue(undefined)

      const result = await useCase.execute(props)

      expect(result.mensaje).toContain("éxito")
      expect(unitOfWork.rol.insertar).toHaveBeenCalled()
   })

   it.skipIf(global.useRealDB)("debería lanzar error si el rol ya existe (Mock)", async () => {
      const props = { nombre: "EXISTENTE" }
      vi.mocked(unitOfWork.rol.buscarPorNombre).mockResolvedValue({ id: "1" } as any)

      await expect(useCase.execute(props)).rejects.toThrow(CustomError)
      await expect(useCase.execute(props)).rejects.toThrow("ya existe")
   })

   it.runIf(global.useRealDB)("Prueba Real: Crear un Rol en la Base de Datos", async () => {
      const props = {
         nombre: `TEST_ROL_${Date.now()}`,
         descripcion: "Rol creado desde test real"
      }

      const result = await useCase.execute(props)
      expect(result.mensaje).toContain("éxito")
      expect(result.id).toBeDefined()
   })
})
