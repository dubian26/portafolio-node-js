import type { ProductoModel } from "@/models/ProductoModel"

export interface CartItemModel extends ProductoModel {
   cantidad: number
   subtotal: number
}
