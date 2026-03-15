import { unitOfWork } from "@/application/config/UnitOfWork"
import { UsuarioCrearCuenta } from "@/application/features/usuario/UsuarioCrearCuenta"
import { Rol } from "@/domain/entities/Rol"
import { CustomError } from "@/domain/errors/CustomError"
import { beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("@/application/config/UnitOfWork", async (importOriginal) => {
   if (global.useRealDB)
      return await importOriginal()

   return {
      unitOfWork: {
         usuario: {
            buscarPorEmail: vi.fn(),
            insertar: vi.fn()
         },
         rol: {
            buscarPorNombre: vi.fn()
         },
         codigoVerificacion: {
            insertar: vi.fn()
         },
         emailService: {
            enviarEmail: vi.fn()
         }
      }
   }
})

describe("UsuarioCrearCuenta", () => {
   const useCase = new UsuarioCrearCuenta()

   beforeEach(() => {
      if (!global.useRealDB) vi.clearAllMocks()
   })

   it.skipIf(global.useRealDB)("debería crear una cuenta exitosamente", async () => {
      const props = {
         email: "test@example.com",
         password: "password123",
         nombres: "Juan",
         apellidos: "Perez"
      }

      vi.mocked(unitOfWork.usuario.buscarPorEmail).mockResolvedValue(null)
      vi.mocked(unitOfWork.rol.buscarPorNombre).mockResolvedValue({ id: "rol-id", nombre: Rol.CLIENTE } as any)
      vi.mocked(unitOfWork.usuario.insertar).mockResolvedValue(undefined)
      vi.mocked(unitOfWork.codigoVerificacion.insertar).mockResolvedValue(undefined)

      const result = await useCase.execute(props)

      expect(result.email).toBe(props.email)
      expect(result.mensaje).toContain("Usuario creado")
      expect(unitOfWork.usuario.insertar).toHaveBeenCalled()
      expect(unitOfWork.codigoVerificacion.insertar).toHaveBeenCalled()
      expect(unitOfWork.emailService.enviarEmail).toHaveBeenCalled()
   })

   it.skipIf(global.useRealDB)("debería lanzar error si el usuario ya existe", async () => {
      const props = {
         email: "existing@example.com",
         password: "password123",
         nombres: "Juan",
         apellidos: "Perez"
      }

      vi.mocked(unitOfWork.usuario.buscarPorEmail).mockResolvedValue({ id: "1" } as any)

      await expect(useCase.execute(props)).rejects.toThrow(CustomError)
      await expect(useCase.execute(props)).rejects.toThrow("El usuario ya existe")
   })

   it.skipIf(global.useRealDB)("debería lanzar error si el rol CLIENTE no existe", async () => {
      const props = {
         email: "test@example.com",
         password: "password123",
         nombres: "Juan",
         apellidos: "Perez"
      }

      vi.mocked(unitOfWork.usuario.buscarPorEmail).mockResolvedValue(null)
      vi.mocked(unitOfWork.rol.buscarPorNombre).mockResolvedValue(null)

      await expect(useCase.execute(props)).rejects.toThrow(CustomError)
      await expect(useCase.execute(props)).rejects.toThrow("no existe")
   })
})
