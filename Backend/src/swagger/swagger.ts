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
            "initialDatas": {
              "id": "5f7fe44b-4ea5-421f-a07d-28d31a7ac700",
              "dateInitial": "28/12/2022 22:49:51",
              "started": true,
              "student": {
                "id": "b3008250-1dd7-4501-aafe-818f8f14df75",
                "name": "Rute"
              },
              "theme": {
                "id": "a2cd9de8-34e5-436d-86c3-3852d2ca4a77",
                "name": "Linguagem de Manipulação de dados (DML)"
              }
            },
            "ListAsks": [
              {
                "level": "INITIAL",
                "total": 4,
                "asks": [
                  {
                    "id": "6a4bb42b-2cc5-4508-8ce1-6d04ef0118b4",
                    "level": "INITIAL"
                  },
                  {
                    "id": "55d03711-594d-4cd4-b7f6-53668eccb452",
                    "level": "INITIAL"
                  },
                  {
                    "id": "325dd53c-99c4-4f94-a6a0-e983d4f6ec7d",
                    "level": "INITIAL"
                  },
                  {
                    "id": "03f55ff1-8726-4d61-ba22-21e23c92dcbd",
                    "level": "INITIAL"
                  }
                ]
              },
              {
                "level": "INTERMEDIARY",
                "total": 3,
                "asks": [
                  {
                    "id": "726ab7a7-6ae5-4e68-9cf7-089b699a9baa",
                    "level": "INTERMEDIARY"
                  },
                  {
                    "id": "6753a791-9627-4cba-b819-5c5398506275",
                    "level": "INTERMEDIARY"
                  },
                  {
                    "id": "1dba071a-7830-4da0-ab28-689b394c4ccb",
                    "level": "INTERMEDIARY"
                  }
                ]
              },
              {
                "level": "ADVANCED",
                "total": 3,
                "asks": [
                  {
                    "id": "5b5d88ab-9474-4154-842e-8e536a703710",
                    "level": "ADVANCED"
                  },
                  {
                    "id": "50e32eb6-46e4-488f-987d-cb40c2ed09e7",
                    "level": "ADVANCED"
                  },
                  {
                    "id": "0a4820f7-7df8-4762-802a-cd2d3d9e5d3d",
                    "level": "ADVANCED"
                  }
                ]
              }
            ]
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