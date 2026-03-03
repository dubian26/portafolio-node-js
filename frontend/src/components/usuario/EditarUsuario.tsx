import { useAppContext } from "@/contexts/AppContext"
import { type UsuarioModel } from "@/models/UsuarioModel"
import { usuarioRepository } from "@/repositories/UsuarioRepository"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Password } from "@/components/ui/password"
import { Mail, User as UserIcon, Save } from "lucide-react"
import { useEffect, useState } from "react"

interface Props {
   id: string
   onUpdate?: () => void
}

export const EditarUsuario = ({ id, onUpdate }: Props) => {
   const { mostrarError, mostrarMensaje } = useAppContext()
   const [nombres, setNombres] = useState("")
   const [apellidos, setApellidos] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirPassword, setConfirPassword] = useState("")
   const [loading, setLoading] = useState(false)
   const [originalUsuario, setOriginalUsuario] = useState<UsuarioModel | null>(null)

   useEffect(() => {
      const cargarUsuario = async () => {
         try {
            setLoading(true)
            const usuario = await usuarioRepository.buscarPorId(id)
            if (usuario) {
               setOriginalUsuario(usuario)
               setNombres(usuario.nombres)
               setApellidos(usuario.apellidos)
               setEmail(usuario.email)
            } else {
               mostrarError("Usuario no encontrado")
            }
         } catch (error) {
            console.error(error)
            mostrarError("Error al cargar usuario")
         } finally {
            setLoading(false)
         }
      }

      if (id) {
         cargarUsuario()
      }
   }, [id, mostrarError])

   const handleClickActualizar = async () => {
      if (!nombres.trim()) {
         mostrarError("El nombre es obligatorio")
         return
      }

      if (!apellidos.trim()) {
         mostrarError("El apellido es obligatorio")
         return
      }

      if (!originalUsuario) return

      // Si el password no esta vacio, validamos y actualizamos
      if (password) {
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
      }

      setLoading(true)

      try {
         const usuarioActualizado: UsuarioModel = {
            ...originalUsuario,
            nombres: nombres,
            apellidos: apellidos,
            // Si password tiene valor lo actualizamos, sino mantenemos el anterior
            password: password ? password : originalUsuario.password
         }

         await usuarioRepository.actualizar(usuarioActualizado)
         mostrarMensaje("Usuario actualizado exitosamente")

         if (onUpdate) onUpdate()

         // Limpiamos campos de password
         setPassword("")
         setConfirPassword("")

      } catch (error) {
         mostrarError("Ocurrió un error al intentar actualizar el usuario")
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   if (!originalUsuario && !loading) return null

   return (
      <div className="grid grid-cols-12 gap-5 mt-4">
         <div className="col-span-12 space-y-1">
            <label className="text-sm pl-1 text-foreground">Email (Solo lectura)</label>
            <div className="relative group">
               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors" size={20} />
               <Input
                  placeholder="Email" value={email}
                  disabled={true} className="w-full pl-10 opacity-50 cursor-not-allowed"
                  readOnly
               />
            </div>
         </div>

         <div className="col-span-12 md:col-span-6 space-y-1">
            <label className="text-sm pl-1 text-foreground">Nombres</label>
            <div className="relative group">
               <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
               <Input
                  placeholder="Nombres" value={nombres}
                  disabled={loading} className="w-full pl-10"
                  onChange={(e) => setNombres(e.target.value)}
               />
            </div>
         </div>

         <div className="col-span-12 md:col-span-6 space-y-1">
            <label className="text-sm pl-1 text-foreground">Apellidos</label>
            <div className="relative group">
               <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
               <Input
                  placeholder="Apellidos" value={apellidos}
                  disabled={loading} className="w-full pl-10"
                  onChange={(e) => setApellidos(e.target.value)}
               />
            </div>
         </div>

         <div className="col-span-12 md:col-span-6 space-y-1">
            <label className="text-sm pl-1 text-foreground">Nueva contraseña</label>
            <Password
               password={password}
               disabled={loading}
               showStrengthScore={true}
               onChange={(pass) => setPassword(pass)}
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">Dejar en blanco para no cambiar</p>
         </div>

         <div className="col-span-12 md:col-span-6 space-y-1">
            <label className="text-sm pl-1 text-foreground">Confirmar nueva contraseña</label>
            <Password
               password={confirPassword}
               disabled={loading || !password}
               showStrengthScore={false}
               onChange={(pass) => setConfirPassword(pass)}
            />
         </div>

         <div className="col-span-12 flex justify-end mt-4 pt-4 border-t border-border">
            <Button
               disabled={loading} onClick={handleClickActualizar}
               className="cursor-pointer"
            >
               <Save size={16} className="mr-2" />
               {loading ? "Actualizando..." : "Actualizar"}
            </Button>
         </div>
      </div>
   )
}
