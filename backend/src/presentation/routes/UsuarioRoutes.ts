import { UsuarioCrearCuenta } from "@/application/features/usuario/UsuarioCrearCuenta"
import { UsuarioLogin } from "@/application/features/usuario/UsuarioLogin"
import { UsuarioPorEmail } from "@/application/features/usuario/UsuarioPorEmail"
import { CustomError } from "@/domain/errors/CustomError"
import { UserInfo } from "@/domain/models/UserInfo"
import { tokenBuilder } from "@/presentation/utils/tokenBuilder"
import { Router } from "express"
import jwt from "jsonwebtoken"

const router = Router()

router.post("/crear-cuenta-usuario", async (req, res) => {
   const useCase = new UsuarioCrearCuenta()
   const idResult = await useCase.execute(req.body)
   res.json(idResult)
})

router.post("/login", async (req, res) => {
   const useCase = new UsuarioLogin()
   const usuario = await useCase.execute(req.body)

   const userInfo: UserInfo = {
      id: usuario.id,
      email: usuario.email,
      nombre: `${usuario.nombres} ${usuario.apellidos}`,
      rol: usuario.rol
   }

   const accessToken = tokenBuilder({
      tipoToken: "access",
      userInfo
   })

   res.cookie("accessToken", accessToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: accessToken.expTokenMs
   })

   const refreshToken = tokenBuilder({
      tipoToken: "refresh",
      userInfo
   })

   res.cookie("refreshToken", refreshToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: refreshToken.expTokenMs
   })

   res.json(userInfo)
})

router.post("/refrescar-token", async (req, res) => {
   try {
      const { refreshToken } = req.cookies

      if (!refreshToken) {
         throw new CustomError("Token de refresco no encontrado.", 401)
      }

      const jwtSecret = process.env.JWT_SECRET || ""
      const jwtEmisor = process.env.JWT_EMISOR || ""

      const decodedToken = jwt.verify(refreshToken, jwtSecret, {
         issuer: jwtEmisor
      }) as UserInfo

      const userInfo: UserInfo = {
         id: decodedToken.id,
         email: decodedToken.email,
         nombre: decodedToken.nombre,
         rol: decodedToken.rol
      }

      const newAccessToken = tokenBuilder({
         tipoToken: "access",
         userInfo
      })

      res.cookie("accessToken", newAccessToken.token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: newAccessToken.expTokenMs
      })

      res.json({ message: "Token refrescado" })

   } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
         throw new CustomError("Sesión expirada. Por favor, inicie sesión nuevamente.", 401)
      }
      throw new CustomError("Error al refrescar el token.", 401)
   }
})

router.post("/buscar-usuario-por-email", async (req, res) => {
   const useCase = new UsuarioPorEmail()
   const usuario = await useCase.execute(req.body)
   res.json(usuario)
})

export default router
