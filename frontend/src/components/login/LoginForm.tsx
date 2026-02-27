import { useAppContext } from "@/contexts/AppContext"
import { cn } from "@/lib/utils"
import { AtSign, Eye, Lock, Mail, Volume2 } from "lucide-react"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const LoginForm = () => {
   const navigate = useNavigate()
   const { mostrarMensaje } = useAppContext()

   const handleClickRegis = () => {
      navigate("/registrarse")
   }

   const handleClickLogin = () => {
      mostrarMensaje("Login")
   }

   return (
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5 }}
         className="w-full max-w-md"
      >
         <Card className="p-8 shadow-lg border-2 border-border">
            <div className="mb-8">
               <h1 className="text-3xl font-bold mb-2">Bienvenido</h1>
               <p className="text-muted-foreground text-sm">
                  Ingresa tus credenciales para acceder a tu cuenta.
               </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
               <div className="space-y-2">
                  <label className="text-sm font-semibold block px-1 text-foreground">Correo Electrónico</label>
                  <div className="relative group">
                     <Mail className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2",
                        "text-muted-foreground group-focus-within:text-primary",
                        "transition-colors"
                     )} size={20} />
                     <Input
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                     <label className="text-sm font-semibold block text-foreground">Contraseña</label>
                     <a href="#" className="text-xs text-primary font-semibold hover:underline">¿Olvidaste tu contraseña?</a>
                  </div>
                  <div className="relative group">
                     <Lock className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2",
                        "text-muted-foreground group-focus-within:text-primary",
                        "transition-colors"
                     )} size={20} />
                     <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                     />
                     <button type="button" className={cn(
                        "absolute right-3 top-1/2 -translate-y-1/2",
                        "text-muted-foreground hover:text-foreground",
                        "transition-colors"
                     )}>
                        <Eye size={20} />
                     </button>
                  </div>
               </div>

               <Button
                  onClick={handleClickLogin}
                  className="w-full mt-4 cursor-pointer">
                  Iniciar Sesión
               </Button>
            </form>

            <div className="mt-8 text-center">
               <p className="text-sm text-muted-foreground">
                  ¿No tienes una cuenta?
                  <a
                     onClick={handleClickRegis}
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
         </Card>
      </motion.div>
   )
}
