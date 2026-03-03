export interface RolProps {
   id: string
   nombre: string
   descripcion: string | null
   activo: boolean
   fechaCreacion: Date
   fechaModifica: Date
}

export class Rol {
   private props: RolProps

   constructor(props: RolProps) {
      this.props = props
   }

   get id() { return this.props.id }
   get nombre() { return this.props.nombre }
   get descripcion() { return this.props.descripcion }
   get activo() { return this.props.activo }
   get fechaCreacion() { return this.props.fechaCreacion }
   get fechaModifica() { return this.props.fechaModifica }

   // Constantes y Evaluadores
   public static readonly ADMIN = "Administrador"
   public static readonly CLIENTE = "Cliente"

   public toJSON() {
      return { ...this.props }
   }

   public toResult() {
      return { ...this.props }
   }
}
