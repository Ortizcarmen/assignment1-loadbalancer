const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API 🌸',
      version: '1.0.0',
      description: 'API para gestionar tareas',
    },
    servers: [
      {
        url: process.env.BACKEND_URL || 'http://localhost:3001',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
}

module.exports = swaggerJsdoc(options)
