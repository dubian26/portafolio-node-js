import { Headphones, Rocket, ShieldCheck } from "lucide-react"
import { motion } from "motion/react"
import { FeatureCard } from "../common/FeatureCard"

export const LoginFeatures = () => {
   return (
      <motion.div
         initial={{ opacity: 0, x: 20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5, delay: 0.2 }}
         className="flex-1 flex flex-col gap-8 max-w-xl"
      >
         <div className="mb-4">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Features</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold mt-3 leading-tight">
               Por que escoger ShopEase?
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
               Hemos creado la mejor experiencia de compra
               con velocidad, seguridad y pensando en ti.
            </p>
         </div>

         <div className="grid gap-6">
            <FeatureCard
               icon={<Rocket className="text-primary" size={24} />}
               title="Envío Rápido"
               description={
                  "Entrega ultrarrápida en todos los pedidos. " +
                  "La mayoría de los artículos llegan a tu puerta en 48 horas."
               }
            />
            <FeatureCard
               icon={<ShieldCheck className="text-primary" size={24} />}
               title="Pagos Seguros"
               description={
                  "Tus datos están encriptados con seguridad de nivel bancario. " +
                  "Compra con tranquilidad sabiendo que tus datos están seguros."
               }
            />
            <FeatureCard
               icon={<Headphones className="text-primary" size={24} />}
               title="Soporte 24/7"
               description={
                  "Nuestro equipo dedicado está siempre aquí para ayudar. " +
                  "Contáctanos en cualquier momento por chat, correo electrónico o teléfono."
               }
            />
         </div>
      </motion.div>
   )
}