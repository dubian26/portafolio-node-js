import { Title } from "@/components/common/Title"
import { Button } from "@/components/ui/button"
import * as Card from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Password } from "@/components/ui/password"
import { useAppContext } from "@/contexts/AppContext"
import { cn } from "@/lib/utils"
import { usuarioRepository } from "@/repositories/UsuarioRepository"
import { AtSign, Loader2, LogIn, Mail, Volume2 } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)
   const { mostrarError, login } = useAppContext()
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const handleClickLogin = async () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
         mostrarError("Email no es válido")
         return
      }

      setLoading(true)

      try {
         const userInfo = await usuarioRepository.autenticar(email, password)
         if (userInfo === undefined) throw new Error("Usuario o password incorrecto")
         login(userInfo)
         navigate("/contenido")
      } catch (error) {
         console.error(error)
         mostrarError("Falló la autenticación")
      } finally {
         setLoading(false)
      }
   }

   return (
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5 }}
         className="w-full max-w-md"
      >
         <Card.Root className="p-8 shadow-lg border-2 border-border">
            <div className="mb-8">
               <Title>Bienvenido</Title>
               <p className="text-muted-foreground text-sm">
                  Ingresa tus credenciales para acceder a tu cuenta.
               </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
               <div className="space-y-1">
                  <label className="text-sm block px-1 text-foreground">Correo Electrónico</label>
                  <div className="relative group">
                     <Mail className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2",
                        "text-muted-foreground group-focus-within:text-primary",
                        "transition-colors"
                     )} size={20} />
                     <Input
                        type="email" placeholder="name@example.com"
                        className="pl-10" value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                  </div>
               </div>

               <div className="space-y-1">
                  <div className="flex justify-between items-center px-1">
                     <label className="text-sm block text-foreground">Contraseña</label>
                     <a href="#" className="text-xs text-primary font-semibold hover:underline">¿Olvidaste tu contraseña?</a>
                  </div>
                  <div className="relative group">
                     <Password
                        password={password}
                        showStrengthScore={false}
                        onChange={pass => setPassword(pass)}
                     />
                  </div>
               </div>

               <Button
                  onClick={handleClickLogin}
                  className="w-full mt-4 cursor-pointer">
                  {
                     loading ?
                        <Loader2 className="animate-spin" size={20} /> :
                        <LogIn size={20} strokeWidth={3} />
                  }
                  {
                     loading ? "Iniciando sesión..." : "Iniciar sesión"
                  }
               </Button>
            </form>

            <div className="mt-8 text-center">
               <p className="text-sm text-muted-foreground">
                  ¿No tienes una cuenta?
                  <a
                     onClick={() => navigate("/registrarse")}
                     className="text-primary font-bold hover:underline ml-1 cursor-pointer">
                     Registrarse
                  </a>
               </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border flex justify-center gap-4">
               <Button variant="ghost" className="p-3 rounded-xl">
                  <AtSign size={20} />
               </Button>
               <Button variant="ghost" className="p-3 rounded-xl">
                  <Volume2 size={20} />
               </Button>
            </div>
         </Card.Root>
      </motion.div>
   )
}
