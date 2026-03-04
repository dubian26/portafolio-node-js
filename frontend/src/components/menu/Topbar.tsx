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
      <div className="p-2 flex justify-between items-center">
         <nav className="grow"></nav>
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
                     "size-10 min-w-10 rounded-full cursor-pointer flex items-center justify-center",
                     "text-primary hover:bg-primary/10 transition-colors"
                  )}
               >
                  <User size={20} />
               </button>
            </PerfilDialog>
         </nav>
      </div>
   )
}
