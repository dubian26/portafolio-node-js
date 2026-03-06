import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"
import { Moon, ShoppingCart, Sun } from "lucide-react"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"

const navItems = [
   { label: "Inicio", path: "/" },
   { label: "Registrarse", path: "/registrarse" },
   { label: "Tienda", path: "/tienda" },
   { label: "Acerca de", path: "/acerca-de" },
]

export const LoginNav = () => {
   const { theme, toggleTheme } = useTheme()
   const navigate = useNavigate()

   const handleNavigate = (path: string) => {
      navigate(path)
   }

   return (
      <header className={cn(
         "fixed top-0 left-0 right-0 z-50 glass-header border-b border-primary/10",
         "flex items-center justify-between px-6 lg:px-20 py-6",
      )}>
         <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
               <div className={cn(
                  "bg-primary p-2 rounded-lg flex items-center justify-center",
                  "text-primary-foreground shadow-lg shadow-primary/20"
               )}>
                  <ShoppingCart size={20} />
               </div>
               <h2 className="text-xl font-bold tracking-tight">ShopEase</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
               {
                  navItems.map(item =>
                     <a key={item.path} onClick={() => handleNavigate(item.path)} className={cn(
                        "cursor-pointer text-sm font-medium text-muted-foreground",
                        "hover:text-foreground transition-colors"
                     )}>
                        {item.label}
                     </a>
                  )
               }
            </nav>
         </div>
         <div className="flex items-center gap-6">
            <button className={cn(
               "hidden sm:block text-sm font-medium text-muted-foreground",
               "hover:text-foreground transition-colors cursor-pointer"
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
