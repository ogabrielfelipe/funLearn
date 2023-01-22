import { useEffect, useState } from "react";

import dynamic from 'next/dynamic'

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
import moment from "moment";


type ThemesAndTeamProps = {
    id: string;
    name: string;
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

export default function HomeTeacher(){
    const [loading, setLoading] = useState(false);

    const [selectedTeam, setSelectedTeam] = useState("0")
    const [selectedTheme, setSelectedTheme] = useState("0")
    const [teams, setTeams] = useState<ThemesAndTeamProps[]>(Array<ThemesAndTeamProps>())
    const [themes, setThemes] = useState<ThemesAndTeamProps[]>(Array<ThemesAndTeamProps>())

    const [chartStudentComplete, setChartStudentComplete] = useState(Array());
    const [chartClassificationStudents, setChartClassificationStudents] = useState(Array());

    const [infoStudents, setInfoStudents] = useState(Array());
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

            let themesAux: ThemesAndTeamProps[] =  Array<ThemesAndTeamProps>();

            themes.data.forEach(t => {
                if (t.active === true) {
                    themesAux.push({
                        id: t.id,
                        name: t.name
                    })
                }
            })
            setThemes(themesAux)

            
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
            console.log(resp.data);
            createChartStudentsComplete(resp.data.statistics.studentsComplete);
            createChartsClassificationStudents(resp.data.statistics.classificationsStudents)
            setInfoStudents(resp.data.infoStudents)
            console.log(resp.data.infoPositions)
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
                    values: [complete, noComplete, 65, 544],
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

        setChartClassificationStudents( [
            {
                x: classificationStudents.x,
                y: classificationStudents.y,
                type: "bar"
            }
        ])
    }

    function handleShowModelInfoStudent(idStudent: string) {

        setInfoPositionByStudent(infoPositions.filter(position => {
            if (position.idStudent === idStudent) return position
        })[0])

        let positionID: string = infoPositions.filter(position => {
            if (position.idStudent === idStudent) return position
        })[0].idPosition

        let auxGames =  infoGames.filter(game => {
            if (game.positionID === positionID) return game
        })
        setInfoGameStudent(auxGames)

        let modelOpen = document.getElementById("modelInfoStudent");
        modelOpen?.classList.add(styles.modelInfoStudentShow);
    }

    function handleCloseModelInfoStudent(){
        let modelOpen = document.getElementById("modelInfoStudent");
        modelOpen?.classList.remove(styles.modelInfoStudentShow);
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
                            onChange={(e) => setSelectedTeam(e.target.value)}
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
                            {themes.map(theme => {
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
                                layout={ {title: 'Pontuação dos alunos' } } 
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
                                <span>{student.nameStudent}</span>    
                            </ListStudent> 
                        )
                    })}
                </ContentListStudents>        
                
            </Container> 



            <div className={styles.modelInfoStudent} id="modelInfoStudent">
            <div className={styles.contentModelInfoStudent}>
                <span className={styles.btnClose} onClick={handleCloseModelInfoStudent}>
                    X
                </span>

                <div className={styles.contentInfos}>
                    <div className={styles.infos}>
                        <strong className={styles.titleInfo}>Informações Gerais</strong>
                        <span>Data de Início do QUIZZ: <span className={styles.respInfo}>{infoPositionByStudent?.dateInitial}</span></span>
                        <span>Data em que o QUIZZ foi encerrado: <span className={styles.respInfo}>{infoPositionByStudent?.dateFinalization}</span></span>

                        <span>Finalizado por tempo: <span className={styles.respInfo}>{infoPositionByStudent?.finishedTime === false ? "Não":"Sim"}</span></span>
                        <span>Finalizado por perder todas as vidas: <span className={styles.respInfo}>{infoPositionByStudent?.finishedOver === false ? "Não":"Sim"}</span></span>
                        <span>Finalizado por ter terminado o QUIZZ: <span className={styles.respInfo}>{infoPositionByStudent?.finished === false ? "Não":"Sim"}</span></span>
                        
                        <span>Pontuação do QUIZZ: <span className={styles.respInfo}>{infoPositionByStudent?.score}</span></span>

                        <span>Total de tentativas: <span className={styles.respInfo}>{infoPositionByStudent?.attempt}</span></span>
                        <span>Total de Vidas restantes: <span className={styles.respInfo}>{infoPositionByStudent?.life}</span></span>

                        <span>Total de vezes que Recomeçou: <span className={styles.respInfo}>{infoPositionByStudent?.qtdRecommence}</span></span>
                        <span>Data da ultima vez que Recomeçou: <span className={styles.respInfo}>{infoPositionByStudent?.dateRecommence}</span></span>
                    </div>
                    <div className={styles.infos}>
                        <strong className={styles.titleInfo}>Informações das Perguntas</strong>                        
                            {infoGameStudent.map((value, index) => {
                                return (
                                    <div className={styles.contentListAsks} key={value.idGame}>
                                        <span>Pergunta:  <span className={styles.respInfo}>{index+1}</span></span>
                            
                                        <span>Descrição da Pergunta:  <span className={styles.respInfo}>{value.descriptionQuestion}</span></span>
                                        <span>Resposta correta:  <span className={styles.respInfo}>{value.descriptionAnswer}</span></span>
                                        <span>Nível da Pergunta:  <span className={styles.respInfo}>{value.level}</span></span>

                                        <span>Respondeu? <span className={styles.respInfo}>{value.answered === false ? "Não" : "Sim"}</span></span>
                                        <span>Respondeu corretamente? <span className={styles.respInfo}>{value.handleCorrect === false ? "Não" : "Sim" }</span></span>
                                        
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