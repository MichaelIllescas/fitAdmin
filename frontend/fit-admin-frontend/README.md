# FitAdmin - Frontend

Este es el módulo **frontend** de la aplicación **FitAdmin**, desarrollado con **React** y **Vite**.  
Proporciona la interfaz gráfica que interactúa con el backend mediante llamadas a la API REST, permitiendo a los usuarios gestionar de manera sencilla todas las funcionalidades del sistema.

---

## 🏗️ Arquitectura

El frontend sigue un enfoque modular basado en **componentes** y **features**, aplicando separación de responsabilidades:

- **assets/**: recursos estáticos (imágenes, íconos, SVG).  
- **components/**: componentes reutilizables (sidebar, tablas, etc.).  
- **config/**: configuraciones generales.  
- **dashboard/**: vistas principales y widgets del tablero.  
- **features/**: módulos de negocio con sus propias subcarpetas:
  - **assistances**: control de asistencias.
  - **expenses**: administración de egresos.
  - **fees**: gestión de tipos de cuotas.
  - **finances**: reportes y estadísticas financieras.
  - **members**: gestión de socios.
  - **payments**: control de pagos.
- **routes/**: configuración de rutas de la aplicación.  
- **utils/**: funciones utilitarias.  
- **App.jsx**: componente raíz.  
- **main.jsx**: punto de entrada principal de React.  

---

## 📂 Estructura de carpetas

```
fit-admin-frontend/
│
├── public/              # Archivos públicos
├── src/
│   ├── assets/          # Imágenes y recursos estáticos
│   ├── components/      # Componentes compartidos
│   │   ├── sidebar/
│   │   └── tables/
│   │
│   ├── config/          # Configuración global
│   │   └── config.js
│   │
│   ├── dashboard/       # Dashboard principal
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── features/        # Módulos de negocio
│   │   ├── assistances/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   ├── expenses/
│   │   ├── fees/
│   │   ├── finances/
│   │   ├── members/
│   │   └── payments/
│   │
│   ├── routes/          # Definición de rutas
│   │   ├── AppRoutes.jsx
│   │   └── utils/
│   │
│   ├── utils/           # Funciones auxiliares
│   ├── App.jsx          # Componente raíz
│   └── main.jsx         # Punto de entrada de React
│
├── index.html           # HTML principal
├── vite.config.js       # Configuración de Vite
├── package.json         # Dependencias y scripts
└── package-lock.json
```

---

## 🛠️ Tecnologías principales

- **React** – librería para la interfaz de usuario.  
- **Vite** – herramienta de desarrollo y build.  
- **React Router** – gestión de rutas de la aplicación.  
- **Bootstrap / Material UI** (según componentes usados) – estilos y diseño responsivo.  
- **Axios** – cliente HTTP para consumir la API del backend.  

---

## ⚙️ Configuración y requisitos

### Desarrollo
1. Asegurate de tener **Node.js instalado localmente** (ej. Node 20).  
2. Desde la carpeta `fit-admin-frontend`, instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Acceder a la aplicación en:
   ```
   http://localhost:5173
   ```

### Producción (con Electron)
1. El frontend será empaquetado y cargado por Electron.  
2. Desde la raíz del proyecto principal:
   ```bash
   npm run build
   ```
3. Electron tomará los archivos compilados de la carpeta `dist/` y los integrará en la aplicación de escritorio.

---

## 📜 Licencia

Este frontend forma parte de **FitAdmin** y está cubierto por la licencia MIT.  
Podés modificar y redistribuir el código respetando los términos de la licencia.

---

💡 **Nota:** Este módulo está diseñado para funcionar junto al backend de FitAdmin. En desarrollo podés correr ambos módulos de manera independiente; en producción, Electron los integra en una sola aplicación de escritorio.
