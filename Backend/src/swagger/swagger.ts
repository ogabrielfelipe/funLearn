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
        {
            "name": "Teacher",
            "description": "Endpoints" 
        }
    ],
    securityDefinitions: {},
    definitions: {
//-------------------- ## MODEL TEACHER ## --------------------
        Teacher:{
            name: "Fulano da Silva Rodrigues",
            username: "fulano",
            password: "********"
        },
        TeacherChange:{
            id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            name: "Fulano da Silva Rodrigues ",
            password: "********",
            active: true
        },
        TeacherChangeRes:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $username: "fulano",
            $active: true,
        },
        AuthTeacher:{
            username: "fulano",
            password: "********"
        },
        AuthTeacherRes:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $username: "fulano",
            $active: true
        },
        AddTeacher: {
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $username: "fulano",
            $password: "********"
        },
//-------------------- ## MODEL ADMINISTRATOR ## --------------------
        Administrator:{
            name: "Barbara M. Dalton",
            username: "barbara",
            password: "********"
        },
        AddAdministrator:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Barbara M. Dalton",
            $username: "barbara",
            $password: "********"
        },
        AuthAdministrator:{
            username: "fulano",
            password: "********"
        },
        AuthAdministratorRes:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $username: "fulano",
            $active: true
        },
        AdministratorChange:{
            id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            name: "Fulano da Silva Rodrigues ",
            password: "********",
            active: true
        },
        AdministratorChangeRes:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $username: "fulano",
            $active: true,
        },

    }
}



swaggerAutogen(outputFile, endpointsFiles, doc)