import { unitOfWork } from "@/application/config/UnitOfWork"
import { RolListar } from "@/application/features/rol/RolListar"
import { Rol } from "@/domain/entities/Rol"
import { beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("@/application/config/UnitOfWork", async (importOriginal) => {
   if (global.useRealDB)
      return await importOriginal()

   return {
      unitOfWork: {
         rol: {
            listarTodos: vi.fn()
         }
      }
   }
})

describe("RolListar", () => {
   const useCase = new RolListar()

   beforeEach(() => {
      if (!global.useRealDB) vi.clearAllMocks()
   })

   it.skipIf(global.useRealDB)("debería listar todos los roles (Mock)", async () => {
      const mockRoles = [
         new Rol({ id: "1", nombre: "Admin", descripcion: "Desc", activo: true, fechaCreacion: new Date(), fechaModifica: new Date() }),
         new Rol({ id: "2", nombre: "User", descripcion: "Desc", activo: true, fechaCreacion: new Date(), fechaModifica: new Date() })
      ]

      vi.mocked(unitOfWork.rol.listarTodos).mockResolvedValue(mockRoles)

      const result = await useCase.execute()

      expect(result).toHaveLength(2)
      expect(result[0].nombre).toBe("Admin")
      expect(unitOfWork.rol.listarTodos).toHaveBeenCalled()
   })

   it.runIf(global.useRealDB)("Prueba Real: Listar roles de la Base de Datos", async () => {
      const result = await useCase.execute()
      expect(Array.isArray(result)).toBe(true)
      console.log(`Se encontraron ${result.length} roles en la DB.`)
   })
})
