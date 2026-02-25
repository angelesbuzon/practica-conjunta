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

**Responsable:** Rubén

**Desarrollo e integración de componentes funcionales e interfaces de usuario avanzadas para la vista principal y el detalle de productos.**

**Detalles técnicos implementados en esta sesión:**

#### Componente Header (`Header.jsx`)

- **Identidad Visual:** Logo y nombre del restaurante "Come y Calla" (adaptativo para móviles y escritorio).
- **Buscador:** Barra de búsqueda para recetas e ingredientes. En la versión de escritorio está siempre visible, mientras que en móviles se despliega al tocar el menú.
- **Área de Acciones:**
    - Botón de perfil de usuario.
    - Botón del carrito de la compra con un diseño en forma de pastilla, que muestra dinámicamente el importe total (`totalPrice`) y un indicador (`cartCount`) si hay productos añadidos.
- **Interfaz Fija:** Se mantiene en la parte superior de la pantalla (`sticky`) con un fondo translúcido (`backdrop-blur`).

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

---

**Responsable:** Rubén

#### Vista de Detalles de Pedido (`OrderDetails.jsx`)

La vista de detalle permite al usuario visualizar toda la información ampliada de un platillo específico, comunicándose en tiempo real con el servidor:

**Componentización modular:**

- **`HeroSection`:** Muestra la foto principal del plato, junto con la nota de reviews y una etiqueta dinámica de Bestseller.
- **`InfoHeader`:** Cabecero descriptivo con tiempo de preparación, calorías y dificultad.
- **`IngredientsSection`:** Un grid visual mostrando un parseo iterativo (hasta 20) de todos los ingredientes requeridos obtenidos del JSON de la API, renderizando imágenes individuales para cada uno.
- **`PurchaseCard`:** Una tarjeta de compra flotante responsiva con los acentos corporativos naranjas, listando precios, descuentos, selector de porciones y tiempo estimado de entrega.
- **`RecommendationsSection`:** Un carrusel estético horizontal ('snap-x') de productos complementarios simulados de apariencia moderna (fondos limpios).
- **Control de Errores:** Cuenta con pantallas limpias de loading (rueda giratoria) e interfaz protectora en caso de que la respuesta del API tarde, esté vacía o el backend apague su conexión (Internal Server Error / Error 500).

---

**Responsable:** Pepe

**Detalles de las tareas:**

- Planteamiento del uso de la librería `react-router` para la gestión de vistas.
- Planteamiento del control de información de API a través de un controlador en Symfony.
- Creación de la vista del carrito (`Cart.jsx`).
- Resolución de los primeros conflictos en GitHub.
- Refinamiento general del comportamiento de la aplicación.
- Integración de vistas en `App.jsx`.

---

**Responsable:** Desirée

**Integración completa del frontend React con la API externa TheMealDB a través del proxy de Symfony, con adaptación de componentes para mostrar datos dinámicos de categorías de comida.**

**Detalles técnicos implementados en esta sesión:**

- Implementación del componente `Categoria.jsx` y `CardProducto.jsx` con su diseño.
- Configuración de estilos de colores primarios con variables CSS adicionales para backgrounds y fuentes integradas.
- Vista de categorías completamente funcional mostrando datos en tiempo real de la API TheMealDB, con interfaz responsive y diseño coherente con la identidad visual del proyecto.

### Sesión 5 - [23-02-2026]

**Responsable:** Desirée

**Mejora de la experiencia de usuario en el frontend mediante la implementación de rutas dinámicas, filtros funcionales y la conexión con el carrito de compras.**

**Detalles técnicos implementados en esta sesión:**

- **Enrutamiento Dinámico:** Uso de `useParams` para cargar dinámicamente los platos de una categoría específica (ej. `/categoria/Chicken`).
- **Filtro de Precio Funcional:** Implementación de un slider interactivo que filtra en tiempo real los productos mostrados según su precio máximo.
- **Integración del Carrito:** Conexión del botón "Añadir" en `CardProducto.jsx` con el estado global `CartContext`.

---

**Responsable:** Pepe

**Desarrollo del Sistema de Autenticación, Perfil y Checkout Avanzado:**

- **Sistema de Usuarios:** Creación del flujo de Login y Registro desde cero (en colaboración con Desirée).
- **Gestión de Perfil:** Creación de la vista de usuario para modificar datos personales y visualizar historiales.
- **Seguridad e Integración:** Implementación estricta de la seguridad de datos de usuario a través de cookies de sesión persistentes entre Vite y Symfony (`credentials: 'include'`).
- **Fixtures y Base de Datos:** Creación de fixtures de prueba y resolución de bugs de concurrencia de sesiones.
- **Persistencia de Compras:** Implementación de la creación materializada de compras en la base de datos (`Pedido` y `PlatoPedido`).
- **Refinamiento del Proceso de Pedido:** Mejora total de la vista del carrito, incorporando la capacidad de seleccionar la dirección de envío del usuario, elegir entre distintos métodos de pago interactivos y confirmación visual del pedido.

### Sesión 6 - [24-02-2026]

**Responsable:** Pepe

**Optimización de Backend y Arquitectura Headless:**

- **Limpieza de Controladores y Vistas:** Eliminación completa de todos los controladores CRUD generados por defecto por Symfony (`CategoriaController`, `PlatoController`, `PedidoController`, etc.) y sus respectivas plantillas Twig.
- **Transición a API REST:** Consolidación de la arquitectura del backend para que actúe única y exclusivamente como un proveedor de datos (API JSON) para el frontend en React, eliminando el renderizado de vistas en el servidor (a excepción de la ruta base que monta la SPA).
- **Mantenimiento y Refactorización:** Eliminación de los antiguos formularios (`FormType`) de Symfony y limpieza de enlaces rotos en las plantillas base sobrantes e invalidación de cachés de rutas, logrando un código más limpio y modular.

---

**Responsable:** Rubén

Implementación completa de la funcionalidad de **Favoritos** para usuarios autenticados. A nivel técnico, esto ha incluido el despliegue en Symfony de 3 nuevos endpoints REST en `ApiController.php` protegidos por el firewall, junto con la adaptación de la base de datos para almacenar la relación con la API. En el frontend (React), se ha desarrollado un `FavoritesContext.jsx` para la gestión global y optimista del estado, se ha adaptado `CardProducto.jsx` para interactuar con los favoritos, y se ha creado una nueva vista y ruta (`/favorites`) integrada en el menú del usuario, sincronizando finalmente estos progresos con la rama principal.

---

**Responsable:** Desirée

**Mejoras de Navegación y Experiencia de Usuario:**

- **Migas de Pan (Breadcrumbs) Funcionales:** Implementación de navegación interactiva en la vista de detalle del plato (`MealDetail.jsx` y `Breadcrumb.jsx`). Ahora los usuarios pueden volver fácilmente a la página principal o a la categoría específica del plato actual mediante enlaces dinámicos, mejorando la usabilidad y el flujo de navegación de la aplicación.
- **Corrección de Rutas:** Actualización de los enlaces en las tarjetas de productos (`CardProducto.jsx`) para apuntar correctamente a la nueva ruta de detalle de platos (`/plato/:id`), resolviendo problemas de navegación tras la reestructuración del proyecto.

**Responsable:** Ángeles

**Detalles técnicos adicionales implementados en esta sesión:**

- **Desarrollo de Componentes:**
    - Investigación del componente Link usado por los compañeros, y dejado plantilla en Home para ampliar más adelante.


-------

_Este diario se actualizará con los progresos de cada sesión de trabajo._
