const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FitAdmin API',
      version: '1.0.0',
      description: 'Documentación de la API de FitAdmin',
    },
  },
  apis: ['./src/**/*.routes.js'], // Escanea todos los archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
