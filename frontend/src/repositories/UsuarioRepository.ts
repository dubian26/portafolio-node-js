import { API_URL } from "@/appconfig/Constants"
import { FetchUtility } from "@/appconfig/FetchUtility"
import { type ConfigModel } from "@/models/ConfigModel"
import { type IdResult } from "@/models/IdResult"
import { type InfoUsuaModel } from "@/models/InfoUsuaModel"
import { type UsuarioModel } from "@/models/UsuarioModel"

export class UsuarioApiRepository {

   asignarConfig(config: ConfigModel) {
      console.log("solo modo local", config)
   }

   // Login: NO necesita token, usa fetch normal
   async autenticar(email: string, password: string): Promise<InfoUsuaModel | undefined> {
      const url = `${API_URL}/login`
      const response = await FetchUtility.fetch(url, { email, password })
      const data = await FetchUtility.getData<InfoUsuaModel>(response)
      return data
   }

   // Rutas protegidas: usan fetchAuth (interceptor con silent refresh)
   async buscarPorEmail(email: string): Promise<UsuarioModel | undefined> {
      const url = `${API_URL}/buscar-usuario-por-email`
      const response = await FetchUtility.fetchAuth(url, { email })
      const data = await FetchUtility.getData<UsuarioModel>(response)
      return data
   }

   async buscarPorId(id: string): Promise<UsuarioModel | undefined> {
      const url = `${API_URL}/buscar-usuario-por-id`
      const response = await FetchUtility.fetchAuth(url, { id })
      const data = await FetchUtility.getData<UsuarioModel>(response)
      return data
   }

   async listarTodos(): Promise<UsuarioModel[]> {
      const url = `${API_URL}/listar-usuarios`
      const response = await FetchUtility.fetchAuth(url, {})
      const data = await FetchUtility.getData<UsuarioModel[]>(response)
      return data as UsuarioModel[]
   }

   async crearCuenta(item: UsuarioModel): Promise<string> {
      const url = `${API_URL}/crear-cuenta-usuario`
      const response = await FetchUtility.fetch(url, item)
      const data = await FetchUtility.getData<IdResult>(response)
      return data?.id ?? "0"
   }

   async actualizar(item: UsuarioModel): Promise<void> {
      const url = `${API_URL}/actualizar-usuario`
      const response = await FetchUtility.fetchAuth(url, item)
      await FetchUtility.getData<UsuarioModel>(response)
   }

   async verificarEmail(email: string, codigo: string): Promise<{ mensaje: string }> {
      const url = `${API_URL}/verificar-email`
      const response = await FetchUtility.fetch(url, { email, codigo })
      const data = await FetchUtility.getData<{ mensaje: string }>(response)
      return data!
   }

   async reenviarOtp(email: string): Promise<{ mensaje: string }> {
      const url = `${API_URL}/reenviar-otp`
      const response = await FetchUtility.fetch(url, { email })
      const data = await FetchUtility.getData<{ mensaje: string }>(response)
      return data!
   }
}

export const usuarioRepository = new UsuarioApiRepository()
