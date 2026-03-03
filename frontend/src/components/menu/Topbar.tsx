import { PerfilDialog } from "@/components/menu/PerfilDialog"
import { useCart } from "@/contexts/CartContext"
import { cn } from "@/lib/utils"
import { ShoppingCart, User } from "lucide-react"

export const Topbar = () => {
   const { cart, toggleCart } = useCart()

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
               {totalItems > 0 && (
                  <span className="topbar-cart-badge">
                     {totalItems > 99 ? "99+" : totalItems}
                  </span>
               )}
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
