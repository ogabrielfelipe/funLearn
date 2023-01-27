import Head from "next/head";
import { ButtonConfirmBlue } from "../../components/Button";
import { ContentItems } from "../../components/ContentItems";
import { InputFrom } from "../../components/Input";
import { HeaderAuth } from "../../components/Header";
import { ContainerInput, ContainerIpntBut, ContainerList, Content, Container } from "./styles";
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
    active: boolean
}

type ListView = {
    id: string,
    name1: string,
    name2: string,
}

interface ListAdministrators{
    listAdministrator: ListAdministratorProps[]
}

export default function Turma({ listAdministrator }: ListAdministrators){
    const apiClient = setupAPIClient();
    const [administrators, setAdministrators] = useState(listAdministrator || [])
    const [visibleModal, setVisibleModal] = useState(false)
    const [administratorToDelete, setAdministratorToDelete] = useState("")
    const [loading, setLoading] = useState(false);


    const [filterName, setFilterName] = useState("")

    var listAdministratorFor = Array<ListView>();
    administrators.forEach((t, i) => {
        listAdministratorFor.push({
            id: t.id,
            name1: t.name,
            name2: t.active ? "Ativo" : "Inativo"
        })
        
    })
    const [listAdministratorConv, setListAdministratorConv] = useState(listAdministratorFor|| []);

    async function handleAlterAdministrator(identiAdministrator: string){
        Router.push(`/administrator/alter/${identiAdministrator}`)
    }

    async function handleDeleteAdministrator(identiAdministrator: string){
        setVisibleModal(true)
        setAdministratorToDelete(identiAdministrator);
    }


    function handleFilterName (e: FormEvent){
        e.preventDefault();

        if (filterName === ""){
            setListAdministratorConv(listAdministratorFor)
            return;
        }

        var listConv = Array<ListView>();

        listAdministratorFor.forEach( (list, index) => {
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
            <HeaderAuth/>
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
                            id: administratorToDelete,
                            name: "",
                            password: "",
                            active: false
                        }

                        await apiClient.put('/administrator', data)
                        .then( async resp => {
                            if (resp.status === 200){ 
                                await apiClient.get('/adminstrators', {
                                    data: {
                                        name: ""
                                    }
                                }).then( res => {
                                    var listAdministratorFor = Array<ListView>();
                                    res.data.forEach((t: any, i: any) => {
                                        listAdministratorFor.push({
                                            id: t.id,
                                            name1: t.name,
                                            name2: t.active ? "Ativo" : "Inativo",
                                        })                                        
                                    })
                                    setListAdministratorConv(listAdministratorFor);
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
    const res = await apiClient.get('/adminstrators', {
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