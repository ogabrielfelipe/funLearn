const swaggerAutogen = require('swagger-autogen')();

const outputFile = 'src/swagger/swagger_output.json';
const endpointsFiles = ['src/router.ts']


const doc = {
    info: {
        version: "1.0.0",
        title: "API - funLearn",
        description: "Documentação contendo detalhes de como utilizar e como configurar as APIs a serem utilizadas pelo front-end."
    },
    host: "localhost:3333",
    basePath: "/",
    schemes: ['http', 'https'],
    tags: [
        {
            "name": "Administrator",
            "description": "Endpoints"
        },
    ],
    securityDefinitions: {},
    definitions: {}
}



swaggerAutogen(outputFile, endpointsFiles)