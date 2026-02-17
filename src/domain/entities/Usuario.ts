export interface UsuarioProps {
   id: string
   email: string
   password: string
   tipoDocu: string
   numeDocu: string
   nombres: string
   apellidos: string
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
   get tipoDocu() { return this.props.tipoDocu }
   get numeDocu() { return this.props.numeDocu }
   get nombres() { return this.props.nombres }
   get apellidos() { return this.props.apellidos }
   get activo() { return this.props.activo }
   get fechaCreacion() { return this.props.fechaCreacion }
   get fechaModifica() { return this.props.fechaModifica }

   // Business logic can be added here
   public desactivar() {
      this.props.activo = false
      this.props.fechaModifica = new Date()
   }

   public toJSON() {
      return { ...this.props }
   }
}
