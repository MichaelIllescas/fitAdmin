# FitAdmin

**FitAdmin** es una aplicación de escritorio para la **gestión integral de gimnasios**.  
Permite administrar socios, registrar asistencias, controlar pagos y generar reportes financieros, todo desde una interfaz moderna y sencilla.

## 🚀 Funcionalidades principales
- Registro y administración de socios.
- Control de asistencias diarias.
- Gestión de pagos y cuotas.
- Registro y control de gastos.
- Reportes financieros diarios, mensuales y anuales.
- Análisis de rentabilidad.
- Interfaz amigable y adaptada para escritorio.

## 🛠️ Tecnologías utilizadas
- **Frontend:** React  
- **Backend:** Node.js con Sequelize y SQLite  
- **Escritorio:** Electron  
- **Base de datos:** SQLite (incrustada, no requiere instalación externa)  

> Cada módulo (`frontend` y `backend`) incluye su propio README con más detalles técnicos.

## 📂 Estructura del proyecto
```
web/
│
├── backend/fitadmin-backend   # Código y lógica del servidor
├── frontend/fit-admin-frontend # Interfaz gráfica de usuario
├── main.js                    # Punto de entrada de Electron
├── package.json               # Dependencias y scripts principales
├── icono.ico / icono.png      # Íconos de la aplicación
└── .gitignore
```

## ⚙️ Requisitos previos
1. **Node.js portable**:  
   - Debe descargarse una versión portable de Node.js (la app fue probada con Node 20).  
   - Crear en la raíz del proyecto una carpeta llamada `node` y colocar allí los archivos de Node portable.  

2. **Instalación de dependencias**  
   Desde la carpeta raíz del proyecto, ejecutar:
   ```bash
   npm install
   ```

## ▶️ Cómo ejecutar el proyecto
1. Crear la carpeta `node` en la raíz del proyecto y colocar allí la versión portable de Node.js.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Compilar y ejecutar la aplicación de escritorio:
   ```bash
   npm run start
   ```
   o, si está configurado en package.json:
   ```bash
   npm run electron:start
   ```
4. Se abrirá la ventana de la aplicación con el frontend cargado y el backend ejecutándose en segundo plano.

## 📦 Compilación para distribución
Para generar un instalador ejecutable:
```bash
npm run build
```

Esto creará la versión instalable de **FitAdmin**.

---

## 📜 Licencia
Este proyecto está licenciado bajo la **MIT License**, lo que significa que podés usar, modificar y distribuir este software de manera libre, siempre que se incluya el aviso de copyright y la licencia correspondiente.

## 👤 Autor
**Desarrollador:** Michael Jonathan Illescas  
- GitHub: [MichaelIllescas](https://github.com/MichaelIllescas)  
- LinkedIn: [Perfil en LinkedIn](https://www.linkedin.com/in/michael-jonathan-illescas) 


## 📧 Contacto
Para consultas o soporte: **info@imperial-net.com**

---
💡 **Nota:** Este README explica la visión general y los pasos de instalación/ejecución.  
Para más detalles técnicos, consultá los archivos README dentro de las carpetas `frontend` y `backend`.
