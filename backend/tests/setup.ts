import "dotenv/config"

declare global {
   var useRealDB: boolean
}

global.useRealDB = process.env.TEST_MODE === "real"
