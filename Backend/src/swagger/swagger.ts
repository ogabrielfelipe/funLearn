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
            "description": "Endpoints" 
        },
        {
            "name": "Ask",
            "description": "Endpoints" 
        },,
        {
            "name": "Answer",
            "description": "Endpoints" 
        },
        {
            "name": "Home",
            "description": "Endpoints" 
        },
        {
            "name": "Game",
            "description": "Endpoints" 
        },
        {
            "name": "Tip",
            "description": "Endpoints" 
        },
        {
            "name": "Theme",
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

//-------------------- ## MODEL STUDENT ## --------------------
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
              "id": "d26334bd-b0dd-482e-9e30-bb8ebe8263b4",
              "dateInitial": "07/01/2023 12:28:21",
              "dateFinish": null,
              "started": true,
              "finished": false,
              "finishedOver": false,
              "finishedTime": false,
              "life": 3,
              "score": "0",
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
              "d0075fde-17da-423b-8308-e2d3797e3dd0",
              "1e7a2b6a-a3f8-45ef-9e8b-b40a279a788f",
              "eb0e3b1d-45c5-4d32-af47-25efb1b4bd28",
              "83fb6c4d-8001-4331-82a2-c769b3ca2bcd",
              "e796692f-d7b0-4ab8-ad9c-f32c7f35270d",
              "902ffb67-203d-4316-a8b8-b5f1e29c8413",
              "c8515824-cad9-43c2-9c4d-a74750c2d389",
              "39d1adde-97ba-405c-adb2-77ad0049bec7",
              "ba6fcded-a199-460b-8a1d-d1a3215a82b8",
              "625ba578-d8b9-42a8-9a5b-404a89c66988"
            ]
        },
        FindAskGameRes:{
            id: "6a4bb42b-2cc5-4508-8ce1-6d04ef0118b4",
            level: "INITIAL",
            question: "O que é DML(Data Manipulation Language)?",
            image: "",
            tip: [
              {
                id: "07f989b9-674c-4cf4-a06c-1655baf8f33e",
                name: "Você pode inserir dados em seu banco de dados usando DML."
              },
              {
                id: "f46b80c2-426a-4059-b4fe-2a93a9908339",
                name: "Um dos principais comandos que está ligado ao DML é o comando de SELECT e INSERT."
              }
            ],
            answer: [
              {
                id: "46d1fe20-af4d-4744-ad8a-ddf247e24387",
                description: " É um subconjunto de SQL usado para gerenciar transações em um banco de dados."
              },
              {
                id: "945bbdd1-486b-438c-9f5e-fdec500f71db",
                description: "Este subconjunto pode ser utilizado para criar e remover as permissões dos usuários."
              },
              {
                id: "9c6990a2-1d2e-40ec-83c1-a63b40265df3",
                description: "É um subconjunto de SQL que serve para a criar a estrutura dos dados da tabela."
              },
              {
                id: "a31e6f30-caf0-488b-adcf-dda873f3bccf",
                description: "É um subconjunto de SQL usado para gerenciar dados em um banco de dados."
              }
            ]
          },
        CheckAnswer: { 
            "askID": "6a4bb42b-2cc5-4508-8ce1-6d04ef0118b4", 
            "answerID": "a31e6f30-caf0-488b-adcf-dda873f3bccf", 
            "positionID": "f1ada8bf-efcc-4c48-8e40-76631a3ff804", 
            "time": "2",
            "attempt": 1, 
            "tip": 0
        },
        CheckAnswerRes: {
            "positionGame": {
              "id": "9718690d-cf81-4212-b6ba-d1850c435a4a",
              "point": 0,
              "right": false
            },
            "finishedGame": {
              "id": "f1ada8bf-efcc-4c48-8e40-76631a3ff804",
              "started": true,
              "finished": false,
              "finishedTime": false,
              "finishedOver": true,
              "score": "2100",
              "life": 3,
              "dateInitial": "30/12/2022 19:41:08",
              "dateFinish": "31/12/2022 09:51:54",
              "studentID": "b3008250-1dd7-4501-aafe-818f8f14df75",
              "themeID": "a2cd9de8-34e5-436d-86c3-3852d2ca4a77"
            }
        },

        FindAsksByPositionRes: [
            {
                "ask": {
                "id": "55d03711-594d-4cd4-b7f6-53668eccb452",
                "level": "INITIAL"
                },
                "answered": false,
                "id": "1e7a2b6a-a3f8-45ef-9e8b-b40a279a788f"
            },
        ],

        ReaberturaRes:{
            "id": "0b483c37-753d-4768-aa3e-9ad57e905d7c",
            "dateInitial": "07/01/2023 16:04:03",
            "dateFinalization": "07/01/2023 16:54:03",
            "started": true,
            "finished": false,
            "finishedOver": false,
            "finishedTime": false,
            "life": 3,
            "score": "0",
            "dateRecommence": "07/01/2023 16:28:30",
            "dateFinalizationRecommence": "07/01/2023 17:18:30",
            "qtdRecommence": 3,
            "recommence": true,
            "student": {
              "id": "b3008250-1dd7-4501-aafe-818f8f14df75",
              "name": "Rute"
            },
            "theme": {
              "id": "a2cd9de8-34e5-436d-86c3-3852d2ca4a77",
              "name": "Linguagem de Manipulação de dados (DML)"
            }
          },
        FindPositionRes: {
            "id": "0b483c37-753d-4768-aa3e-9ad57e905d7c",
            "dateInitial": "07/01/2023 16:04:03",
            "dateFinalization": "07/01/2023 17:48:30",
            "started": true,
            "finished": false,
            "finishedOver": true,
            "finishedTime": true,
            "life": 3,
            "score": "1210",
            "dateRecommence": "07/01/2023 16:28:30",
            "dateFinalizationRecommence": "07/01/2023 18:18:30",
            "qtdRecommence": 3,
            "recommence": true,
            "student": {
              "id": "b3008250-1dd7-4501-aafe-818f8f14df75",
              "name": "Rute"
            },
            "theme": {
              "id": "a2cd9de8-34e5-436d-86c3-3852d2ca4a77",
              "name": "Linguagem de Manipulação de dados (DML)"
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
            "active": true,
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
        },
        ChangeTheme:{
            "id": "1e2e3bdb-414b-4acb-8d33-28caf06b44b5",
            "name": "Introdução a Banco de Dados 2",
            "description": "Descrição do Banco de Dados1",
            "teacherID": "76664920-f191-456e-a148-370ca4a27b33",
            "active": true
        },
        ChangeThemeRes: {
            "id": "1e2e3bdb-414b-4acb-8d33-28caf06b44b5",
            "name": "Introdução a Banco de Dados 2",
            "description": "Descrição do Banco de Dados1",
            "active": true,
            "teacherID": "76664920-f191-456e-a148-370ca4a27b33"
        },
        FindThemeRes: {
            "id": "1e2e3bdb-414b-4acb-8d33-28caf06b44b5",
            "name": "Introdução a Banco de Dados 2",
            "description": "Descrição do Banco de Dados1",
            "active": true,
            "teacher": {
              "id": "76664920-f191-456e-a148-370ca4a27b33",
              "name": "Lucas Ribeiro"
            },
            "teams": [
              {
                "team": {
                  "id": "da6236ae-1325-4c86-bf0e-df83dd2c8212",
                  "name": "1° ano - Informatica"
                },
                "visible": true
              }
            ]
        },
        FindThemeMany:{
            "name": "Introdução a Banco de Dados 2",
        },
        FindThemeManyRes: [
            {
              "id": "1e2e3bdb-414b-4acb-8d33-28caf06b44b5",
              "name": "Introdução a Banco de Dados 2",
              "description": "Descrição do Banco de Dados1",
              "active": true,
              "teams": [
                {
                  "team": {
                    "id": "da6236ae-1325-4c86-bf0e-df83dd2c8212",
                    "name": "1° ano - Informatica",
                    "active": true
                  }
                }
              ],
              "teacher": {
                "id": "76664920-f191-456e-a148-370ca4a27b33",
                "name": "Lucas Ribeiro",
                "active": true
              }
            },
            {
              "id": "a2cd9de8-34e5-436d-86c3-3852d2ca4a77",
              "name": "Linguagem de Manipulação de dados (DML)",
              "description": "DML fornece comandos para que os usuários consigam manipular dados em um banco de dados. A manipulação envolve inserir, recuperar, excluir e atualizar dados em tabelas de banco de dados.",
              "active": true,
              "teams": [
                {
                  "team": {
                    "id": "a4aa0c99-d08a-497f-9d1c-24ff6e5d295d",
                    "name": "3° ano - Informatica",
                    "active": true
                  }
                }
              ],
              "teacher": {
                "id": "ca76239a-3372-4fc1-966e-2fba48c5a8bc",
                "name": "Gabriel Vieira",
                "active": true
              }
            }
        ],
        ConnectTeam:{
            "teamID": "76664920-f191-456e-a148-370ca4a27b33",
            "themeID": "76664920-f191-456e-a148-370ca4a27b33",
            "visible": true
        },
        ConnectTeamRes:{
            "teamID": "da6236ae-1325-4c86-bf0e-df83dd2c8212",
            "themeID": "1e2e3bdb-414b-4acb-8d33-28caf06b44b5",
            "visible": true
        },
        FindThemesByStudentRes: [
          {
            "theme": {
              "id": "a2cd9de8-34e5-436d-86c3-3852d2ca4a77",
              "name": "Linguagem de Manipulação de dados (DML)",
              "description": "DML fornece comandos para que os usuários consigam manipular dados em um banco de dados. A manipulação envolve inserir, recuperar, excluir e atualizar dados em tabelas de banco de dados."
            },
            "team": {
              "id": "a4aa0c99-d08a-497f-9d1c-24ff6e5d295d",
              "name": "3° ano - Informatica",
              "teacher": {
                "id": "ca76239a-3372-4fc1-966e-2fba48c5a8bc",
                "name": "Gabriel Vieira"
              }
            }
          }
        ],
        FinishGame:{ 
          "positionID": "a3b043d5-8555-4222-a4bc-a5972ad2650b",
          "typeFinish": "FINISHED",
          "attempt": 3
        },
        FinishGameRes: {
          "id": "c8d32602-8761-4cdf-8c36-6cd343576e10",
          "started": true,
          "finished": true,
          "finishedTime": false,
          "finishedOver": false,
          "score": "0",
          "life": 3,
          "dateInitial": "31/12/2022 11:35:45",
          "dateFinish": "31/12/2022 11:36:08",
          "studentID": "b3008250-1dd7-4501-aafe-818f8f14df75",
          "themeID": "a2cd9de8-34e5-436d-86c3-3852d2ca4a77"
        },
        RemoveLifeRes: {
          "id": "c146b7b6-a285-41d3-a67f-6e5d02f2f797",
          "dateFinish": "31/12/2022 11:21:28 || null" ,
          "dateInitial": "31/12/2022 11:21:17",
          "finished": false,
          "finishedOver": "true || false",
          "finishedTime": false,
          "life": 0,
          "score": "0",
          "started": true
        }

    }
}



swaggerAutogen(outputFile, endpointsFiles, doc)