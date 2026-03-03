import { Rol } from "@/domain/entities/Rol"

export interface IRolRepository {
   buscarPorId(id: string): Promise<Rol | null>
   buscarPorNombre(nombre: string): Promise<Rol | null>
   listarTodos(): Promise<Rol[]>
   insertar(rol: Rol): Promise<void>
   actualizar(rol: Rol): Promise<void>
   eliminar(id: string): Promise<void>
}
