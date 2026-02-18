export interface UserInfo {
   id: string
   tipo: "access" | "refresh"
   email: string
   nombre: string
   rol: string
}