
export interface Props {
   accessToken: string
   refreshToken: string
}

export class UsuarioRefrescarToken {
   async execute(request: Props) {
      return request
   }
}
