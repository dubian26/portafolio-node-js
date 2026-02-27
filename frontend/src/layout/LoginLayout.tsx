import { LoginNav } from "@/components/login/LoginNav"
import { cn } from "@/lib/utils"
import { Fragment } from "react"
import { Outlet } from "react-router-dom"

export const LoginLayout = () => {
   return (
      <Fragment>
         <LoginNav />

         <main className={cn(
            "relative z-10 flex-1 flex flex-col lg:flex-row items-center",
            "justify-center gap-16 px-6 lg:px-24 py-12 lg:py-20"
         )}>
            <Outlet />
         </main>

         <footer className="relative z-10 px-6 lg:px-20 py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground">
            <p>© 2026 ShopEase Inc. All rights reserved.</p>
            <div className="flex gap-8">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
               <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
         </footer>
      </Fragment>
   )
}