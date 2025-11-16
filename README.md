# Proyecto Avanzada - Gestión de Alojamientos

**Monorepo** para una aplicación web completa de gestión de alojamientos (casas, apartamentos, fincas), reservas y comentarios, con roles diferenciados.

## 🏗️ Arquitectura

Este proyecto utiliza una arquitectura **Monorepo** con dos aplicaciones principales:

```
Proyecto-Avanzada/
├── Backend/          # Spring Boot 3.5.5 + Java 21
├── Frontend/         # Angular 20.3.10
└── docker-compose.yml
```

### Stack Tecnológico

#### Backend
- **Framework:** Spring Boot 3.5.5
- **Java:** JDK 21
- **Build Tool:** Gradle 8.11
- **ORM:** Spring Data JPA + Hibernate
- **Seguridad:** Spring Security + JWT
- **Base de Datos:** MySQL 8.4.6
- **Documentación:** SpringDoc OpenAPI (Swagger)

#### Frontend
- **Framework:** Angular 20.3.10
- **Lenguaje:** TypeScript 5.9.2
- **UI Components:** Angular Material 20.2.11
- **Gráficos:** Chart.js + ng2-charts
- **Estilos:** SCSS + Tailwind CSS 3.4.18
- **Server:** Nginx (en producción)

## 🚀 Inicio Rápido con Docker

### Prerrequisitos
- Docker Desktop instalado
- Git

### Ejecutar todo el sistema

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd "Proyecto Avanzada General"

# Construir y ejecutar todos los servicios
docker-compose up --build
```

**Servicios disponibles:**
- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:8080/alojamiento/api/
- **Swagger UI:** http://localhost:8080/alojamiento/swagger-ui/index.html
- **MySQL:** localhost:3307

### Detener servicios

```bash
docker-compose down

# Para eliminar también los volúmenes (datos de BD)
docker-compose down -v
```

## 📂 Estructura del Proyecto

### Backend (`/Backend`)

```
Backend/
├── src/
│   ├── main/
│   │   ├── java/uniquindio/edu/co/Proyecto_Avanzada/
│   │   │   ├── aplicacion/controller/     # API Controllers
│   │   │   ├── negocio/                   # Lógica de negocio
│   │   │   │   ├── dto/                   # Data Transfer Objects
│   │   │   │   ├── service/               # Servicios
│   │   │   │   └── enums/                 # Enumeraciones
│   │   │   ├── persistencia/              # Capa de persistencia
│   │   │   │   ├── entity/                # Entidades JPA
│   │   │   │   ├── repository/            # Repositorios
│   │   │   │   └── mapper/                # MapStruct Mappers
│   │   │   ├── configuracion/             # Configuración
│   │   │   │   └── seguridad/             # Spring Security + JWT
│   │   │   └── infraestructura/           # Scripts SQL
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       └── application-prod.properties
│   └── test/
├── build.gradle
├── Dockerfile
└── README.md
```

### Frontend (`/Frontend`)

```
Frontend/
├── src/
│   ├── app/
│   │   ├── core/                    # Singleton (services, guards, models)
│   │   ├── atomic/                  # Atomic Design Pattern
│   │   │   ├── atoms/               # Componentes básicos
│   │   │   ├── molecules/           # Combinaciones
│   │   │   └── organisms/           # Componentes complejos
│   │   ├── features/                # Módulos lazy-loaded
│   │   │   ├── auth/
│   │   │   └── home/
│   │   └── environments/
│   ├── styles.scss
│   └── main.ts
├── package.json
├── angular.json
├── Dockerfile
├── nginx.conf
└── README.md
```

## 🔐 Seguridad

### Roles del Sistema
1. **USUARIO** - Buscar, reservar, comentar alojamientos
2. **ANFITRION** - Crear y gestionar alojamientos
3. **ADMINISTRADOR** - Gestión completa del sistema

### Autenticación
- **JWT** (JSON Web Tokens) stateless
- **BCrypt** para encriptación de contraseñas
- **Expiración:** 1 hora por token

## 📡 API Endpoints Principales

### Públicos
```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/public/accommodations/featured
GET    /api/public/statistics
```

### Usuario
```
GET    /api/usuario/alojamientos
POST   /api/usuario/reservas
POST   /api/usuario/comentarios
```

### Anfitrión
```
POST   /api/anfitrion/alojamientos
PUT    /api/anfitrion/alojamientos/{id}
```

### Administrador
```
GET    /api/admin/dashboard
GET    /api/admin/usuarios
```

**Documentación completa:** http://localhost:8080/alojamiento/swagger-ui/index.html

## 💾 Base de Datos

**Motor:** MySQL 8.4.6

**Tablas principales:**
- `usuarios` - Usuarios del sistema
- `alojamientos` - Alojamientos disponibles
- `reservas` - Reservas realizadas
- `comentarios` - Comentarios y calificaciones
- `roles` y `permisos` - Control de acceso

**Scripts de inicialización:** `/Backend/src/main/java/uniquindio/edu/co/Proyecto_Avanzada/infraestructura/`

## 🛠️ Desarrollo Local

### Backend (sin Docker)

```bash
cd Backend
./gradlew bootRun
```

### Frontend (sin Docker)

```bash
cd Frontend
npm install
npm start
```

## 📝 Características Implementadas

### Frontend
- ✅ Carrusel de alojamientos destacados con datos mock
- ✅ Dashboard de estadísticas con gráficos (Chart.js)
  - Gráfico Donut (métricas clave)
  - Gráfico de Barras (reservas por mes)
- ✅ Sistema de autenticación (Login/Register)
- ✅ Guard de rutas protegidas
- ✅ JWT Interceptor
- ✅ Atomic Design Pattern

### Backend
- ✅ API REST completa
- ✅ Autenticación JWT
- ✅ RBAC (3 roles)
- ✅ CRUD de alojamientos
- ✅ Sistema de reservas
- ✅ Comentarios y respuestas
- ✅ Búsqueda avanzada con filtros
- ✅ Panel administrativo
- ✅ Documentación Swagger

## 🔧 Configuración

### Variables de Entorno

**Backend (`docker-compose.yml`):**
```yaml
SPRING_PROFILES_ACTIVE: dev
SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/gestion_alojamientos
SPRING_DATASOURCE_USERNAME: root
SPRING_DATASOURCE_PASSWORD: A-12345-RR
SERVER_PORT: 8080
```

**Frontend:**
```yaml
NODE_ENV: production
```

## 📊 Datos Mock (Desarrollo)

El proyecto incluye datos mock para desarrollo:
- 4 alojamientos destacados con imágenes
- Estadísticas del dashboard
- Gráficos de métricas

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es desarrollado como parte de un proyecto académico en la Universidad del Quindío.

## 👥 Equipo

Proyecto desarrollado para el curso de Programación Avanzada.

---

**Generado con:** ❤️ y ☕ en Armenia, Quindío, Colombia
