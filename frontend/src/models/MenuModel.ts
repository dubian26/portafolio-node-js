import type { LucideIcon } from "lucide-react"

export interface MenuModel {
    id: number
    icono: LucideIcon
    texto: string
    alerta: boolean
    ruta?: string
}
