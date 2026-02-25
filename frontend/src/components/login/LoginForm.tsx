import { cn } from "@/utils/common"
import { AtSign, Eye, Lock, Mail, Volume2 } from "lucide-react"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
   const navigate = useNavigate()

   const handleClickRegis = () => {
      navigate("/registrarse")
   }

   return (
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5 }}
         className="w-full max-w-md"
      >
         <div className="bg-card-dark p-8 rounded-2xl shadow-2xl border border-white/5">
            <div className="mb-8">
               <h1 className="text-3xl font-bold mb-2">Bienvenido</h1>
               <p className="text-slate-400 text-sm">
                  Ingresa tus credenciales para acceder a tu cuenta.
               </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
               <div className="space-y-2">
                  <label className="text-sm font-semibold block px-1 text-slate-300">Correo Electrónico</label>
                  <div className="relative group">
                     <Mail className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2",
                        "text-slate-500 group-focus-within:text-primary",
                        "transition-colors"
                     )} size={18} />
                     <input
                        type="email" placeholder="name@example.com"
                        className={cn(
                           "w-full pl-10 pr-4 py-3 bg-white/5 border",
                           "border-white/10 rounded-xl focus:ring-2",
                           "focus:ring-primary focus:border-transparent",
                           "outline-none transition-all text-white",
                           "placeholder:text-slate-600"
                        )}
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                     <label className="text-sm font-semibold block text-slate-300">Contraseña</label>
                     <a href="#" className="text-xs text-primary font-semibold hover:underline">¿Olvidaste tu contraseña?</a>
                  </div>
                  <div className="relative group">
                     <Lock className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2",
                        "text-slate-500 group-focus-within:text-primary",
                        "transition-colors"
                     )} size={18} />
                     <input
                        type="password" placeholder="••••••••"
                        className={cn(
                           "w-full pl-10 pr-10 py-3 bg-white/5 border",
                           "border-white/10 rounded-xl focus:ring-2",
                           "focus:ring-primary focus:border-transparent",
                           "outline-none transition-all text-white",
                           "placeholder:text-slate-600"
                        )}
                     />
                     <button type="button" className={cn(
                        "absolute right-3 top-1/2 -translate-y-1/2",
                        "text-slate-500 hover:text-white",
                        "transition-colors"
                     )}>
                        <Eye size={18} />
                     </button>
                  </div>
               </div>

               <button className={cn(
                  "w-full bg-primary hover:bg-primary/90 text-white font-bold",
                  "py-3.5 rounded-xl transition-all transform active:scale-[0.98]",
                  "shadow-lg shadow-primary/25 mt-4"
               )}>
                  Iniciar Sesión
               </button>
            </form>

            <div className="mt-8 text-center">
               <p className="text-sm text-slate-400">
                  ¿No tienes una cuenta?
                  <a
                     onClick={handleClickRegis}
                     className="text-primary font-bold hover:underline ml-1">
                     Registrarse
                  </a>
               </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex justify-center gap-4">
               <button className={cn(
                  "p-3 border border-white/10 rounded-xl hover:bg-white/5",
                  "transition-colors text-slate-400 hover:text-white"
               )}>
                  <AtSign size={20} />
               </button>
               <button className={cn(
                  "p-3 border border-white/10 rounded-xl hover:bg-white/5",
                  "transition-colors text-slate-400 hover:text-white"
               )}>
                  <Volume2 size={20} />
               </button>
            </div>
         </div>
      </motion.div>
   )
}
