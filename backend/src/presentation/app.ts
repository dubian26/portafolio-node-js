import { errorHandler } from "@/presentation/middlewares/errorHandler"
import UsuarioRoutes from "@/presentation/routes/UsuarioRoutes"
import RolRoutes from "@/presentation/routes/RolRoutes"
import CaracteristicaRoutes from "@/presentation/routes/CaracteristicaRoutes"
import cookieParser from "cookie-parser"
import express from "express"

const app = express()
app.set("trust proxy", 1)

app.use(express.json())
app.use(cookieParser())

// CORS Middleware
app.use((req, res, next) => {
   const origin = req.headers.origin
   const frontendUrl = process.env.FRONTEND_URL

   if (origin && frontendUrl && origin === frontendUrl) {
      res.header("Access-Control-Allow-Origin", origin)
   }

   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
   res.header("Access-Control-Allow-Credentials", "true")

   if (req.method === "OPTIONS") {
      res.sendStatus(200)
      return
   }

   next()
})

app.use("/v1", UsuarioRoutes)
app.use("/v1/roles", RolRoutes)
app.use("/v1/caracteristicas", CaracteristicaRoutes)

app.use(errorHandler)

export default app
