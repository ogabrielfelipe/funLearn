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
            "name": "Student",
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
        },
        {
            "name": "Game",
            "description": "Endpoint" 
        },
        {
            "name": "Tip",
            "description": "Endpoint" 
        },
        {
            "name": "Theme",
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

        countItems:[
            {
              "count_students": "2",
              "count_themes": "1",
              "count_asks": "1",
              "count_teachers": "2",
              "count_teams": "3",
              "count_administrators": "2"
            }
          ],

//-------------------- ## MODEL EstudentE ## --------------------
        student:{
            name: "Barbara M. Dalton",
            register: 120998977234,
            password: "********",
            active: true,
            teamID: "4531b848-15c8-4dfe-baf8-564491fd4a04"
        },
        studentFile:{
            password: "********",
            teamID: "4531b848-15c8-4dfe-baf8-564491fd4a04"
        },
        Addstudent:{
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
        Authstudent:{
            register: 12332112345,
            password: "********"
        },
        AuthstudentRes:{
            $id:"4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Fulano da Silva Rodrigues",
            $register: "12332112345",
            $active: true
        },
        studentChange:{
            $studentID: "4531b848-15c8-4dfe-baf8-564491fd4a04",
            $name: "Barbara M. Dalton",
            password: "********",
            active: true,
            $teamID: "4531b848-15c8-4dfe-baf8-564491fd4a04"
        },
        studentChangeRes:{
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
        Findstudent:{
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
        Findstudents: {
            name: "gabriel OU parte do nome OU aspas vazia"
        },
        FindstudentsRes: [
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


        CreateManystudents500:{
            "header": "Error",
            "code": 500,
            "description": {
                "code": "P2002",
                "clientVersion": "4.3.1",
                "meta": {
                    "target": "student_register_key"
                }
            }
        },
        CreateManystudent200:{
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
        Ask2:{
            id: "46e50259-ab8d-40e8-8c68-5fc81f604e43",
            question: " Aqui será informado uma pergunta ",
            active: true,
            image: "image.png",
            level: "INITIAL",            
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



        // --------------------- GAME --------------------------------

        StartGame:{
            themeID: "031dd41f-15f2-490b-9eb4-99779b43480c",
            studentID: "031dd41f-15f2-490b-9eb4-99779b43480c",
        },
        StartGameRes: {
            "id": "c3a57b01-6bd4-4415-967e-a84f553e1768",
            "dateInitial": "20/12/2022 21:26:52",
            "started": true,
            "student": {
              "id": "eb83fc87-0692-46de-9e23-472a979c4b37",
              "name": "Esther Ribeiro"
            },
            "theme": {
              "id": "e28a18e5-efb9-4a1e-98c8-b48ab418d390",
              "name": "INSERT sql"
            }
        },

        // --------------------- TIP --------------------------------
        CreateTip:{
            name: "Descrição da dica.",
            askID: "031dd41f-15f2-490b-9eb4-99779b43480c",
            visible: true
        },
        CreateTipRes:{
            id: "031dd41f-15f2-490b-9eb4-99779b43480c",
            name: "Descrição da dica."
        },
        ChangeTip:{
            id: "031dd41f-15f2-490b-9eb4-99779b43480c",
            name: "Descrição da dica.",
            visible: true
        },
        ChangeTipRes:{
            id: "031dd41f-15f2-490b-9eb4-99779b43480c",
            name: "Descrição da dica.",
            visible: true
        },
        // --------------------- THEME --------------------------------
        CreateTheme:{
            "name": "Introdução a Banco de Dados 2",
            "description": "Descrição do Banco de Dados1",
            "teacherID": "35dd2aa2-db19-4863-95c0-7880e0c25144",
            "teams": [
              {
              "teamID": "e7748402-2c19-4226-b666-f88e14188021",
              "visible": true
              }
            ]
        },
        CreateThemeRes:{
            "data": {
              "theme": {
                "id": "924db79f-f2d1-4924-8b22-b29889fb7b80",
                "name": "Introdução a Banco de Dados 2",
                "description": "Descrição do Banco de Dados1",
                "active": true,
                "teacher": {
                  "id": "76664920-f191-456e-a148-370ca4a27b33",
                  "name": "Lucas Ribeiro"
                }
              },
              "connectTeams": {
                "total": 1,
                "data": [
                  {
                    "team": {
                      "id": "da6236ae-1325-4c86-bf0e-df83dd2c8212",
                      "name": "1° ano - Informatica",
                      "active": true
                    }
                  }
                ]
              }
            }
          }
    }
}



swaggerAutogen(outputFile, endpointsFiles, doc)