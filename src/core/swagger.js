import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Comar Tunisie - Assurance Auto',
      version: '1.0.0',
      description: `Cette API REST permet de gérer les services d'assurance auto pour la compagnie Comar Tunisie.
Elle couvre la gestion des contrats d'assurance, des clients, des garanties, des packs et du calcul de devis personnalisés.`,
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/modules/contrat/contrat.docs.js',
    './src/modules/devis/devis.docs.js'
  ],
}

const swaggerSpec = swaggerJsdoc(options)

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
