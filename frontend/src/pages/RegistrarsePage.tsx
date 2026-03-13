import { Title } from "@/components/common/Title"
import { Button } from "@/components/ui/button"
import * as Card from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Password } from "@/components/ui/password"
import { Separator } from "@/components/ui/separator"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { useAppContext } from "@/contexts/AppContext"
import { cn } from "@/lib/utils"
import { type UsuarioModel } from "@/models/UsuarioModel"
import { usuarioRepository } from "@/repositories/UsuarioRepository"
import { Loader2, Mail, User, UserRoundPlus, CheckCircle2 } from "lucide-react"
import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const GoogleIcon = () => (
   <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
   </svg>
)

const OutlookIcon = () => (
   <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M24 7.387v10.478c0 .23-.08.424-.238.576a.806.806 0 0 1-.587.234h-8.55V7.1l1.2.638 1.08-.638h6.85c.23 0 .424.08.576.234A.79.79 0 0 1 24 7.387z" fill="#0072C6" />
      <path d="M24 7.387c0-.152-.037-.295-.1-.418l-.137-.208-.19-.13L17.35 10.5l-2.725-3.9h-8.55v11.4h8.55V7.387H24z" fill="#0072C6" />
      <path d="M14.625 18V7.1l2.725 3.4L24 6.63v.757L17.35 10.5l-2.725-3.4z" fill="#0072C6" opacity="0.5" />
      <path d="M0 4.125v15.75C0 20.496.504 21 1.125 21h12.75c.621 0 1.125-.504 1.125-1.125V4.125C15 3.504 14.496 3 13.875 3H1.125C.504 3 0 3.504 0 4.125z" fill="#0072C6" />
      <path d="M3.818 8.412c.576-.396 1.278-.594 2.107-.594.803 0 1.49.201 2.058.603.57.402.862 1.098.862 2.088v3.093c0 .966-.294 1.653-.88 2.061-.588.408-1.266.612-2.04.612-.822 0-1.524-.198-2.107-.594-.582-.396-.874-1.086-.874-2.07v-3.13c0-.972.29-1.665.874-2.07zm1.053 5.006c.162.258.426.387.792.387.366 0 .63-.13.792-.387.162-.258.243-.63.243-1.116V9.624c0-.486-.081-.858-.243-1.116-.162-.258-.426-.387-.792-.387-.366 0-.63.13-.792.387-.162.258-.243.63-.243 1.116v2.678c0 .486.081.858.243 1.116z" fill="white" />
   </svg>
)

export const RegistrarsePage = () => {
   const { mostrarError, mostrarMensaje } = useAppContext()
   const navigate = useNavigate()
   
   const [step, setStep] = useState<"REGISTER" | "VERIFY">("REGISTER")
   
   const [nombres, setNombres] = useState("")
   const [apellidos, setApellidos] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirPassword, setConfirPassword] = useState("")
   const [loading, setLoading] = useState(false)

   const [otp, setOtp] = useState("")
   const [countdown, setCountdown] = useState(60)

   useEffect(() => {
      if (step === "VERIFY" && countdown > 0) {
         const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
         return () => clearTimeout(timer)
      }
   }, [step, countdown])

   const handleClickRegistrar = async () => {
      if (!nombres.trim()) {
         mostrarError("El nombre es obligatorio")
         return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
         mostrarError("Email no es válido")
         return
      }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/
      if (!passwordRegex.test(password)) {
         const mensaje = `
            Password debe tener: al menos una minúscula, 
            al menos una mayúscula, al menos un número, 
            al menos un caracter especial @$!%*?& y 
            mínimo 7 caracteres
         `
         mostrarError(mensaje)
         return
      }

      if (password !== confirPassword) {
         mostrarError("Las contraseñas no coinciden")
         return
      }

      setLoading(true)

      try {
         const nuevoUsuario: UsuarioModel = {
            id: crypto.randomUUID().replaceAll("-", ""),
            nombres: nombres,
            apellidos: apellidos,
            email,
            password,
            rol: "cliente",
            fechaCreacion: new Date()
         }

         await usuarioRepository.crearCuenta(nuevoUsuario)
         mostrarMensaje("Cuenta creada. Hemos enviado un código a tu correo.")
         setStep("VERIFY")
         setCountdown(60)

      } catch (error) {
         const err = error as { message?: string }
         mostrarError(err?.message || "Ocurrió un error al intentar registrar el usuario")
      } finally {
         setLoading(false)
      }
   }

   const handleClickVerificar = async () => {
      if (otp.length !== 6) {
         mostrarError("El código debe tener 6 dígitos")
         return
      }

      setLoading(true)
      try {
         const response = await usuarioRepository.verificarEmail(email, otp)
         mostrarMensaje(response.mensaje)
         navigate("/login")
      } catch (error) {
         const err = error as { message?: string }
         mostrarError(err?.message || "Error verificando código")
      } finally {
         setLoading(false)
      }
   }

   const handleClickReenviar = async () => {
      if (countdown > 0) return

      setLoading(true)
      try {
         const response = await usuarioRepository.reenviarOtp(email)
         mostrarMensaje(response.mensaje)
         setCountdown(60)
         setOtp("")
      } catch (error) {
         const err = error as { message?: string }
         mostrarError(err?.message || "Error al reenviar código")
      } finally {
         setLoading(false)
      }
   }

   return (
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5 }}
         className="w-full max-w-2xl"
      >
         <Card.Root className="p-8 md:p-10 shadow-lg border-2 border-border">
            {step === "REGISTER" && (
               <>
                  <div className="mb-8">
                     <Title>Crear Cuenta</Title>
                     <p className="text-muted-foreground text-sm">
                        Completa los campos para registrarte y comenzar a comprar.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                     <Button
                        variant="outline" type="button" disabled={loading}
                        className="w-full h-11 gap-3 cursor-pointer font-medium"
                        onClick={() => mostrarMensaje("Opción no implementada")}
                     >
                        <GoogleIcon />
                        Registrarse con Google
                     </Button>
                     <Button
                        variant="outline" type="button" disabled={loading}
                        className="w-full h-11 gap-3 cursor-pointer font-medium"
                        onClick={() => mostrarMensaje("Opción no implementada")}
                     >
                        <OutlookIcon />
                        Registrarse con Outlook
                     </Button>
                  </div>

                  <div className="relative my-6">
                     <Separator />
                     <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-xs text-muted-foreground uppercase tracking-wider">
                        o continúa con email
                     </span>
                  </div>

                  <form className="space-y-0" onSubmit={(e) => e.preventDefault()}>
                     <div className="grid grid-cols-12 gap-x-4 gap-y-5">
                        <div className="col-span-12 space-y-1">
                           <label className="text-sm block px-1 text-foreground">
                              Correo Electrónico
                           </label>
                           <div className="relative group">
                              <Mail className={cn(
                                 "absolute left-3 top-1/2 -translate-y-1/2",
                                 "text-muted-foreground group-focus-within:text-primary",
                                 "transition-colors"
                              )} size={20} />
                              <Input
                                 type="email" placeholder="name@example.com"
                                 value={email} disabled={loading}
                                 className="pl-10 w-full"
                                 onChange={(e) => setEmail(e.target.value)}
                              />
                           </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 space-y-1">
                           <label className="text-sm block px-1 text-foreground">
                              Nombres
                           </label>
                           <div className="relative group">
                              <User className={cn(
                                 "absolute left-3 top-1/2 -translate-y-1/2",
                                 "text-muted-foreground group-focus-within:text-primary",
                                 "transition-colors"
                              )} size={20} />
                              <Input
                                 type="text" placeholder="Nombres"
                                 value={nombres} disabled={loading}
                                 className="pl-10 w-full"
                                 onChange={(e) => setNombres(e.target.value)}
                              />
                           </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 space-y-1">
                           <label className="text-sm block px-1 text-foreground">
                              Apellidos
                           </label>
                           <div className="relative group">
                              <User className={cn(
                                 "absolute left-3 top-1/2 -translate-y-1/2",
                                 "text-muted-foreground group-focus-within:text-primary",
                                 "transition-colors"
                              )} size={20} />
                              <Input
                                 type="text" placeholder="Apellidos"
                                 value={apellidos} disabled={loading}
                                 className="pl-10 w-full"
                                 onChange={(e) => setApellidos(e.target.value)}
                              />
                           </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 space-y-1">
                           <label className="text-sm block px-1 text-foreground">
                              Contraseña
                           </label>
                           <Password
                              password={password} disabled={loading}
                              onChange={pass => setPassword(pass)}
                           />
                        </div>

                        <div className="col-span-12 md:col-span-6 space-y-1">
                           <label className="text-sm block px-1 text-foreground">
                              Confirmar Contraseña
                           </label>
                           <Password
                              password={confirPassword} disabled={loading}
                              onChange={pass => setConfirPassword(pass)}
                           />
                        </div>

                        <div className="col-span-12 mt-2">
                           <Button
                              disabled={loading}
                              onClick={handleClickRegistrar}
                              className="w-full h-11 cursor-pointer text-base font-bold gap-2"
                              size="lg"
                           >
                              {
                                 loading ?
                                    <Loader2 className="animate-spin" size={20} /> :
                                    <UserRoundPlus size={20} strokeWidth={3} />
                              }
                              {
                                 loading ? "Registrando..." : "Crear mi cuenta"
                              }
                           </Button>
                        </div>
                     </div>
                  </form>
               </>
            )}

            {step === "VERIFY" && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-6"
               >
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
                     <Mail size={32} />
                  </div>
                  
                  <div>
                     <Title>Verifica tu correo</Title>
                     <p className="text-muted-foreground text-sm mt-2 max-w-sm mx-auto">
                        Hemos enviado un código de 6 dígitos a <b>{email}</b>. Ingrésalo a continuación para continuar.
                     </p>
                     <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg text-xs text-amber-800 dark:text-amber-200">
                        <b>Modo Demo:</b> Si no recibes el correo, revisa la terminal del backend para ver el código generado.
                     </div>
                  </div>

                  <div className="flex justify-center w-full py-4">
                     <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={loading}>
                        <InputOTPGroup>
                           <InputOTPSlot index={0} />
                           <InputOTPSlot index={1} />
                           <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                           <InputOTPSlot index={3} />
                           <InputOTPSlot index={4} />
                           <InputOTPSlot index={5} />
                        </InputOTPGroup>
                     </InputOTP>
                  </div>

                  <div className="w-full space-y-3">
                     <Button
                        disabled={loading || otp.length !== 6}
                        onClick={handleClickVerificar}
                        className="w-full h-11 cursor-pointer text-base font-bold gap-2"
                     >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                        Verificar Código
                     </Button>

                     <Button
                        variant="outline"
                        disabled={loading || countdown > 0}
                        onClick={handleClickReenviar}
                        className="w-full h-11"
                     >
                        {countdown > 0 ? `Reenviar código en ${countdown}s` : "Reenviar código"}
                     </Button>

                     <Button
                        variant="ghost"
                        disabled={loading}
                        onClick={() => setStep("REGISTER")}
                        className="w-full h-11 text-muted-foreground"
                     >
                        Volver al registro
                     </Button>
                  </div>
               </motion.div>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
               Al registrarte, aceptas nuestros{" "}
               <a href="#" className="text-primary font-semibold hover:underline">Términos de Servicio</a>
               {" "}y{" "}
               <a href="#" className="text-primary font-semibold hover:underline">Política de Privacidad</a>.
            </p>
         </Card.Root>
      </motion.div>
   )
}
