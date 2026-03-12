-- AlterTable
ALTER TABLE "Usuarios" ADD COLUMN     "email_verificado" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "CodigosVerificacion" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "codigo" VARCHAR(6) NOT NULL,
    "proposito" VARCHAR(50) NOT NULL,
    "expiracion" TIMESTAMP(3) NOT NULL,
    "utilizado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodigosVerificacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodigosVerificacion" ADD CONSTRAINT "CodigosVerificacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
