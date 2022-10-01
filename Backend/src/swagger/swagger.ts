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
    tags: [
        {
            "name": "Administrator",
            "description": "Endpoints"
        },
        {
            "name": "Teacher",
            "description": "Endpoints" 
        },
        {
            "name": "Studant",
            "description": "Endpoints" 
        },
        {
            "name": "Team",
            "description": "Endpoint" 
        },
        {
            "name": "Ask",
            "description": "Endpoint" 
        },,
        {
            "name": "Answer",
            "description": "Endpoint" 
        },
        {
            "name": "Home",
            "description": "Endpoint" 
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
        FindTeacher:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $username: "fulano",
            $active: true,
            team: [
                {
                    id: "4531b848-15c8-4dfe-baf8-564491fd4a04",
                    name: "1º ano - Informática",
                    active: true,
                }
            ]
        },
        FindTeachersReq:{
            $name: "Fulano da Silva Rodrigues",
        },
        FindTeachers:[{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $username: "fulano",
            $active: true,
            team: [
                {
                    id: "4531b848-15c8-4dfe-baf8-564491fd4a04",
                    name: "1º ano - Informática",
                    active: true,
                }
            ]
        }],
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
        FindAdministrator:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $username: "fulano",
            $active: true
        },
        FindAdministratorsReq:{
            $name: "Fulano da Silva Rodrigues",            
        },  
        FindAdministrators: [{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $username: "fulano",
            $active: true
        },],

//-------------------- ## MODEL ESTUDANTE ## --------------------
        Studant:{
            name: "Barbara M. Dalton",
            register: 120998977234,
            password: "********",
            active: true,
            teamID: "4531b848-15c8-4dfe-baf8-564491fd4a04"
        },
        StudantFile:{
            password: "********",
            teamID: "4531b848-15c8-4dfe-baf8-564491fd4a04"
        },
        AddStudant:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Barbara M. Dalton",
            register: "120998977234",
            active: true,
            teams:{
                team:{
                    id: "4531b848-15c8-4dfe-baf8-564491fd4a04",
                    name: "1º ano - Informática",
                    active: true 
                }
            }
        },
        AuthStudant:{
            register: 12332112345,
            password: "********"
        },
        AuthStudantRes:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $register: "12332112345",
            $active: true
        },
        StudantChange:{
            $studantID: "4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Barbara M. Dalton",
            password: "********",
            active: true,
            $teamID: "4531b848-15c8-4dfe-baf8-564491fd4a04"
        },
        StudantChangeRes:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Barbara M. Dalton",
            register: "120998977234",
            active: true,
            teams:{
                team:{
                    id: "4531b848-15c8-4dfe-baf8-564491fd4a04",
                    name: "1º ano - Informática",
                    active: true 
                }
            }
        },
        FindStudant:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Barbara M. Dalton",
            register: "120998977234",
            active: true,
            teams: [
                {
                    team:{
                        id: "4531b848-15c8-4dfe-baf8-564491fd4a04",
                        name: "1º ano - Informática",
                        active: true,
                        teacher: {
                            id: "4531b848-15c8-4dfe-baf8-564491fd4a04",
                            name: "Fulano da Silva Rodrigues",
                            active: true
                        }
                    }
                }
            ],
            position: []

        },
        FindStudants: {
            name: "gabriel OU parte do nome OU aspas vazia"
        },
        FindStudantsRes: [
            {
                $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
                $name: "Barbara M. Dalton",
                active: true,
                teams: [
                    {
                        team: {
                            id: "4531b848-15c8-4dfe-baf8-564491fd4a04",
                            name: "1º ano - Informática",
                            active: true,
                        }
                    }
                ]
            }
        ],


        CreateManyStudants500:{
            "header": "Error",
            "code": 500,
            "description": {
                "code": "P2002",
                "clientVersion": "4.3.1",
                "meta": {
                    "target": "studant_register_key"
                }
            }
        },
        CreateManyStudant200:{
            "header": "Success",
            "code": 200,
            "description": {
                "msg": "Cadastro efetuado com sucesso.",
                "count": 3
            }
        },
        
        // --------------- TEAM -----------------------
        Team:{
            name: "1º Ano - Técnico em Informática",
            teacherID: "4531b848-15c8-4dfe-baf8-564491fd4a04",
            active: true
        },
        TeamFind:{
            name: "1º Ano - Técnico em Informática",
        },
        TeamRes:{
            id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "1º Ano - Técnico em Informática",
            $teacherID: "4531b848-15c8-4dfe-baf8-564491fd4a04",
            $active: true,
            $teacher:{
                id: "4531b848-15c8-4dfe-baf8-564491fd4a04",
                name: "Fulano da Silva Rodrigues",
                active: true
            }
        },
        TeamChange:{
            id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "1º Ano - Técnico em Informática",
            $teacherID: "4531b848-15c8-4dfe-baf8-564491fd4a04",
            $active: true,
        },
        TeamsRes:[{
            id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "1º Ano - Técnico em Informática",
            $teacherID: "4531b848-15c8-4dfe-baf8-564491fd4a04",
            $active: true,
            $teacher:{
                id: "4531b848-15c8-4dfe-baf8-564491fd4a04",
                name: "Fulano da Silva Rodrigues",
                active: true
            }
        }],

        // --------------------- ASK --------------------------------

        Ask:{
            question: " Aqui será informado uma pergunta ",
            active: true,
            image: "image.png",
            level: "INITIAL",
            answer: { 
                data:[
                    {
                        "description": "Alternativa 1",
                        "correct": false
                    }
                ]
            }
            
        },
        AskResp:{
            id: "46e50259-ab8d-40e8-8c68-5fc81f604e43",
            question: " Aqui será informado uma pergunta ",
            active: true,
            image: "image.png",
            level: "INITIAL",
            answer: [
                {
                    id: "1651b180-597b-4689-a89c-7c3acfedc529",
                    description: "Alternativa 1",
                    correct: false,
                    askID: "46e50259-ab8d-40e8-8c68-5fc81f604e43"
                }
            ]
        },
        AskChange:{
            askID: "46e50259-ab8d-40e8-8c68-5fc81f604e43",
            question: " Aqui será informado uma pergunta ",
            active: true
        },
        Answer:{
            askID: "031dd41f-15f2-490b-9eb4-99779b43480c",
            description: "Alternativa alterada",
            correct: true,
        },
        AnswerChange:{
            answerID: "031dd41f-15f2-490b-9eb4-99779b43480c",
            description: "Alternativa alterada",
            correct: true
        },
        AnswerChangeRes:{
            id: "031dd41f-15f2-490b-9eb4-99779b43480c",
            description: "Alternativa alterada",
            correct: true,
            askID: "031dd41f-15f2-490b-9eb4-99779b43480c",
        },
        AskFindMany:{
            question: " Aqui será informado uma pergunta "
        },
        AskFindManyRes:[{
            id: "031dd41f-15f2-490b-9eb4-99779b43480c",
            question: " Aqui será informado uma pergunta ",
            active: true,
            level: "INITIAL",
            
        }],


    }
}



swaggerAutogen(outputFile, endpointsFiles, doc)