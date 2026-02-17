import express from "express"
import UsuarioRoutes from "./routes/UsuarioRoutes"

const app = express()

app.use(express.json())

app.use("/v1", UsuarioRoutes)

export default app
