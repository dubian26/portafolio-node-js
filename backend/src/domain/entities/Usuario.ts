export interface UsuarioProps {
   id: string
   email: string
   password: string
   nombres: string
   apellidos: string
   rolId: string
   activo: boolean
   emailVerificado: boolean
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
   get rolId() { return this.props.rolId }
   get activo() { return this.props.activo }
   get emailVerificado() { return this.props.emailVerificado }
   get fechaCreacion() { return this.props.fechaCreacion }
   get fechaModifica() { return this.props.fechaModifica }

   set nombres(nombres: string) { this.props.nombres = nombres }
   set apellidos(apellidos: string) { this.props.apellidos = apellidos }
   set password(password: string) { this.props.password = password }
   set activo(activo: boolean) { this.props.activo = activo }
   set emailVerificado(emailVerificado: boolean) { this.props.emailVerificado = emailVerificado }
   set fechaModifica(fechaModifica: Date) { this.props.fechaModifica = fechaModifica }

   public toJSON() {
      return { ...this.props }
   }

   public toResult() {
      return { ...this.props }
   }
}
