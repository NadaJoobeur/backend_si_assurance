// src/core/swagger.js
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation des APIs du projet',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: [
    './src/modules/**/user.routes.js',        // adapte aux modules concernés
    './src/modules/**/user.controller.js',
  ],
}

const swaggerSpec = swaggerJsdoc(options)

export const swaggerUiMiddleware = swaggerUi.serve
export const swaggerUiHandler = swaggerUi.setup(swaggerSpec)
