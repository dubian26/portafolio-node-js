import { Input } from "@/components/ui/input"
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Eye, EyeClosed, Lock } from "lucide-react"
import { useMemo, useState } from "react"

interface Props {
   password: string
   disabled?: boolean
   showStrengthScore?: boolean
   onChange: (password: string) => void
}

const checkPasswordStrength = (pass: string) => {
   let score = 0
   if (pass.length > 7) score += 1
   if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 1
   if (/\d/.test(pass)) score += 1
   if (/[^A-Za-z0-9]/.test(pass)) score += 1
   return score
}

const getStrengthLabel = (score: number) => {
   if (score < 2) return "Débil"
   if (score < 4) return "Moderada"
   return "Fuerte"
}

const getBarColorClass = (score: number, index: number) => {
   let color = "bg-gray-200"
   if (score < 2) {
      if (index === 1) color = "bg-red-400"
   } else if (score < 4) {
      if (index <= 2) color = "bg-yellow-200"
   } else {
      if (index <= 3) color = "bg-green-300"
   }
   return color
}

const getTextColorClass = (score: number) => {
   if (score < 2) return "text-red-400"
   if (score < 4) return "text-yellow-200"
   return "text-green-300"
}

export const Password = ({
   password,
   disabled = false,
   showStrengthScore = true,
   onChange }: Props) => {
   const [showPassword, setShowPassword] = useState(false)
   const [isPopoverOpen, setIsPopoverOpen] = useState(false)

   const strengthScore = useMemo(() => checkPasswordStrength(password), [password])
   const strengthLabel = useMemo(() => getStrengthLabel(strengthScore), [strengthScore])
   const textColorClass = useMemo(() => getTextColorClass(strengthScore), [strengthScore])

   return (
      <Popover open={isPopoverOpen && showStrengthScore}>
         <PopoverAnchor asChild>
            <div className="relative group">
               <Lock className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2",
                  "text-muted-foreground group-focus-within:text-primary",
                  "transition-colors"
               )} size={20} />
               <Input
                  type={showPassword ? "text" : "password"} placeholder="••••••••"
                  value={password} disabled={disabled}
                  className="w-full pl-10 pr-10"
                  onChange={(e) => onChange(e.target.value)}
                  onFocus={() => setIsPopoverOpen(true)}
                  onBlur={() => setIsPopoverOpen(false)}
               />
               <button
                  type="button" disabled={disabled}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn(
                     "absolute right-3 top-1/2 -translate-y-1/2",
                     "text-muted-foreground hover:text-foreground",
                     "transition-colors cursor-pointer"
                  )}>
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
               </button>
            </div>
         </PopoverAnchor>
         <PopoverContent
            align="start" className="w-full min-w-72 text-sm"
            onOpenAutoFocus={(e) => e.preventDefault()}
         >
            <div className="flex flex-col gap-2">
               <div className="flex gap-1 h-2">
                  <div className={`flex-1 rounded-sm ${getBarColorClass(strengthScore, 1)}`}></div>
                  <div className={`flex-1 rounded-sm ${getBarColorClass(strengthScore, 2)}`}></div>
                  <div className={`flex-1 rounded-sm ${getBarColorClass(strengthScore, 3)}`}></div>
               </div>
               <div className={`font-bold ${textColorClass}`}>
                  {strengthLabel}
               </div>
               <Separator className="m-1" />
               <p className="mt-1">Sugerencias:</p>
               <ul className="pl-2 ml-2 mt-0">
                  <li>Al menos una minúscula</li>
                  <li>Al menos una mayúscula</li>
                  <li>Al menos un número</li>
                  <li>Al menos un caracter especial @$!%*?&</li>
                  <li>Mínimo 7 caracteres</li>
               </ul>
            </div>
         </PopoverContent>
      </Popover>
   )
}
