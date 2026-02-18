import { errorHandler } from "@/presentation/middlewares/errorHandler"
import UsuarioRoutes from "@/presentation/routes/UsuarioRoutes"
import express from "express"

const app = express()

app.use(express.json())

// CORS Middleware manually to avoid installing dependencies if not possible
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "http://localhost:5173")
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

   if (req.method === "OPTIONS") {
      res.sendStatus(200)
      return
   }

   next()
})

app.use("/v1", UsuarioRoutes)

app.use(errorHandler)

export default app
