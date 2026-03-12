export interface CodigoVerificacionProps {
   id: string
   usuarioId: string
   codigo: string
   proposito: string
   expiracion: Date
   utilizado: boolean
   fechaCreacion: Date
}

export class CodigoVerificacion {
   private props: CodigoVerificacionProps

   constructor(props: CodigoVerificacionProps) {
      this.props = props
   }

   get id() { return this.props.id }
   get usuarioId() { return this.props.usuarioId }
   get codigo() { return this.props.codigo }
   get proposito() { return this.props.proposito }
   get expiracion() { return this.props.expiracion }
   get utilizado() { return this.props.utilizado }
   get fechaCreacion() { return this.props.fechaCreacion }

   set utilizado(utilizado: boolean) { this.props.utilizado = utilizado }

   public toJSON() {
      return { ...this.props }
   }
}
