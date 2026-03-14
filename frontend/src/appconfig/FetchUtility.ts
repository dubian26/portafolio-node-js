import { API_URL } from "@/appconfig/Constants"
import { CustomError } from "@/appconfig/CustomError"
import { type ErrorModel } from "@/models/ErrorModel"

type LogoutCallback = () => void
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

// Callback de logout cuando la renovación del token falla
let onLogout: LogoutCallback = () => { }

// Promesa compartida para evitar múltiples renovaciones simultáneas
let refreshPromise: Promise<boolean> | null = null


export class FetchUtility {

   /**
    * Registrar el callback de logout que se invocará cuando
    * la renovación del token falle (sesión expirada definitivamente).
    */
   static setLogoutHandler(callback: LogoutCallback) {
      onLogout = callback
   }

   private static setParams(params: unknown, method: HttpMethod = "POST"): RequestInit {
      const init: RequestInit = {
         method: method,
         headers: { "Content-Type": "application/json" },
         credentials: "include"
      }
      if (method !== "GET" && method !== "DELETE") {
         init.body = JSON.stringify(params)
      }
      return init
   }

   static async fetch(url: string, params: unknown, method: HttpMethod = "POST"): Promise<Response> {
      const requestInit = this.setParams(params, method)
      const response = await fetch(url, requestInit)
      return response
   }

   /**
    * Fetch autenticado con interceptor de silent refresh.
    * Las cookies httpOnly se envían automáticamente con credentials: "include".
    *
    * Flujo:
    * 1. Ejecuta la petición original
    * 2. Si recibe 401 → llama a /refrescar-token
    * 3. Si la renovación es exitosa → reintenta la petición original
    * 4. Si la renovación falla → ejecuta el callback de logout
    */
   static async fetchAuth(url: string, params: unknown, method: HttpMethod = "POST"): Promise<Response> {
      const response = await this.fetch(url, params, method)
      if (response.status !== 401) return response

      // Intentar renovar el token
      const renovado = await this.intentarRenovar()

      if (!renovado) {
         onLogout()
         return response
      }

      // Token renovado → reintentar la petición original
      return this.fetch(url, params, method)
   }

   static async getData<T>(response: Response, callerName: string = ""): Promise<T | undefined> {
      if (response.status === 501) {
         const errorModel: ErrorModel = await response.json()
         throw CustomError.fromModel(errorModel)
      }

      if (!response.ok) {
         const callerNamex = callerName ? callerName : this.getCallerName()
         throw CustomError.fromFetch(callerNamex)
      }

      if (response.status === 204) return undefined
      const text = await response.text()
      if (!text || text === "null") return undefined
      return JSON.parse(text) as T
   }

   /**
    * Intenta renovar el access token.
    * Si ya hay una renovación en curso, espera su resultado (evita duplicados).
    */
   private static async intentarRenovar(): Promise<boolean> {
      if (refreshPromise !== null) return refreshPromise
      refreshPromise = this.fetchRefreshToken()

      try {
         return await refreshPromise
      } finally {
         refreshPromise = null
      }
   }

   /**
    * Llama al endpoint /refrescar-token.
    * No envía body porque el refresh token viaja como cookie httpOnly.
    */
   private static async fetchRefreshToken(): Promise<boolean> {
      try {
         const response = await fetch(`${API_URL}/auth/refrescar-token`, {
            method: "POST",
            credentials: "include"
         })

         return response.ok
      } catch {
         return false
      }
   }

   private static getCallerName = () => {
      const stack = new Error().stack
      const callerLine = stack?.split("\n")[2]
      const callerName = callerLine?.trim().split(" ")[1]
      return callerName ?? ""
   }
}
