import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import React, { useState, useEffect } from "react";
import { LoadingManager } from "../../../components/Loading";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { HeaderAuth } from "../../../components/Header";
import { Container } from "../../team/styles";
import { ContentItems } from "../../../components/ContentItems";
import { ContentButton, ContentForm, ContentInputForm, ContentInputForm2, OptionSelect } from "../../team/add/styles";
import { InputFrom, InputTextArea, SelectForm } from "../../../components/Input";


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { BtnAsk, ContainerListAsk, ContentSelects, List } from "../../ask/add/styles";
import { ButtonConfirmBlue, ButtonConfirmPink } from "../../../components/Button";
import { Eye, EyeSlash, PencilLine, Trash } from "phosphor-react";


type TeacherProps = {
    id: string,
    name: string,
    active: string,
}
type TeamProps = {
    id: string,
    name: string,
    active: string,
    teacher: TeacherProps
}

interface ThemeProps{
    listTeachers: TeamProps[]
    listTeams: TeacherProps[]
}



export default function AlterTheme( { listTeachers, listTeams }:ThemeProps ){
    const router = useRouter();
    const { themeID } = router.query;


    const [loading, setLoading] = useState(false);
    const [teams, setTeams] = useState<TeamProps[]>(listTeams || []);
    const [teamsByTeacher, setTeamsByTeacher] = useState<TeamProps[]>([]);
    const [teachers, setTeachers] = useState(listTeachers || []);

    const [nameTheme, setNameTheme] = useState("")
    const [descriptionTheme, setDescriptionTheme] = useState("")
    const [themeActiveSelected, setThemeActiveSelected] = useState("1")
    

    const [teacherSelected, setTeacherSelected] = useState("0")

    const [teamSelected, setTeamSelected] = useState("0")
    const [teamSelectedVisible, setTeamSelectedVisible] = useState("1")

    const [listTeamSelecteds, setListTeamSelecteds] = useState(Array())
    const [modeAlter, setModeAlter] = useState(false)

    async function handleSelectedTeam(e){
        e.preventDefault();

        if (teamSelected === "0"){
            toast.info("Por favor, informe uma turma.")
            return;
        }

        let TeamAuxSelected = teams.filter(value => {
            if (value.id === teamSelected){
                return value
            }
        })

        let VerifyTeamSelected = listTeamSelecteds.filter(value => {
            if (value.id === teamSelected){
                return value
            }
        })

        if (VerifyTeamSelected.length != 0){
            toast.error("Turma Já foi Adicionada")
            return;
        }

        setLoading(true)
        const apiClient = setupAPIClient();

        let data={
            teamID: teamSelected,
            themeID: themeID,
            visible: teamSelectedVisible === "1" ? true : false
        }
        await apiClient.post('/theme/connectTeam', data)
        .then(resp => {
            console.log(resp.data);

            apiClient.get(`/theme?themeID=${themeID}`)
            .then(resp2 => {
                const data = resp2.data;
                let dataTeams = Array();
                data.teams.forEach(l => {
                    dataTeams.push({
                        id: l.team.id,
                        name: l.team.name,
                        visible: l.visible,
                    })
                })

                setListTeamSelecteds(dataTeams)
            })
            .catch(err => {
                console.log(err)
            })

            setLoading(false)
            toast.success("Turma Vinculada com sucesso!")
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            toast.success("Não foi possível Vincular a turma!")
        })


        setTeamSelected("0")
        setTeamSelectedVisible("1")
    }


    async function handleDeleteTeam(teamID: string, visible: boolean) {
        setLoading(true)
        const apiClient = setupAPIClient();
        let data = {
            teamID: teamID, 
            themeID: themeID,
            visible: !visible,
        }
        await apiClient.delete('/theme/disconnectTeam', {
            data
        })
        .then( resp => {
            apiClient.get(`/theme?themeID=${themeID}`)
            .then(resp2 => {
                const data = resp2.data;
                let dataTeams = Array();
                data.teams.forEach(l => {
                    dataTeams.push({
                        id: l.team.id,
                        name: l.team.name,
                        visible: l.visible,
                    })
                })

                setListTeamSelecteds(dataTeams)
            })
            .catch(err => {
                console.log(err)
            })

            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)    
        })
        
    }


    async function handleRegister(e){
        e.preventDefault();
        setLoading(true)

        let dataTeams = Array();
        listTeamSelecteds.forEach(l => {
            dataTeams.push({
                teamID: l.id,
                visible: l.visible,
            })
        })

        let data = {
            id: themeID,
            name: nameTheme,
            description: descriptionTheme,
            teacherID: teacherSelected,
            active: themeActiveSelected === "1" ? true : false
        }

        const apiClient = setupAPIClient();
        await apiClient.put('/theme', data)
        .then(resp => {
            Router.push('/theme')
            setLoading(false)
            toast.success("Tema cadastrado com sucesso!")
        })
        .catch(err => {
            Router.push('/theme')
            setLoading(false)
            toast.success("Não foi possível cadastrar o tema.")
            console.log(err)
        })
         
    }



    function handleSelectedTeacher(e){
        e.preventDefault();
        setTeacherSelected(e.target.value);

        setTeamsByTeacher(teams.filter(value => {
            if(value.teacher.id === e.target.value){
                return value
            }
        }))

    }




    useEffect(() => {
        async function getTheme(id: string){
            setLoading(true)
            const apiClient = setupAPIClient();
            apiClient.get(`/theme?themeID=${id}`)
            .then(resp => {
                const data = resp.data;
                console.log(data);
                setNameTheme(data.name)
                setDescriptionTheme(data.description)
                
                setTeacherSelected(data.teacher.id)
                setTeamsByTeacher(teams.filter(value => {
                    if(value.teacher.id === data.teacher.id){
                        return value
                    }
                }))

                setThemeActiveSelected(data.active ? "1" : "0")


                let dataTeams = Array();
                data.teams.forEach(l => {
                    dataTeams.push({
                        id: l.team.id,
                        name: l.team.name,
                        visible: l.visible,
                    })
                })

                setListTeamSelecteds(dataTeams)

                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })


        }

        getTheme(themeID as string)

    }, [themeID])


    return(
        <>
             <Head>
                <title> Alterar o Cadastro do Tema - FunLearn </title>
            </Head>
            <HeaderAuth/>
            <Container>
                <ContentItems 
                    title="Cadastrar Tema"
                >
                    <ContentForm onSubmit={handleRegister}>
                        <ContentInputForm>
                            <InputFrom 
                                title="Nome do Tema:"
                                type="text"
                                placeholder="Nome"
                                value={nameTheme}
                                onChange={(e) => setNameTheme(e.target.value)}
                            />
                            <InputTextArea 
                                title="Descrição do Tema:"
                                placeholder="Descrição"
                                value={descriptionTheme}
                                onChange={(e) => setDescriptionTheme(e.target.value)}
                            />
                            <SelectForm
                                title="Professor:"
                                value={teacherSelected}
                                onChange={handleSelectedTeacher}
                            >   
                                <OptionSelect value="0" selected>Selecione o Professor</OptionSelect>
                                {teachers.map(t => {
                                    return (
                                        <OptionSelect value={t.id} key={t.id}>{t.name}</OptionSelect>
                                    )
                                })}
                            </SelectForm>

                            <SelectForm
                                title="Tema Ativo:"
                                value={themeActiveSelected}
                                onChange={(e) => setThemeActiveSelected(e.target.value)}
                            >   
                                <OptionSelect value={1} selected>Sim</OptionSelect>
                                <OptionSelect value={0}>Não</OptionSelect>
                            </SelectForm>
                        </ContentInputForm>


                        <Tabs style={{
                        }}>
                            <TabList >
                            <Tab >Turmas</Tab>
                            </TabList>

                            <TabPanel style={{
                            }}>
                                <ContentInputForm2>
                                    <SelectForm
                                        title="Turmas:"
                                        value={teamSelected}
                                        onChange={(e) => setTeamSelected(e.target.value)}
                                    >   
                                        <OptionSelect value="0" selected>Selecione a turma</OptionSelect>
                                        {teamsByTeacher.map(t => {
                                            return (
                                                <OptionSelect value={t.id} key={t.id}>{t.name}</OptionSelect>
                                            )
                                        })}
                                    </SelectForm>
                                    <ContentSelects>
                                        <div 
                                            style={{marginRight: "1rem" }}
                                        >
                                            <SelectForm
                                                title="Visível:"
                                                value={teamSelectedVisible}
                                                onChange={(e) => setTeamSelectedVisible(e.target.value)}
                                            >   
                                                <OptionSelect value={1} selected>Sim</OptionSelect>
                                                <OptionSelect value={0}>Não</OptionSelect>
                                            </SelectForm>
                                        </div>
                                        

                                        <ButtonConfirmBlue onClick={handleSelectedTeam}>
                                            Adicionar
                                        </ButtonConfirmBlue>
                                    </ContentSelects>

                                    <ContainerListAsk>
                                        {listTeamSelecteds.map((l, i) => {
                                            return (
                                            <List key={l.id}>
                                                <span hidden>{l.id}</span>
                                                <span>{l.name.length > 20 ? l.name.slice(0, 15)+"..." :  l.name}</span>
                                                <span>{l.visible? "Visível" : "Invisível"}</span>
                                                <div>
                                                    <BtnAsk onClick={(e) => { e.preventDefault(); handleDeleteTeam(l.id, l.visible)}}>{l.visible ? ( <Eye size={22} weight="regular" /> ) : ( <EyeSlash size={22} weight="regular" /> )} </BtnAsk>
                                                </div>
                                            </List>
                                            )
                                        })}

                                        
                                            
                                    </ContainerListAsk>
                                </ContentInputForm2>
                            </TabPanel>
                        </Tabs>



                        <ContentButton>
                            <ButtonConfirmPink type="button" onClick={() => Router.push('/theme') }>
                                Cancelar
                            </ButtonConfirmPink>
                            <ButtonConfirmBlue type="submit">
                                Salvar
                            </ButtonConfirmBlue>
                        </ContentButton>


                    </ContentForm>
                </ContentItems>
            </Container>

            {loading === true ? (
                <LoadingManager/>
                ) : (
                    <>
                    </>
                )}
        </>
    )
}



export const getServerSideProps = canSSRAuth( async (ctx: any) => {
    const apiClient = setupAPIClient(ctx);
    const typeUser = ctx.req.cookies['@nextauth.type'];
    try{    

        const resTeams = await apiClient.get('/teams', {
            data: {
                name: ""
            }
        })
    

        if (typeUser === "administrator"){
            const resTeachers = await apiClient.get('/teachers', {
                data: {
                    name: ""
                }
            })

            return {
                props:{
                    listTeachers: resTeachers.data,
                    listTeams: resTeams.data
                }
            }
        }else if (typeUser === "teacher"){

            const idUser = ctx.req.cookies['@nextauth.user'];
            const resTeachers = await apiClient.get('/teacher', {
                params: {
                    teacherID: idUser
                }
            })

            return {
                props:{
                    listTeachers: [resTeachers.data],
                    listTeams: resTeams.data
                }
            }
        }else{
            return {
                props:{
                    listTeachers: [],
                    listTeams: []
                }
            }
        }
    }catch(err){
        //console.log(err)
        return {
            props:{}
        }
    }
    
} )