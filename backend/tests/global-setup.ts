export function setup() {
   const useRealDB = process.env.TEST_MODE === "real"

   console.log("\n" + "=".repeat(50))

   if (useRealDB) {
      console.log("🚀 MODO: BASE DE DATOS REAL ACTIVADO")
      console.log("   Los cambios se reflejarán en tu DB local.")
   } else {
      console.log("🧪 MODO: MOCKS (UNITARIOS) ACTIVADO")
      console.log("   Pruebas rápidas y aisladas de la DB.")
   }

   console.log("=".repeat(50) + "\n")
}
