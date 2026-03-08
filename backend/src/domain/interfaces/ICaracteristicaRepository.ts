import { Caracteristica } from "@/domain/entities/Caracteristica"

export interface ICaracteristicaRepository {
   buscarPorId(id: string): Promise<Caracteristica | null>
   buscarPorNombre(nombre: string): Promise<Caracteristica | null>
   listarTodos(): Promise<Caracteristica[]>
   insertar(caracteristica: Caracteristica): Promise<void>
   actualizar(caracteristica: Caracteristica): Promise<void>
   eliminar(id: string): Promise<void>
}
