import { Usuario } from "@/domain/entities/Usuario"

export interface IUsuarioRepository {
   buscarPorId(id: string): Promise<Usuario | null>
   buscarPorEmail(email: string): Promise<Usuario | null>
   insertar(usuario: Usuario): Promise<void>
   actualizar(usuario: Usuario): Promise<void>
}
