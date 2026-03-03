import { App } from "@/App"
import { AppProvider } from "@/contexts/AppProvider"
import { CartProvider } from "@/contexts/CartProvider"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <AppProvider>
         <CartProvider>
            <App />
         </CartProvider>
      </AppProvider>
   </StrictMode>
)
