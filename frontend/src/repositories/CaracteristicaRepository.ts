import { API_URL } from "@/appconfig/Constants"
import { FetchUtility } from "@/appconfig/FetchUtility"
import { type CaracteristicaModel } from "@/models/CaracteristicaModel"
import { type IdResult } from "@/models/IdResult"

export class CaracteristicaApiRepository {
   async listarTodos(): Promise<CaracteristicaModel[]> {
      const url = `${API_URL}/caracteristicas`
      const response = await FetchUtility.fetch(url, undefined, "GET")
      const data = await FetchUtility.getData<CaracteristicaModel[]>(response)
      return data ?? []
   }

   async buscarPorId(id: string): Promise<CaracteristicaModel | undefined> {
      const url = `${API_URL}/caracteristicas/${id}`
      const response = await FetchUtility.fetch(url, undefined, "GET")
      const data = await FetchUtility.getData<CaracteristicaModel>(response)
      return data
   }

   async insertar(item: CaracteristicaModel): Promise<string> {
      const url = `${API_URL}/caracteristicas`
      const response = await FetchUtility.fetchAuth(url, item, "POST")
      const data = await FetchUtility.getData<IdResult>(response)
      return data?.id ?? "0"
   }

   async actualizar(item: CaracteristicaModel): Promise<void> {
      const url = `${API_URL}/caracteristicas/${item.id}`
      const response = await FetchUtility.fetchAuth(url, item, "PUT")
      await FetchUtility.getData<void>(response)
   }

   async eliminar(id: string): Promise<void> {
      const url = `${API_URL}/caracteristicas/${id}`
      const response = await FetchUtility.fetchAuth(url, undefined, "DELETE")
      await FetchUtility.getData<void>(response)
   }
}

export const caracteristicaRepository = new CaracteristicaApiRepository()
