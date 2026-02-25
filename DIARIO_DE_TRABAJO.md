# Diario de Trabajo

Este documento recoge el seguimiento diario del trabajo realizado por el equipo en el Proyecto Final Integrador.

## Registro Diario

### Sesión 1 - [16-02-2026] - Inicio del Proyecto

Se establecieron los grupos de trabajo y se dió inicio al proyecto utilizando el framework Symfony.

### Sesión 2 - [17-02-2026]

Se ha llevado a cabo el diseño y modelado relacional del sistema, traduciendo el esquema entidad-relación en entidades de Doctrine para estructurar la base de datos. Sobre esta arquitectura, se implementaron los módulos CRUD para la gestión de datos y se configuró el componente de seguridad de Symfony, desarrollando un flujo completo de autenticación y registro de usuarios bajo estándares de persistencia profesional.

**Detalles técnicos adicionales implementados en esta sesión:**

- **Infraestructura:** Configuración de contenedor Docker para PostgreSQL (puerto 5433).
- **Seguridad y Acceso:**
    - Confguración de Firewall `main` (Login/Logout).
    - Definición de reglas de acceso (`access_control`) en `security.yaml`: Catálogo público (`/plato`), Pedidos/Perfil privados (`/pedido`, `/perfil`, ROLE_USER).
    - Formulario de Registro (`RegistrationController`) con validación y hasheado de contraseñas.
- **Controladores y Vistas:**
    - Creación de Landing Page dinámica (`MainController`) mostrando categorías desde base de datos.
    - Implementación de Perfil de Usuario (`ProfileController`) con historial de pedidos.
    - Generación de CRUDs completos para `Plato`, `Ingrediente`, `Categoria`, `User` y `Pedido` mediante `make:crud`.
- **Documentación:**
    - Creación de este diario de trabajo.
    - Actualización del README con tecnologías y roles del equipo.

**Nota:** Estas dos sesiones han sido realizadas al completo en conjunto por los cuatro integrantes.

### Sesión 3 - [19-02-2026]

**Responsable:** Desiree

Inicio del desarrollo del frontend en React con la implementación del componente Footer y la configuración de recursos estáticos.

**Detalles técnicos implementados en esta sesión:**

- **Recursos Estáticos:**
    - Creación de la carpeta `/frontend/src/img` para organizar imágenes del proyecto.
    - Incorporación del logo de la aplicación (`logo.png`).

- **Desarrollo de Componentes:**
    - Implementación del componente `Footer.jsx` con estructura semántica completa.
    - Aplicación de diseño responsive usando Tailwind CSS con breakpoints adaptativos.
    - Configuración de layout flexible que adapta la presentación según el tamaño de pantalla:
        - **Móvil:** Layout centrado en una columna para todos los elementos.
        - **Desktop:** Layout horizontal con cuatro columnas alineadas a la izquierda.

- **Diseño y UX:**
    - Estructura del footer con secciones: Logo/Descripción, Descubre, Compañía, Soporte.
    - Copyright centrado en la sección inferior del footer.

### Sesión 4 - [20-02-2026] - Componentes Home y Button

**Responsable:** Ángeles

**Detalles técnicos adicionales implementados en esta sesión:**

- **Recursos estáticos**:
    - Añado imagen `hero.png`.

- **Desarrollo de Componentes:**
    - Versión básica del componente parametrizado `Button.jsx`, reutilizable en distintos macrocomponentes por los cuatro miembros del grupo.
    - Empezado el macrocomponente `Home.jsx`. Dejo pendientes las secciones que requieren llamadas a API para estudiar más a fondo la lógica necesaria.

- **Diseño y UX:**
    - Creación de clases personalizadas Tailwind para la paleta de colores.

**Responsable:** Pepe

**Optimización de Backend y Arquitectura Headless:**

- **Limpieza de Controladores y Vistas:** Eliminación completa de todos los controladores CRUD generados por defecto por Symfony (`CategoriaController`, `PlatoController`, `PedidoController`, etc.) y sus respectivas plantillas Twig.
- **Transición a API REST:** Consolidación de la arquitectura del backend para que actúe única y exclusivamente como un proveedor de datos (API JSON) para el frontend en React, eliminando el renderizado de vistas en el servidor (a excepción de la ruta base que monta la SPA).
- **Mantenimiento y Refactorización:** Eliminación de los antiguos formularios (`FormType`) de Symfony y limpieza de enlaces rotos en las plantillas base sobrantes e invalidación de cachés de rutas, logrando un código más limpio y modular.

---

### Sesión 6 - [24-02-2026]

**Responsable:** Rubén

Implementación completa de la funcionalidad de **Favoritos** para usuarios autenticados, permitiendo guardar y gestionar platos preferidos desde cualquier vista del catálogo.

**Detalles técnicos implementados en esta sesión:**

- **Backend (Symfony):**
    - Creación de 3 endpoints REST en `ApiController.php`:
        - `GET /api/favorites` — Listado de platos favoritos del usuario autenticado.
        - `POST /api/favorites/{apiId}` — Añadir un plato a favoritos (con creación automática del registro `Plato` en BD si no existe).
        - `DELETE /api/favorites/{apiId}` — Eliminar un plato de favoritos.
    - Configuración de regla de acceso en `security.yaml` (`/api/favorites` → `ROLE_USER`).
    - Actualización del esquema de base de datos para añadir la columna `api_id` a la tabla `plato`.

- **Frontend (React):**
    - Creación del contexto `FavoritesContext.jsx` con:
        - Carga automática de favoritos al iniciar sesión.
        - Toggle optimista con rollback automático en caso de error del servidor.
    - Modificación de `CardProducto.jsx`: el icono de corazón ahora es funcional, mostrando estado visual diferenciado (relleno rojo si es favorito, borde gris si no lo es). Si el usuario no ha iniciado sesión, se redirige a `/login`.
    - Creación de la página `Favorites.jsx` (`/favorites`) con grid de platos favoritos y estado vacío ilustrativo.
    - Integración en `App.jsx` con `FavoritesProvider` y nueva ruta `/favorites`.
    - Añadida tarjeta de acceso directo "Mis Favoritos" en la sidebar del perfil (`Profile.jsx`).

- **Sincronización con repositorio:**
    - Actualización de la rama `Detalle-pedidos` con los últimos cambios del repositorio principal (`upstream/main`).

---

_Este diario se actualizará con los progresos de cada sesión de trabajo._
