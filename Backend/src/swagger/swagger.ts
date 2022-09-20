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
            $token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2FicmllbCBGZWxpcGUgVmllaXJhIiwiZW1haWwiOiJvZ2FicmllbC52LmZlbGlwZUBnbWFpbC5jb20iLCJpYXQiOjE2NjI4NDg3MTcsImV4cCI6MTY2NTQ0MDcxNywic3ViIjoiY2VjODcxNDMtYzRmZi00NmQ1LWEwYjktMzlkOTk1Y2IyMDQ1In0.n-86Xwb_LowewLQNqbt64Pu5NhZOOngGF_vAHSQBloQ"
        },
        AddTeacher: {
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $username: "fulano",
            $password: "********"
        },

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
        }

    }
}



swaggerAutogen(outputFile, endpointsFiles, doc)