-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nombres" VARCHAR(50) NOT NULL,
    "apellidos" VARCHAR(50) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modifica" TIMESTAMP(3) NOT NULL,
    "rolId" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(200),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modifica" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permisos" (
    "id" TEXT NOT NULL,
    "path" VARCHAR(100) NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "icono" VARCHAR(50),
    "orden" INTEGER NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modifica" TIMESTAMP(3) NOT NULL,
    "padreId" TEXT,

    CONSTRAINT "Permisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermisosRoles" (
    "id" TEXT NOT NULL,
    "rolId" TEXT NOT NULL,
    "permisoId" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modifica" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PermisosRoles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_nombre_key" ON "Roles"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "PermisosRoles_rolId_permisoId_key" ON "PermisosRoles"("rolId", "permisoId");

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permisos" ADD CONSTRAINT "Permisos_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Permisos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisosRoles" ADD CONSTRAINT "PermisosRoles_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisosRoles" ADD CONSTRAINT "PermisosRoles_permisoId_fkey" FOREIGN KEY ("permisoId") REFERENCES "Permisos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
