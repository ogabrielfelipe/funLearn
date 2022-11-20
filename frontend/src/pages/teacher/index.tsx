import Head from "next/head";
import Router from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { ButtonConfirmBlue, ButtonConfirmPink } from "../../components/Button";
import { ContentItems } from "../../components/ContentItems";
import { HeaderAuth } from "../../components/Header";
import { InputFrom, SelectForm } from "../../components/Input";
import { ListView } from "../../components/ListView";
import { LoadingManager } from "../../components/Loading";
import { ModalConfirmation } from "../../components/Modal";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";


import { Container } from "../styles";
import { OptionSelect } from "../team/add/styles";
import { ContainerList, ContainerInput, Content, ContainerIpntBut } from "../team/styles";
import { ContainerBtn, ContainerModal, ContentFormModel, ContentModel, Description, LabelInputFile, TextMsg, Title } from "./styles";


type TeamTeachersProps = {
    team:{
      id: string,
      name: string,
      active: boolean
    }
}

type TeachersProps = {
    id: string,
    name: string,
    active: boolean,
    teams: TeamTeachersProps[]
}
type ListTeamsProps = {
    id: string,
    name: string,
    teacherID: string,
    active: boolean,
    teacher: {
      id: string,
      name: string,
      active: boolean
    }
}

type ListView = {
    id: string,
    name1: string,
    name2: string,
}


interface TeachersFindProps {
    listTeachers: TeachersProps[]
    listTeams   : ListTeamsProps[]
}


export default function Studant( { listTeachers, listTeams }: TeachersFindProps ){
    const apiClient = setupAPIClient();
    const [teachers, setTeachers] = useState(listTeachers|| []);
    const [teams, setTeams] = useState(listTeams|| []);
    const [visibleModal, setVisibleModal] = useState(false)
    
    const [teamToDelete, setTeamToDelete] = useState("")
    const [loading, setLoading] = useState(false);

    const [passImport, setPassImport] = useState("");
    const [teamSelected, setTeamSelected] = useState("0");
    const [fileImport, setFileImport] = useState(null);
    const [nameFileImport, setNameFileImport] = useState("");


    const [filterName, setFilterName] = useState("")

    var listTeachersFor = Array<ListView>();
    teachers.forEach((t, i) => {
        listTeachersFor.push({
            id: t.id,
            name1: t.name,
            name2: t.teams.filter((value) => {
                if (value.team.active === true){
                    return value.team.name;
                }
            })[0].team.name
        })  
    })
    const [listTeachersConv, setListTeachersConv] = useState(listTeachersFor|| []);


    function handleFilterName (e: FormEvent){
        e.preventDefault();

        if (filterName === ""){
            setListTeachersConv(listTeachersFor)
            return;
        }

        var listConv = Array<ListView>();

        listTeachersFor.forEach( (list, index) => {
            var name = list.name1.split(" "); 
            for (var i = 0; i < name.length; i++){
                if (name[i] === filterName){
                    listConv.push(list)
                }
            }
        })

        setListTeachersConv(listConv)
    }


    function handleAlterTeam(identiTeam: string){
        Router.push(`/teacher/alter/${identiTeam}`)
    }

    function handleDeleteTeam(identiTeam: string){
        setVisibleModal(true)
        setTeamToDelete(identiTeam);
    }

    function handleFileSelected(e: any){
        setFileImport(e.target.files[0])
        setNameFileImport(e.target.files[0].name)
    }

    
    return (
        <>
            <Head>
                <title> Professor - FunLearn </title>
            </Head>
            <HeaderAuth teacher={false}/>
            <Container>
                <ContentItems 
                        title="Visualizar Professores"
                    >
                    <Content>
                        <div style={{display: "flex", gap: "1rem"}}>
                            <ButtonConfirmBlue onClick={() => { Router.push("/teacher/add") }}>
                                Novo
                            </ButtonConfirmBlue>
                        </div>

                        <ContainerIpntBut onSubmit={handleFilterName}>
                            <ContainerInput>
                                <InputFrom 
                                    title="Pesquisar pelo nome do Professor:"
                                    placeholder="Nome do Professor"       
                                    value={filterName}
                                    onChange={(e) => setFilterName(e.target.value)}                           
                                />
                            </ContainerInput>

                            <ButtonConfirmBlue type="submit">
                                Pesquisar
                            </ButtonConfirmBlue>
                        </ContainerIpntBut>
                    </Content>

                    <ContainerList>
                        <ListView 
                            names={listTeachersConv}
                            handleEdit={handleAlterTeam}
                            handleDelete={handleDeleteTeam}
                        />
                            
                    </ContainerList>

                </ContentItems>
            </Container>

            {visibleModal === true ? (
                <ModalConfirmation 
                    title="Confirmação de Inativar"
                    description="Deseja realmente inativar esse professor?"
                    msgBtnConfirm="Desejo Inativar"
                    msgBtnCancel="Não quero Inativar"
                    handleDeleteRegis={async () => { 
                        setVisibleModal(false)
                        setLoading(true)
                        console.log(teamToDelete)
                        let data = {
                            teacherID: teamToDelete,
                            name: "",
                            password: "",
                            active: false,
                            teamID: teachers.filter((value) => {
                                if (value.id === teamToDelete){
                                    return value.teams
                                }
                            })[0].teams.filter((value) => {
                                if (value.team.active){
                                    return value.team.id
                                }
                            })[0].team.id
                        }

                        await apiClient.put('/teacher', data)
                        .then( async resp => {
                            if (resp.status === 200){ 
                                await apiClient.get('/teachers', {
                                    data: {
                                        name: ""
                                    }
                                }).then( res => {
                                    var listTeamFor = Array<ListView>();
                                    res.data.forEach((t: any, i: any) => {
                                        listTeamFor.push({
                                            id: t.id,
                                            name1: t.name,
                                            name2: t.teams.filter((value: any) => {
                                                if (value.team.active === true){
                                                    return value.team.name;
                                                }
                                                })[0].team.name
                                        })                                        
                                    })
                                    setListTeachersConv(listTeamFor);
                                })
                                setLoading(false)
                                toast.success("Professor Inativado com sucesso!");                                
                            }
                        })  
                        .catch(err => {
                            setLoading(false)
                            console.log(err)
                            toast.error("Não foi possível inativar o professor, Motivo: " + err.response.data.error);
                        })
                    }}
                    handleNotDeleteRegis={() => { setVisibleModal(false) }}
                />
            ) : (
                <>
                </>
            )}

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
    const res = await apiClient.get('/teachers', {
        data: {
            name: ""
        }
    })
    const resT = await apiClient.get('/teams', {
        data: {
            name: ""
        }
    })

    return {
        props:{
            listTeachers: res.data,
            listTeams: resT.data,

        }
    }
    
    
} )