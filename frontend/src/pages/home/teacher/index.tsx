import { useEffect, useState } from "react";

import dynamic from 'next/dynamic'

//https://plotly.com/javascript/
//https://plotly.com/javascript/is-plotly-free/
//https://github.com/plotly/plotly.js
const Plot = dynamic(
    () => import('react-plotly.js'),
    { ssr: false }
)

import { setupAPIClient } from "../../../services/api";

import Head from "next/head";

import { HeaderAuth } from "../../../components/Header";
import { InputFrom, SelectForm } from "../../../components/Input";
import { ButtonConfirmBlue } from "../../../components/Button";

import { Charts, Container, ContainerInput, ContentCharts, ContentFilters, ContentListStudents, ListStudent } from "./styles";
import { OptionSelect } from "../../team/add/styles";
import { LoadingManager } from "../../../components/Loading";
import { toast } from "react-toastify";
import styles from "./Teacher.module.css"


type ThemesAndTeamProps = {
    id: string;
    name: string;
}
type TeamProps = {
    team: {
        id: string;
        active: boolean;
        name: string;
    }
}

type ThemeProps = {
    active: boolean;
    description: string;
    id: string;
    name: string;
    teacher: {
        active: boolean;
        id: string;
        name: string;
    };
    teams: TeamProps[]
}


type InfoPosition = {
    idPosition: string,
    score: number,
    dateInitial: string,
    finished: boolean,
    finishedOver: boolean,
    finishedTime: boolean,
    life: number,
    dateFinalization: string,
    recommence: boolean,
    dateRecommence: string,
    qtdRecommence: number,
    attempt: number,
    idTeam: string,
    nameTeam: string,
    idStudent: string,
    nameStudent: string,
    idTheme: string,
    nameTheme: string
}

type InfoGame = {
    idGame: string,
    point: number,
    tip: number,
    positionID: string,
    answered: boolean,
    handleCorrect: boolean,
    dateCreated: string,
    dateFinalization: string,
    dateVisualized: string,
    idAsk: string,
    descriptionQuestion: string,
    level: string,
    idAnswer: string,
    descriptionAnswer: string
}
type InfoStudent = {
    idStudent: string,
    nameStudent: string,
}

export default function HomeTeacher(){
    const [loading, setLoading] = useState(false);

    const [selectedTeam, setSelectedTeam] = useState("0")
    const [selectedTheme, setSelectedTheme] = useState("0")
    const [teams, setTeams] = useState<ThemesAndTeamProps[]>(Array<ThemesAndTeamProps>())
    const [themes, setThemes] = useState<ThemeProps[]>(Array<ThemeProps>())
    const [themesByTeam, setThemesByTeam] = useState<ThemesAndTeamProps[]>(Array<ThemesAndTeamProps>())

    const [chartStudentComplete, setChartStudentComplete] = useState(Array());
    const [chartClassificationStudents, setChartClassificationStudents] = useState(Array());

    const [infoStudents, setInfoStudents] = useState<InfoStudent[]>(Array<InfoStudent>());
    const [infoPositions, setInfoPositions] = useState<InfoPosition[]>(Array<InfoPosition>());
    const [infoGames, setInfoGames] = useState<InfoGame[]>(Array<InfoGame>());

    const [infoPositionByStudent, setInfoPositionByStudent] = useState<InfoPosition>();
    const [infoGameStudent, setInfoGameStudent] = useState<InfoGame[]>(Array<InfoGame>());


    const apiPrisma = setupAPIClient();


    useEffect(() => {
        async function getTeamsAndThemes(){
            setLoading(true);
            const teams = await apiPrisma.get("/teams", {
                data: {
                    name: ""
                }
            })
            let teamsAux:ThemesAndTeamProps[] =  Array<ThemesAndTeamProps>();
            teams.data.forEach(t => {
                if (t.active === true) {
                    teamsAux.push({
                        id: t.id,
                        name: t.name
                    })
                }
            })
            setTeams(teamsAux)


            const themes = await apiPrisma.get("/themes", {
                data: {
                    name: ""
                }
            })
            setThemes(themes.data)            
            setLoading(false);
        }
        getTeamsAndThemes();
    }, [])


    async function handleFindDashboard(){
        setLoading(true)
        if (selectedTeam === "0" || selectedTheme === "0"){
            toast.warn("É necessário preencher todos os filtros.")
            setLoading(false)
            return;
        } 

        await apiPrisma.get(`/teacher/dashboard/${selectedTeam}/${selectedTheme}`)
        .then(resp => {
            if (resp.data.infoStudents.length === 0){
                toast.info("Essa Turma ainda não possui dados para ser exibido")
                setChartStudentComplete(Array())
                setChartClassificationStudents(Array())
                setInfoStudents(Array<InfoStudent>())
                setInfoPositions(Array<InfoPosition>())
                setInfoGames(Array<InfoGame>())

                setLoading(false)
                return;
            }
            console.log(resp.data)
            createChartStudentsComplete(resp.data.statistics.studentsComplete);
            createChartsClassificationStudents(resp.data.statistics.classificationsStudents)
            setInfoStudents(resp.data.infoStudents)
            setInfoPositions(resp.data.infoPositions)
            setInfoGames(resp.data.infoGames)

            setLoading(false)
        })
        .catch(err => {
            toast.error("Não foi possível realizar a busca.")
            console.error(err);
            setLoading(false)
        })
    }

    function createChartStudentsComplete(studentsComplete){
        let complete = 0;
        let noComplete = 0;

        studentsComplete.forEach(students => {
            if (students.finished === true || students.finishedOver === true || students.finishedTime === true || students.dateFinalization != null){
                complete += 1;
            }else{
                noComplete += 1;
            }
        })


        setChartStudentComplete(            
            [
                {
                    values: [complete, noComplete],
                    labels: ["Completou", "Não Completou"],
                    type: "pie"
                }
            ]
        )
    }

    function createChartsClassificationStudents(classificationsStudents){
        let classificationStudents = {
            x: Array(),
            y: Array(),
        }

        classificationsStudents.forEach(classification => {
            classificationStudents.x.push(classification.nameStudent)
            classificationStudents.y.push(Number(classification.score))
        })

        let media = {
            x: Array(),
            y: Array(),
        }
        classificationsStudents.forEach(() => {
            media.x.push("media")
            media.y.push(3625)
        })

        console.log(media)

        setChartClassificationStudents( [
            {
                x: classificationStudents.x,
                y: classificationStudents.y,
                type: "bar",
                name: "Classificação"
            },
            {
                y: media.y,
                x: classificationStudents.x,
                mode: 'lines',
                connectgaps: true,
                name: `Média: ${3625}pts`
            }
        ])
    }

    function handleShowModelInfoStudent(idStudent: string) {

        setInfoPositionByStudent(infoPositions.filter(position => {
            if (position.idStudent === idStudent) return position
        })[0])

        let position = infoPositions.filter(position => {
            if (position.idStudent === idStudent) return position
        })[0]

        if (!position){
            toast.info("O aluno selecionado ainda não possui registros à serem exibido.")
            return;
        }

        let auxGames =  infoGames.filter(game => {
            if (game.positionID === position!.idPosition) return game
        })
        setInfoGameStudent(auxGames)

        let modelOpen = document.getElementById("modelInfoStudent");
        modelOpen?.classList.add(styles.modelInfoStudentShow);
    }

    function handleCloseModelInfoStudent(){
        let modelOpen = document.getElementById("modelInfoStudent");
        modelOpen?.classList.remove(styles.modelInfoStudentShow);
    }

    function handleSelectTeam(e){
        let teamID = e.target.value
        setSelectedTeam(teamID)

        let themesAux = Array();
        themes.filter(theme => {
            theme.teams.filter(teamByTheme => {
                if (teamByTheme.team.id === teamID) {
                    themesAux.push(theme)
                }
            })
        })
        setThemesByTeam(themesAux)
        
    }

    return (
        <>
            <Head>
                <title>Home Teacher - FunLearn</title>
            </Head>
            <HeaderAuth teacher={true}/>
            <Container>                
                <ContentFilters>
                    <ContainerInput>                        
                        <SelectForm
                            title="Selecione uma Turma:"
                            value={selectedTeam}
                            onChange={handleSelectTeam}
                        >   
                            <OptionSelect value={0}>Selecione uma turma</OptionSelect>
                            {teams.map(team => {
                                return (
                                    <OptionSelect key={team.id} value={team.id}>{team.name}</OptionSelect>
                                )
                            })}
                        </SelectForm>
                    </ContainerInput>

                    <ContainerInput>    
                        <SelectForm
                            title="Selecione um Tema:"
                            value={selectedTheme}
                            onChange={(e) => setSelectedTheme(e.target.value)}
                        >   
                            <OptionSelect value={0}>Selecione um Tema</OptionSelect>
                            {themesByTeam.map(theme => {
                                return (
                                    <OptionSelect key={theme.id} value={theme.id}>{theme.name}</OptionSelect>
                                )
                            })}
                        </SelectForm>
                    </ContainerInput>

                    <ButtonConfirmBlue onClick={handleFindDashboard}>
                        Pesquisar
                    </ButtonConfirmBlue>
                </ContentFilters>

                <ContentCharts>
                    {!chartStudentComplete.length ? <></> : (
                        <strong className={styles.titleInfo}>Estatísticas</strong>
                    )}
                    <Charts>
                        {!chartStudentComplete.length ? <></> : (
                            <Plot
                                data={chartStudentComplete}
                                layout={ {title: 'Percentual dos Alunos que completaram o QUIZZ', } }
                                style={{ "maxWidth": "35rem", "maxHeight": "25rem" }} 
                            />
                        )}

                        {!chartClassificationStudents.length ? <></> : (
                            <Plot
                                data={chartClassificationStudents}
                                layout={ {title: 'Pontuação dos alunos',  } } 
                                style={{ "maxWidth": "35rem", "maxHeight": "25rem"}}
                            />
                        )}
                        
                    </Charts>
                </ContentCharts>        

                <ContentListStudents>
                    {!chartStudentComplete.length ? <></> : (
                    <strong className={styles.titleInfo}>Dados Analíticos por Aluno</strong>
                    )}
                    {infoStudents.map(student =>{
                        return (
                            <ListStudent key={student.idStudent} onClick={() => handleShowModelInfoStudent(student.idStudent)}>
                                {!infoPositions.filter(value => {if (value.idStudent === student.idStudent) return value.idStudent;})[0] ? (
                                    <>
                                        <span style={{"width": "50%"}}>{student.nameStudent}</span>  
                                        <span style={{"width": "50%"}}>Aluno ainda não Participou do QUIZZ</span> 
                                    </>
                                ) : (
                                    <>
                                        <span style={{"width": "50%"}}>{student.nameStudent}</span>    
                                        <span style={{"width": "50%"}}>Aluno já Participou do QUIZZ</span>                                    
                                    </>
                                )}
                            </ListStudent> 
                        )
                    })}
                </ContentListStudents>        
                
            </Container> 



            <div className={styles.modelInfoStudent} id="modelInfoStudent">
            <div className={styles.contentModelInfoStudent}>

                <span className={styles.tittleModel}>
                    {infoPositionByStudent?.nameStudent}
                </span>
                <span className={styles.btnClose} onClick={handleCloseModelInfoStudent}>
                    X
                </span>

                <div className={styles.contentInfos}>
                    <div className={styles.infos}>
                        <strong className={styles.titleInfo}>Informações Gerais</strong>
                        <span>Data de Início do Tema: <span className={styles.respInfo}>{infoPositionByStudent?.dateInitial}</span></span>
                        <span>Data em que o Tema foi encerrado: <span className={styles.respInfo}>{infoPositionByStudent?.dateFinalization}</span></span>

                        <span>Finalizado por tempo: <span className={styles.respInfo}>{!!infoPositionByStudent?.finishedTime === false ? "Não":"Sim"}</span></span>
                        <span>Finalizado por perder todas as vidas: <span className={styles.respInfo}>{!!infoPositionByStudent?.finishedOver === false ? "Não":"Sim"}</span></span>
                        <span>Finalizado por ter terminado o Tema: <span className={styles.respInfo}>{!!infoPositionByStudent?.finished === false ? "Não":"Sim"}</span></span>
                        
                        <span>Pontuação do Tema: <span className={styles.respInfo}>{infoPositionByStudent?.score}</span></span>

                        <span>Total de tentativas: <span className={styles.respInfo}>{infoPositionByStudent?.attempt}</span></span>
                        <span>Total de Vidas restantes: <span className={styles.respInfo}>{infoPositionByStudent?.life}</span></span>

                        <span>Total de vezes que Recomeçou: <span className={styles.respInfo}>{infoPositionByStudent?.qtdRecommence}</span></span>
                        <span>Data da ultima vez que Recomeçou: <span className={styles.respInfo}>{infoPositionByStudent?.dateRecommence}</span></span>
                    </div>
                    <div className={styles.infos}>
                        <strong className={styles.titleInfo}>Informações por Pergunta.  <span style={{fontWeight: "normal", "fontSize": "1.2rem"}}>(Último Registro de Resposta do Tema)</span> </strong>                        
                            {infoGameStudent.map((value, index) => {
                                return (
                                    <div className={styles.contentListAsks} key={value.idGame}>
                                        <span>Pergunta:  <span className={styles.respInfo}>{index+1}</span></span>
                            
                                        <span>Descrição da Pergunta:  <span className={styles.respInfo}>{value.descriptionQuestion}</span></span>
                                        <span>Resposta correta:  <span className={styles.respInfo}>{value.descriptionAnswer}</span></span>
                                        <span>Nível da Pergunta:  <span className={styles.respInfo}>{value.level === "INITIAL" ? "Iniciante" : value.level === "ADVANCED" ? "Avançada" : "Intermediária"}</span></span>

                                        <span>Respondeu? <span className={styles.respInfo}>{!!value.answered === false ? "Não" : "Sim"}</span></span>
                                        <span>Respondeu corretamente? <span className={styles.respInfo}>{!!value.handleCorrect === false ? "Não" : "Sim" }</span></span>
                                        <span>Total de Pontos da Pergunta: <span className={styles.respInfo}>{value.point}</span></span>
                                        
                                        <span>Data de visualização da pergunta:  <span className={styles.respInfo}>{value.dateVisualized}</span></span>
                                        <span>Data que respondeu:  <span className={styles.respInfo}>{value.dateFinalization}</span></span>
                                    </div>
                                )
                            })}
                            
                    </div>
                    </div>
                </div>
            </div>


            {loading === true ? (
                <LoadingManager/>
            ) : (
                <>
                </>
            )}

        </>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const api = setupAPIClient(ctx);
    try{
        const userLog = await api.post('/teacher/auth/session')
        if (userLog.status === 200){
            return{
                props:{
                    userLog: userLog.data
                }
            }
        }else{  
            return{
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }
    }catch(error){
        return{
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    
}