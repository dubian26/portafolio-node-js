import { PerfilDialog } from "@/components/menu/PerfilDialog"
import { useCart } from "@/contexts/CartContext"
import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"
import { Moon, ShoppingCart, Sun, User } from "lucide-react"
import { motion } from "motion/react"

export const Topbar = () => {
   const { cart, toggleCart } = useCart()
   const { theme, toggleTheme } = useTheme()
   const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0)

   return (
      <div className={cn(
         "fixed top-0 left-0 right-0 z-50 glass-header",
         "p-2 flex justify-between items-center"
      )}>
         <div className="flex items-center gap-3">
            <div className={cn(
               "bg-primary p-2 rounded-lg flex items-center justify-center",
               "text-primary-foreground shadow-lg shadow-primary/20"
            )}>
               <ShoppingCart size={20} />
            </div>
            <h2 className="text-xl font-bold tracking-tight">ShopEase</h2>
         </div>
         <nav className="flex-1"></nav>
         <nav className="w-52 shrink-0 flex justify-end gap-1">
            <button
               onClick={toggleCart}
               className={cn(
                  "size-10 min-w-10 rounded-full cursor-pointer relative",
                  "flex items-center justify-center text-primary",
                  "hover:bg-primary/10 transition-colors"
               )}
            >
               <ShoppingCart size={20} />
               {
                  totalItems > 0 &&
                  <span className="topbar-cart-badge">
                     {totalItems > 99 ? "99+" : totalItems}
                  </span>
               }
            </button>
            <button
               onClick={toggleTheme}
               className={cn(
                  "size-10 min-w-10 rounded-full cursor-pointer relative",
                  "flex items-center justify-center text-primary",
                  "hover:bg-primary/10 transition-colors"
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
            </button>
            <PerfilDialog>
               <button
                  className={cn(
                     "size-10 min-w-10 rounded-full cursor-pointer",
                     "flex items-center justify-center text-primary",
                     "hover:bg-primary/10 transition-colors"
                  )}
               >
                  <User size={20} />
               </button>
            </PerfilDialog>
         </nav>
      </div>
   )
}
