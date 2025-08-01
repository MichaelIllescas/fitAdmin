# FitAdmin - Backend

Este es el módulo **backend** de la aplicación **FitAdmin**, desarrollado en **Node.js** con **Express**, **Sequelize** y **SQLite**.  
Su propósito es proveer la lógica del negocio y exponer una API REST para que el frontend (con React + Electron) pueda interactuar con los datos.

---

## 🏗️ Arquitectura

El backend está diseñado siguiendo una **arquitectura modular** y en capas:

- **Rutas (routes):** definen los endpoints de la API.  
- **Controladores (controllers):** gestionan las solicitudes HTTP y delegan la lógica de negocio.  
- **Modelos (models):** definen las entidades de la base de datos usando Sequelize.  
- **Configuración (config):** contiene la configuración de la base de datos y Swagger.  
- **Base de datos:** gestionada con SQLite, persistente en un archivo `database.sqlite`.

Cada módulo (ej. `members`, `payments`, `assistances`) cuenta con su propio conjunto de rutas, controladores y modelos, favoreciendo la escalabilidad y mantenibilidad.

---

## 📂 Estructura de carpetas

```
fitadmin-backend/
│
├── config/              # Configuración general
│   ├── database.js      # Conexión y configuración de Sequelize
│   └── swagger.js       # Configuración de documentación Swagger
│
├── node_modules/        # Dependencias (no incluidas en el repo)
│
├── src/                 # Código fuente modularizado
│   ├── assistances/     # Gestión de asistencias
│   │   ├── controller/
│   │   ├── model/
│   │   └── routes/
│   │
│   ├── expenses/        # Registro de egresos
│   │   ├── controller/
│   │   ├── model/
│   │   └── routes/
│   │
│   ├── feeTypes/        # Tipos de cuotas (mensual, diaria, etc.)
│   │   ├── controller/
│   │   ├── model/
│   │   └── routes/
│   │
│   ├── members/         # Administración de socios
│   │   ├── controller/
│   │   ├── model/
│   │   └── routes/
│   │
│   ├── memberships/     # Gestión de membresías activas
│   │   ├── controller/
│   │   ├── model/
│   │   └── routes/
│   │
│   ├── payments/        # Control de pagos
│   │   ├── controller/
│   │   ├── model/
│   │   └── routes/
│   │
│   └── reports/         # Reportes financieros y de rentabilidad
│       ├── controller/
│       ├── model/
│       └── routes/
│
├── database.sqlite      # Base de datos SQLite
├── index.js             # Punto de entrada del servidor
├── package.json         # Dependencias y scripts
└── package-lock.json
```

---

## 🛠️ Tecnologías principales

- **Node.js** – entorno de ejecución.  
- **Express.js** – framework para el servidor y manejo de rutas.  
- **Sequelize** – ORM para interactuar con SQLite.  
- **SQLite** – base de datos embebida.  
- **Swagger** – documentación interactiva de la API.  

---

## ⚙️ Configuración y requisitos

### Desarrollo
- Usar **Node.js instalado localmente** (ej. Node 20).  
- Desde la carpeta `fitadmin-backend`, instalar dependencias:
  ```bash
  npm install
  ```

### Producción
- Crear una carpeta llamada `node` en la raíz del proyecto principal.  
- Colocar allí la versión portable de Node.js (probado con Node 20).  
- Instalar dependencias de la misma forma:
  ```bash
  npm install
  ```

---

## ▶️ Ejecución

### En desarrollo
Desde la carpeta del backend:
```bash
node index.js
```
Esto iniciará el servidor en `http://localhost:3001`.

### En producción (con Electron)
Desde la raíz del proyecto principal:
```bash
npm run start
```
Electron ejecutará el backend con el **Node portable** ubicado en la carpeta `node`, y cargará el frontend automáticamente.

La documentación de la API estará disponible en:
```
http://localhost:3001/api-docs
```

---

## 📦 Base de datos

- Se utiliza un único archivo **SQLite** (`database.sqlite`).
- Sequelize gestiona la creación de tablas y relaciones automáticamente a partir de los modelos.
- No se necesita instalar ni configurar un motor de base de datos adicional.

---

## 📜 Licencia

Este backend forma parte de **FitAdmin** y está cubierto por la licencia MIT.  
Podés modificar y redistribuir el código respetando los términos de la licencia.

---

💡 **Nota:** Este módulo está pensado para integrarse con el frontend de FitAdmin y no debe ejecutarse de manera aislada.
