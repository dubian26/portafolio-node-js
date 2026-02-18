import { errorHandler } from "@/presentation/middlewares/errorHandler"
import UsuarioRoutes from "@/presentation/routes/UsuarioRoutes"
import express from "express"

const app = express()

app.use(express.json())

app.use("/v1", UsuarioRoutes)

app.use(errorHandler)

export default app
