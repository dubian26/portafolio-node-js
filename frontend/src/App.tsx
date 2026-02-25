
import { LoginPage } from "@/pages/LoginPage"

export const App = () => {
   return (
      <div className="min-h-screen flex flex-col relative overflow-hidden">
         <div className="fixed inset-0 z-0 bg-dots pointer-events-none" />
         <div className="fixed inset-0 -top-[50%] flex items-start justify-center pointer-events-none">
            <div className="w-[70%] h-[70%] decorative-blob rounded-full pointer-events-none" />
         </div>
         <LoginPage />
      </div>
   )
}
