import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/utils/common"
import { Moon, ShoppingCart, Sun } from "lucide-react"
import { motion } from "motion/react"

export const LoginNav = () => {
   const { theme, toggleTheme } = useTheme()

   return (
      <header className={cn(
         "relative z-10 flex items-center justify-between",
         "px-6 lg:px-20 py-6 border-b border-white/5 backdrop-blur-md"
      )}>
         <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
               <div className={cn(
                  "bg-primary p-2 rounded-lg flex items-center justify-center",
                  "text-white shadow-lg shadow-primary/20"
               )}>
                  <ShoppingCart size={20} />
               </div>
               <h2 className="text-xl font-bold tracking-tight">ShopEase</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
               {
                  ["Inicio", "Registrarse", "Tienda", "Acerca de"].map(item =>
                     <a key={item} href="#" className={cn(
                        "text-sm font-medium text-slate-400",
                        "hover:text-white transition-colors"
                     )}>
                        {item}
                     </a>
                  )
               }
            </nav>
         </div>
         <div className="flex items-center gap-6">
            <button className={cn(
               "hidden sm:block text-sm font-medium text-slate-400",
               "hover:text-white transition-colors cursor-pointer"
            )}>
               Contacta Soporte
            </button>
            <motion.button
               id="theme-toggle" onClick={toggleTheme}
               whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
               aria-label={theme === "dark" ? "Tema claro" : "Tema oscuro"}
               className={cn(
                  "theme-toggle-btn size-10 rounded-lg flex",
                  "items-center justify-center transition-all"
               )}
            >
               <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
               >
                  {
                     theme === "dark" ?
                        <Sun className="size-5 text-primary" /> :
                        <Moon className="size-5 text-primary" />
                  }
               </motion.div>
            </motion.button>
         </div>
      </header>
   )
}
