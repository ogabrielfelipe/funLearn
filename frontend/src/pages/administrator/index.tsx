import Head from "next/head";
import { ButtonConfirmBlue } from "../../components/Button";
import { ContentItems } from "../../components/ContentItems";
import { InputFrom } from "../../components/Input";
import { HeaderAuth } from "../../components/Header";
import { Container } from "../styles";
import { ContainerInput, ContainerIpntBut, ContainerList, Content } from "./styles";
import { ListView } from "../../components/ListView";
import Router from "next/router";


import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FormEvent, useState } from "react";
import { ModalConfirmation } from "../../components/Modal";
import { LoadingManager } from "../../components/Loading";
import { toast } from "react-toastify";


type ListAdministratorProps = {
    id: string,
    name: string,
    username: string,
    password: boolean,
}

type ListView = {
    id: string,
    name1: string,
    name2: boolean,
}

interface ListTeams{
    listAdministrator: ListAdministratorProps[]
}

export default function Turma({ listAdministrator }: ListTeams){
    const apiClient = setupAPIClient();
    const [administrators, setAdministrators] = useState(listAdministrator || [])
    const [visibleModal, setVisibleModal] = useState(false)
    const [administratorToDelete, setAdministratorToDelete] = useState("")
    const [loading, setLoading] = useState(false);


    const [filterName, setFilterName] = useState("")

    var listTeamFor = Array<ListView>();
    administrators.forEach((t, i) => {
        listTeamFor.push({
            id: t.id,
            name1: t.name,
            name2: t.password,
        })
        
    })
    const [listTeamsConv, setListTeamsConv] = useState(listTeamFor|| []);

    async function handleAlterTeam(identiTeam: string){
        Router.push(`/administrator/alter/${identiTeam}`)
    }

    async function handleDeleteTeam(identiTeam: string){
        setVisibleModal(true)
        setAdministratorToDelete(identiTeam);
    }


    function handleFilterName (e: FormEvent){
        e.preventDefault();

        if (filterName === ""){
            setListAdministratorConv(listAdministratorFor)
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

        setListAdministratorConv(listConv)
    }

    return (
        <>
            <Head>
                <title> Administrador - FunLearn </title>
            </Head>
            <HeaderAuth teacher={false}/>
            <Container>
                <ContentItems 
                    title="Visualizar Administrador"
                >
                    <Content>
                        <ButtonConfirmBlue onClick={() => { Router.push("/administrator/add") }}>
                            Novo
                        </ButtonConfirmBlue>

                        <ContainerIpntBut onSubmit={handleFilterName}>
                            <ContainerInput>
                                <InputFrom 
                                    title="Pesquisar pelo nome do Administrador:"
                                    placeholder="Nome do Administrador"   
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
                            names={listAdministratorConv}
                            handleEdit={handleAlterAdministrator}
                            handleDelete={handleDeleteAdministrator}
                        />
                            
                    </ContainerList>
                    
                </ContentItems>
            </Container>


            {visibleModal === true ? (
                <ModalConfirmation 
                    title="Confirmação de Inativar"
                    description="Deseja realmente inativar esse administrador?"
                    msgBtnConfirm="Desejo Inativar"
                    msgBtnCancel="Não quero Inativar"
                    handleDeleteRegis={async () => { 
                        setVisibleModal(false)
                        setLoading(true)
                        console.log(administratorToDelete)
                        let data = {
                            ident: administratorToDelete,
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
                                            name2: t.password,
                                        })                                        
                                    })
                                    setListTeamsConv(listTeamFor);
                                })
                                setLoading(false)
                                toast.success("Administrator Inativado com sucesso!");                                
                            }
                        })  
                        .catch(err => {
                            setLoading(false)
                            console.log(err)
                            toast.error("Não foi possível inativar o administrator, Motivo: " + err.response.data.error);
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
    const res = await apiClient.get('/administrators', {
        data: {
            name: ""
        }
    })

    return {
        props:{
            listAdministrator: res.data
        }
    }
    
    
} )