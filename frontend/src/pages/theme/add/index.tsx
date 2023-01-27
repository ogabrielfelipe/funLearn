import React, { useState } from "react";
import Head from "next/head";
import { ContentItems } from "../../../components/ContentItems";
import { HeaderAuth } from "../../../components/Header";
import { InputFrom, InputTextArea, SelectForm } from "../../../components/Input";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { ContentButton, ContentForm, ContentInputForm, ContentInputForm2, OptionSelect } from "../../team/add/styles";
import { Container } from "../../team/styles";
import { ButtonConfirmBlue, ButtonConfirmPink } from "../../../components/Button";
import Router from "next/router";
import { LoadingManager } from "../../../components/Loading";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { BtnAsk, ContainerListAsk, ContentSelects, List } from "../../ask/add/styles";
import { PencilLine, Trash } from "phosphor-react";
import { toast } from "react-toastify";


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

export default function AddTheme( { listTeachers, listTeams }:ThemeProps ){
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

    function handleSelectedTeam(e){
        e.preventDefault();

        if (modeAlter) {
            if (teamSelected === "0"){
                toast.info("Por favor, informe uma turma.")
                return;
            }

            let TeamAuxSelectedList = listTeamSelecteds.filter(value => {
                if (value.id === teamSelected){
                    return value
                }
            })

            
            let OtherTeams = listTeamSelecteds.filter(value => {
                if (value.id !== teamSelected){
                    return value
                }
            })
            
            console.log([...TeamAuxSelectedList, ...OtherTeams])


            let TeamAuxSelected = teams.filter(value => {
                if (value.id === teamSelected){
                    return value
                }
            })
            TeamAuxSelectedList[0].id = TeamAuxSelected[0].id
            TeamAuxSelectedList[0].name = TeamAuxSelected[0].name
            TeamAuxSelectedList[0].visible = teamSelectedVisible === "1" ? true : false

            setListTeamSelecteds([...TeamAuxSelectedList, ...OtherTeams])

            setTeamSelected("0")
            setTeamSelectedVisible("1")
            setModeAlter(false)
            return;
        }

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

        console.log(VerifyTeamSelected)
        if (VerifyTeamSelected.length != 0){
            toast.error("Turma Já foi Adicionada")
            return;
        }


        let teamsAux = Array();
        teamsAux.push({
            id: TeamAuxSelected[0].id,
            name: TeamAuxSelected[0].name,
            visible: teamSelectedVisible === "1" ? true : false
        }, ...listTeamSelecteds)
        setListTeamSelecteds(teamsAux)


        setTeamSelected("0")
        setTeamSelectedVisible("1")
    }

    function handleAlterTeam(teamID: string){

        listTeamSelecteds.filter(value => {
            if (value.id === teamID) {
                setTeamSelected(value.id);
                setTeamSelectedVisible(value.visible ? "1" : "0");
                return value
            }
        })
        setModeAlter(true)

    }

    function handleDeleteTeam(teamID: string){
        setListTeamSelecteds(listTeamSelecteds.filter(value => {
            if (value.id !== teamID) return value;
        }))
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
            name: nameTheme,
            description: descriptionTheme,
            teacherID: teacherSelected,
            teams: dataTeams,
            active: themeActiveSelected === "1" ? true : false
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/theme', data)
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


    return(
        <>
             <Head>
                <title> Cadastro de Tema - FunLearn </title>
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
                                                    <BtnAsk onClick={(e) => { e.preventDefault(); handleDeleteTeam(l.id)}}><Trash size={22} weight="regular" /></BtnAsk>
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