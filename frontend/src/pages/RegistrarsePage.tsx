
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Password } from "@/components/ui/password"
import { useAppContext } from "@/contexts/AppContext"
import { cn } from "@/lib/utils"
import { type UsuarioModel } from "@/models/UsuarioModel"
import { usuarioRepository } from "@/repositories/UsuarioRepository"
import { Mail, User } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

export const RegistrarsePage = () => {
   const { mostrarError, mostrarMensaje } = useAppContext()
   const [nombres, setNombres] = useState("")
   const [apellidos, setApellidos] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirPassword, setConfirPassword] = useState("")
   const [loading, setLoading] = useState(false)

   const handleClickRegistrar = async () => {
      if (!nombres.trim()) {
         mostrarError("El nombre es obligatorio")
         return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
         mostrarError("Email no es válido")
         return
      }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/
      if (!passwordRegex.test(password)) {
         const mensaje = `
            Password debe tener: al menos una minúscula, 
            al menos una mayúscula, al menos un número, 
            al menos un caracter especial @$!%*?& y 
            mínimo 7 caracteres
         `
         mostrarError(mensaje)
         return
      }

      if (password !== confirPassword) {
         mostrarError("Las contraseñas no coinciden")
         return
      }

      setLoading(true)

      try {
         const nuevoUsuario: UsuarioModel = {
            id: crypto.randomUUID().replaceAll("-", ""),
            nombres: nombres,
            apellidos: apellidos,
            email,
            password,
            rol: "cliente",
            fechaCreacion: new Date()
         }

         await usuarioRepository.crearCuenta(nuevoUsuario)
         mostrarMensaje("Usuario creado exitosamente")

         setNombres("")
         setApellidos("")
         setEmail("")
         setPassword("")
         setConfirPassword("")

      } catch (error) {
         mostrarError("Ocurrió un error al intentar registrar el usuario")
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   return (
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5 }}
         className="w-full max-w-2xl"
      >
         <Card className="p-8 shadow-lg border-2 border-border">
            <h1 className="text-3xl font-bold mb-2">Bienvenido</h1>

            <div className="grid grid-cols-12 gap-2">
               <div className="col-span-12 space-y-2">
                  <label className="text-sm font-semibold block px-1 text-foreground">Correo Electrónico</label>
                  <div className="relative group">
                     <Mail className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2",
                        "text-muted-foreground group-focus-within:text-primary",
                        "transition-colors"
                     )} size={20} />
                     <Input
                        type="email" placeholder="name@example.com"
                        value={email} disabled={loading}
                        className="pl-10 w-full"
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>
               </div>

               <div className="col-span-12 md:col-span-6 space-y-2">
                  <label className="text-sm font-semibold block px-1 text-foreground">Nombres</label>
                  <div className="relative group">
                     <User className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2",
                        "text-muted-foreground group-focus-within:text-primary",
                        "transition-colors"
                     )} size={20} />
                     <Input
                        type="text" placeholder="John"
                        value={nombres} disabled={loading}
                        className="pl-10 w-full"
                        onChange={(e) => setNombres(e.target.value)}
                     />
                  </div>
               </div>

               <div className="col-span-12 md:col-span-6 space-y-2">
                  <label className="text-sm font-semibold block px-1 text-foreground">Apellidos</label>
                  <div className="relative group">
                     <User className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2",
                        "text-muted-foreground group-focus-within:text-primary",
                        "transition-colors"
                     )} size={20} />
                     <Input
                        type="text" placeholder="Doe"
                        value={apellidos} disabled={loading}
                        className="pl-10 w-full"
                        onChange={(e) => setApellidos(e.target.value)}
                     />
                  </div>
               </div>

               <div className="col-span-12 md:col-span-6 space-y-2">
                  <label className="text-sm font-semibold block px-1 text-foreground">Contraseña</label>
                  <Password
                     password={password} disabled={loading}
                     onChange={pass => setPassword(pass)}
                  />
               </div>

               <div className="col-span-12 md:col-span-6 space-y-2">
                  <label className="text-sm font-semibold block px-1 text-foreground">Confirmar Contraseña</label>
                  <Password
                     password={confirPassword} disabled={loading}
                     onChange={pass => setConfirPassword(pass)}
                  />
               </div>

               <div className="col-span-12 flex justify-end mt-3">
                  <Button
                     disabled={loading}
                     onClick={handleClickRegistrar}
                  >
                     Registrarme
                  </Button>
               </div>
            </div>
         </Card>
      </motion.div>
   )
}
