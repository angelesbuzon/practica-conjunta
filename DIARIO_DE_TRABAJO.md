# Diario de Trabajo

Este documento recoge el seguimiento diario del trabajo realizado por el equipo en el Proyecto Final Integrador.

## Registro Diario

### Sesión 1 - [16-02-2026] - Inicio del Proyecto

Se establecieron los grupos de trabajo y se dió inicio al proyecto utilizando el framework Symfony.

### Sesión 2 - [17-02-2026] - Arquitectura, Seguridad y Funcionalidad Base

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

### Sesión 3 - [19-02-2026] - Frontend React y Componente Footer

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

Desarrollo e integración de componentes funcionales e interfaces de usuario avanzadas para la vista principal y el detalle de productos.

**Detalles técnicos implementados en esta sesión:**

#### Componente Header (`Header.jsx`)

- **Identidad Visual**: Logo y nombre del restaurante "Come y Calla" (adaptativo para móviles y escritorio).
- **Buscador**: Barra de búsqueda para recetas e ingredientes. En la versión de escritorio está siempre visible, mientras que en móviles se despliega al tocar el menú.
- **Área de Acciones**:
    - Botón de perfil de usuario.
    - Botón del carrito de la compra con un diseño en forma de pastilla, que muestra dinámicamente el importe total (`totalPrice`) y un indicador (`cartCount`) si hay productos añadidos.
- **Interfaz Fija**: Se mantiene en la parte superior de la pantalla (`sticky`) con un fondo translúcido (`backdrop-blur`).

### Sesión 4 - [20-02-2026]

**Responsable:** Rubén

#### Vista de Detalles de Pedido (`OrderDetails.jsx`)

La vista de detalle permite al usuario visualizar toda la información ampliada de un platillo específico, comunicándose en tiempo real con el servidor:

- **Componentización modular**:
    - `HeroSection`: Muestra la foto principal del plato, junto con la nota de reviews y una etiqueta dinámica de _Bestseller_.
    - `InfoHeader`: Cabecero descriptivo con tiempo de preparación, calorías y dificultad.
    - `IngredientsSection`: Un grid visual mostrando un parseo iterativo (hasta 20) de todos los ingredientes requeridos obtenidos del JSON de la API, renderizando imágenes individuales para cada uno.
    - `PurchaseCard`: Una tarjeta de compra flotante responsiva con los acentos corporativos naranjas, listando precios, descuentos, selector de porciones y tiempo estimado de entrega.
    - `RecommendationsSection`: Un carrusel estético horizontal ('snap-x') de productos complementarios simulados de apariencia moderna (fondos limpios).
- **Control de Errores**: Cuenta con pantallas limpias de `loading` (rueda giratoria) e interfaz protectora en caso de que la respuesta del API tarde, esté vacía o el backend apague su conexión (Internal Server Error / Error 500).

**Responsable:** Pepe

**Detalles de las tareas:**

- Planteamiento del uso de la librería `react-router` para la gestión de vistas.
- Planteamiento del control de información de API a través de un controlador en Symfony.
- Creación de la vista del carrito (`Cart.jsx`).
- Resolución de los primeros conflictos en GitHub.
- Refinamiento general del comportamiento de la aplicación.
- Integración de vistas en `App.jsx`.

---

_Este diario se actualizará con los progresos de cada sesión de trabajo._
