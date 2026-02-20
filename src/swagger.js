import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Games Tracker API',
    description: 'Auto-generated API documentation'
  },
  tags : [
    {
        name : 'Authentication',
        description : 'User Authentication Routes'
    },
    {
        name : 'Games',
        description : 'Game Library Routes'
    }
  ],
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/index.js']; // adjust path as needed

swaggerAutogen()(outputFile, endpointsFiles, doc);