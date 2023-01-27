import Head from "next/head";
import { ButtonConfirmBlue } from "../../components/Button";
import { ContentItems } from "../../components/ContentItems";
import { InputFrom } from "../../components/Input";
import { HeaderAuth } from "../../components/Header";
import { Container, ContainerInput, ContainerIpntBut, ContainerList, Content } from "./styles";
import { ListView } from "../../components/ListView";
import Router from "next/router";


import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FormEvent, useState } from "react";
import { ModalConfirmation } from "../../components/Modal";
import { LoadingManager } from "../../components/Loading";
import { toast } from "react-toastify";


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

interface ListTeams{
    listTeams: ListTeamsProps[]
}

export default function Turma({ listTeams }: ListTeams){
    const apiClient = setupAPIClient();
    const [teams, setTeams] = useState(listTeams || [])
    const [visibleModal, setVisibleModal] = useState(false)
    const [teamToDelete, setTeamToDelete] = useState("")
    const [loading, setLoading] = useState(false);


    const [filterName, setFilterName] = useState("")

    var listTeamFor = Array<ListView>();
    teams.forEach((t, i) => {
        listTeamFor.push({
            id: t.id,
            name1: t.name,
            name2: t.active ? "Ativo" : "Inativo"
        })
        
    })
    const [listTeamsConv, setListTeamsConv] = useState(listTeamFor|| []);

    function handleAlterTeam(identiTeam: string){
        Router.push(`/team/alter/${identiTeam}`)
    }

    function handleDeleteTeam(identiTeam: string){
        setVisibleModal(true)
        setTeamToDelete(identiTeam);
    }


    function handleFilterName (e: FormEvent){
        e.preventDefault();

        if (filterName === ""){
            setListTeamsConv(listTeamFor)
            return;
        }

        var listConv = Array<ListView>();

        listTeamFor.forEach( (list, index) => {
            var name = list.name1.split(" "); 
            for (var i = 0; i < name.length; i++){
                if (name[i] === filterName){
                    listConv.push(list)
                }
            }
        })

        setListTeamsConv(listConv)
    }

    return (
        <>
            <Head>
                <title> Turma - FunLearn </title>
            </Head>
            <HeaderAuth/>
            <Container>
                <ContentItems 
                    title="Visualizar Turmas"
                >
                    <Content>
                        <ButtonConfirmBlue onClick={() => { Router.push("/team/add") }}>
                            Novo
                        </ButtonConfirmBlue>

                        <ContainerIpntBut onSubmit={handleFilterName}>
                            <ContainerInput>
                                <InputFrom 
                                    title="Pesquisar pelo nome da Turma:"
                                    placeholder="Nome da Turma"   
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
                            names={listTeamsConv}
                            handleEdit={handleAlterTeam}
                            handleDelete={handleDeleteTeam}
                        />
                            
                    </ContainerList>
                    
                </ContentItems>
            </Container>


            {visibleModal === true ? (
                <ModalConfirmation 
                    title="Confirmação de Inativar"
                    description="Deseja realmente inativar essa turma?"
                    msgBtnConfirm="Desejo Inativar"
                    msgBtnCancel="Não quero Inativar"
                    handleDeleteRegis={async () => { 
                        setVisibleModal(false)
                        setLoading(true)
                        console.log(teamToDelete)
                        let data = {
                            ident: teamToDelete,
                            name: "",
                            teacherID: "",
                            active: false
                        }

                        await apiClient.put('/team', data)
                        .then( async resp => {
                            if (resp.status === 200){ 
                                await apiClient.get('/teams', {
                                    data: {
                                        name: ""
                                    }
                                }).then( res => {
                                    var listTeamFor = Array<ListView>();
                                    res.data.forEach((t: any, i: any) => {
                                        listTeamFor.push({
                                            id: t.id,
                                            name1: t.name,
                                            name2: t.active ? "Ativo" : "Inativo"
                                        })                                        
                                    })
                                    setListTeamsConv(listTeamFor);
                                })
                                setLoading(false)
                                toast.success("Turma Inativada com sucesso!");                                
                            }
                        })  
                        .catch(err => {
                            setLoading(false)
                            console.log(err)
                            toast.error("Não foi possível inativar a turma, Motivo: " + err.response.data.error);
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
    const res = await apiClient.get('/teams', {
        data: {
            name: ""
        }
    })

    return {
        props:{
            listTeams: res.data
        }
    }
    
    
} )