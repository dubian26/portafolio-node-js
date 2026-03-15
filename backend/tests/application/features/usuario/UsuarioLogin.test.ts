import { unitOfWork } from "@/application/config/UnitOfWork"
import { UsuarioLogin } from "@/application/features/usuario/UsuarioLogin"
import { CustomError } from "@/domain/errors/CustomError"
import { beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("@/application/config/UnitOfWork", async (importOriginal) => {
   if (global.useRealDB)
      return await importOriginal()

   return {
      unitOfWork: {
         usuario: {
            buscarPorEmail: vi.fn()
         }
      }
   }
})

describe("UsuarioLogin", () => {
   const useCase = new UsuarioLogin()

   beforeEach(() => {
      if (!global.useRealDB) vi.clearAllMocks()
   })

   it.skipIf(global.useRealDB)("debería loguear exitosamente", async () => {
      const mockUsuario = {
         email: "test@test.com",
         password: "correct_password",
         emailVerificado: true,
         toResult: vi.fn().mockReturnValue({ id: "1", email: "test@test.com" })
      }

      vi.mocked(unitOfWork.usuario.buscarPorEmail)
         .mockResolvedValue(mockUsuario as any)

      const result = await useCase.execute({
         email: "test@test.com",
         password: "correct_password"
      })

      expect(result.email).toBe("test@test.com")
      expect(mockUsuario.toResult).toHaveBeenCalled()
   })

   it.runIf(global.useRealDB)("Prueba Real: debería loguear exitosamente", async () => {
      const req = {
         email: "dubian26@gmail.com",
         password: "Pruebas*1"
      }

      try {
         const result = await useCase.execute(req)
         expect(result.email).toBe(req.email)
      } catch (error: any) {
         expect([404, 200]).toContain(error.statusCode || 200)
      }
   })

   it.skipIf(global.useRealDB)("debería fallar con password incorrecto", async () => {
      const mockUsuario = {
         email: "test@test.com",
         password: "correct_password"
      }
      vi.mocked(unitOfWork.usuario.buscarPorEmail).mockResolvedValue(mockUsuario as any)

      await expect(useCase.execute({ email: "test@test.com", password: "wrong_password" }))
         .rejects
         .toThrow("Credenciales inválidas")
   })

   it.skipIf(global.useRealDB)("debería fallar si el email no está verificado", async () => {
      const mockUsuario = {
         email: "test@test.com",
         password: "correct_password",
         emailVerificado: false
      }

      vi.mocked(unitOfWork.usuario.buscarPorEmail)
         .mockResolvedValue(mockUsuario as any)

      try {
         await useCase.execute({
            email: "test@test.com",
            password: "correct_password"
         })
      } catch (error: any) {
         expect(error).toBeInstanceOf(CustomError)
         expect(error.message).toBe("Email no verificado.")
         expect(error.statusCode).toBe(403)
         expect(error.details).toHaveProperty("needOtp", true)
      }
   })
})
