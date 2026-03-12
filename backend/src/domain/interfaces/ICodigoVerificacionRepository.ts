import { CodigoVerificacion } from "../entities/CodigoVerificacion"

export interface ICodigoVerificacionRepository {
   insertar(codigo: CodigoVerificacion): Promise<void>
   buscarRecientePorUsuarioYProposito(usuarioId: string, proposito: string): Promise<CodigoVerificacion | null>
   buscarPorCodigo(codigo: string, proposito: string): Promise<CodigoVerificacion | null>
   marcarComoUtilizado(id: string): Promise<void>
}
