-- ======================================================
-- SCRIPT 7: MIGRACIÓN - AGREGAR CAMPO IMAGEN_PRINCIPAL
-- ======================================================
-- Fecha: 2024-11-16
-- Propósito: Agregar campo imagen_principal a la tabla alojamientos
--            para desnormalizar y mejorar el rendimiento al mostrar imágenes
-- ======================================================

USE gestion_alojamientos;

-- Agregar columna imagen_principal a la tabla alojamientos
ALTER TABLE alojamientos
    ADD COLUMN imagen_principal VARCHAR(500) NULL
        COMMENT 'URL de la imagen principal del alojamiento (desnormalizado para mejor rendimiento)'
        AFTER servicios;

-- Actualizar alojamientos existentes con su imagen principal
-- (Si ya tienen imágenes en la tabla imagenes_alojamiento)
UPDATE alojamientos a
    INNER JOIN imagenes_alojamiento ia ON a.id_alojamiento = ia.id_alojamiento
SET a.imagen_principal = ia.url_imagen
WHERE ia.es_principal = TRUE;

-- Crear índice para mejorar las consultas que filtran por alojamientos con imagen
CREATE INDEX idx_alojamientos_imagen_principal
    ON alojamientos(imagen_principal);

-- Verificar la migración
SELECT
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE,
    COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'gestion_alojamientos'
  AND TABLE_NAME = 'alojamientos'
  AND COLUMN_NAME = 'imagen_principal';

-- Mostrar resumen de alojamientos con y sin imagen
SELECT
    COUNT(*) as total_alojamientos,
    SUM(CASE WHEN imagen_principal IS NOT NULL THEN 1 ELSE 0 END) as con_imagen,
    SUM(CASE WHEN imagen_principal IS NULL THEN 1 ELSE 0 END) as sin_imagen
FROM alojamientos
WHERE estado != 'ELIMINADO';
