-- CreateTable
CREATE TABLE "Caracteristicas" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(255),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modifica" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Caracteristicas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Caracteristicas_nombre_key" ON "Caracteristicas"("nombre");
