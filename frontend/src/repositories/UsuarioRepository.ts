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
      const url = `${API_URL}/auth/login`
      const response = await FetchUtility.fetch(url, { email, password })
      const data = await FetchUtility.getData<InfoUsuaModel>(response)
      return data
   }

   // Rutas protegidas: usan fetchAuth (interceptor con silent refresh)
   async buscarPorEmail(email: string): Promise<UsuarioModel | undefined> {
      const url = `${API_URL}/usuarios/email/${email}`
      const response = await FetchUtility.fetchAuth(url, {}, "GET")
      const data = await FetchUtility.getData<UsuarioModel>(response)
      return data
   }

   async buscarPorId(id: string): Promise<UsuarioModel | undefined> {
      const url = `${API_URL}/usuarios/${id}`
      const response = await FetchUtility.fetchAuth(url, {}, "GET")
      const data = await FetchUtility.getData<UsuarioModel>(response)
      return data
   }

   async listarTodos(): Promise<UsuarioModel[]> {
      const url = `${API_URL}/usuarios`
      const response = await FetchUtility.fetchAuth(url, {}, "GET")
      const data = await FetchUtility.getData<UsuarioModel[]>(response)
      return data as UsuarioModel[]
   }

   async crearCuenta(item: UsuarioModel): Promise<string> {
      const url = `${API_URL}/auth/crear-cuenta`
      const response = await FetchUtility.fetch(url, item)
      const data = await FetchUtility.getData<IdResult>(response)
      return data?.id ?? "0"
   }

   async actualizar(item: UsuarioModel): Promise<void> {
      const url = `${API_URL}/usuarios/${item.id}`
      const response = await FetchUtility.fetchAuth(url, item, "PUT")
      await FetchUtility.getData<UsuarioModel>(response)
   }

   async eliminar(id: string): Promise<void> {
      const url = `${API_URL}/usuarios/${id}`
      const response = await FetchUtility.fetchAuth(url, undefined, "DELETE")
      await FetchUtility.getData<void>(response)
   }

   async inactivar(id: string): Promise<void> {
      const url = `${API_URL}/usuarios/${id}/inactivar`
      const response = await FetchUtility.fetchAuth(url, undefined, "PUT")
      await FetchUtility.getData<void>(response)
   }

   async verificarEmail(email: string, codigo: string): Promise<{ mensaje: string }> {
      const url = `${API_URL}/auth/verificar-email`
      const response = await FetchUtility.fetch(url, { email, codigo })
      const data = await FetchUtility.getData<{ mensaje: string }>(response)
      return data!
   }

   async reenviarOtp(email: string): Promise<{ mensaje: string }> {
      const url = `${API_URL}/auth/reenviar-otp`
      const response = await FetchUtility.fetch(url, { email })
      const data = await FetchUtility.getData<{ mensaje: string }>(response)
      return data!
   }
}

export const usuarioRepository = new UsuarioApiRepository()
