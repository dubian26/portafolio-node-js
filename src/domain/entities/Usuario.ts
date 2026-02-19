export interface UsuarioProps {
   id: string
   email: string
   password: string
   nombres: string
   apellidos: string
   rol: string
   activo: boolean
   fechaCreacion: Date
   fechaModifica: Date
}

export class Usuario {
   private props: UsuarioProps

   constructor(props: UsuarioProps) {
      this.props = props
   }

   get id() { return this.props.id }
   get email() { return this.props.email }
   get password() { return this.props.password }
   get nombres() { return this.props.nombres }
   get apellidos() { return this.props.apellidos }
   get rol() { return this.props.rol }
   get activo() { return this.props.activo }
   get fechaCreacion() { return this.props.fechaCreacion }
   get fechaModifica() { return this.props.fechaModifica }

   public toJSON() {
      return { ...this.props }
   }

   public toResult() {
      return { ...this.props }
   }
}
