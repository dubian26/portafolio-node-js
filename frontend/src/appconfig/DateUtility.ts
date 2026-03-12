class DateUtility {
   formatFecha(valor: string) {
      if (!valor) return "-"
      const fecha = new Date(valor)
      return fecha.toLocaleString("es-CO", {
         day: "2-digit",
         month: "2-digit",
         year: "numeric",
         hour: "2-digit",
         minute: "2-digit",
         timeZone: "UTC"
      })
   }
}

export const dateUtility = new DateUtility()
