import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Games Tracker API',
    description: 'Clean auto-generated API documentation',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [
    {
      name: 'Health',
      description: 'Service health and root endpoints'
    },
    {
      name: 'Authentication',
      description: 'User authentication routes'
    },
    {
      name: 'Games',
      description: 'Game library routes'
    },
    {
      name: 'Reviews',
      description: 'Game review routes'
    },
    {
      name: 'Stats',
      description: 'User dashboard/analytics routes'
    }
  ],
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Use: Bearer <JWT_TOKEN>'
    }
  }
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./swagger.docs.js'];

await swaggerAutogen()(outputFile, endpointsFiles, doc);
