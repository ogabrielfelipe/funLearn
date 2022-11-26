import Head from "next/head"
import Router from "next/router"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { ButtonConfirmBlue } from "../../components/Button"
import { ContentItems } from "../../components/ContentItems"
import { HeaderAuth } from "../../components/Header"
import { InputFrom } from "../../components/Input"
import { ListView } from "../../components/ListView"
import { LoadingManager } from "../../components/Loading"
import { ModalConfirmation } from "../../components/Modal"
import { setupAPIClient } from "../../services/api"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { Container, ContainerInput, ContainerIpntBut, ContainerList, Content } from "../team/styles"

type AsksTypeProps = {
    id: string,
    question: string,
    active: boolean,
    level: string
}
type ListView = {
    id: string,
    name1: string,
    name2: string,
}
interface AsksProps{
    listAsks: AsksTypeProps[]
}

export default function Ask( { listAsks }: AsksProps){
    const apiClient = setupAPIClient();

    const [asks, setAsks] = useState(listAsks || [])
    const [visibleModal, setVisibleModal] = useState(false)
    const [askToDelete, setAskToDelete] = useState("")
    const [loading, setLoading] = useState(false);

    var listTeamFor = Array<ListView>();
    asks.forEach((t, i) => {
        listTeamFor.push({
            id: t.id,
            name1: t.question,
            name2: t.active ? "Ativo" : "Inativo"
        })
        
    })
    const [listAsksConv, setListAsksConv] = useState(listTeamFor|| []);


    const [filterName, setFilterName] = useState("")
    function handleFilterName (e: FormEvent){
        e.preventDefault();

        if (filterName === ""){
            setListAsksConv(listTeamFor)
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

        setListAsksConv(listConv)
    }


    function handleDeleteAsk(identItem: string){
        setAskToDelete(identItem)
        setVisibleModal(true)
    }


    return (
        <>
        <Head>
                <title> Perguntas - FunLearn </title>
            </Head>
            <HeaderAuth/>
            <Container>
                <ContentItems 
                    title="Visualizar Perguntas"
                >
                    <Content>
                        <ButtonConfirmBlue onClick={() => { Router.push("/ask/add") }}>
                            Novo
                        </ButtonConfirmBlue>

                        <ContainerIpntBut onSubmit={handleFilterName}>
                            <ContainerInput>
                                <InputFrom 
                                    title="Pesquisar pela descrição da Pergunta:"
                                    placeholder="Descrição"           
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
                            names={listAsksConv}
                            handleEdit={(askID) => { Router.push(`/ask/alter/${askID}`)}}
                            handleDelete={handleDeleteAsk}
                        />
                            
                    </ContainerList>
                    
                </ContentItems>
            </Container>


            {visibleModal === true ? (
                <ModalConfirmation 
                    title="Confirmação de Inativação"
                    description="Deseja realmente INATIVAR essa Pergunta?"
                    msgBtnConfirm="Desejo inativar"
                    msgBtnCancel="Não desejo inativar"
                    handleDeleteRegis={async () => { 
                        setVisibleModal(false)
                        setLoading(true)
                        console.log(askToDelete)
                        let data = {
                            askID: askToDelete,
                            question: "",
                            active: false
                        }

                        await apiClient.put('/ask', data)
                        .then( async resp => {
                            if (resp.status === 200){ 
                                await apiClient.get('/asks', {
                                    data: {
                                        question: ""
                                    }
                                }).then( res => {
                                    var listTeamFor = Array<ListView>();
                                    res.data.forEach((t: any, i: any) => {
                                        listTeamFor.push({
                                            id: t.id,
                                            name1: t.question,
                                            name2: t.active ? "Ativo" : "Inativo"
                                        })                                        
                                    })
                                    setListAsksConv(listTeamFor);
                                })
                                setLoading(false)
                                toast.success("Pergunta Inativada com sucesso!");                                
                            }
                        })  
                        .catch(err => {
                            setLoading(false)
                            console.log(err)
                            toast.error("Não foi possível inativar a pergunta, Motivo: " + err.response.data.error);
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
    const res = await apiClient.get('/asks', {
        data: {
            question: ""
        }
    })
    
    return {
        props:{
            listAsks: res.data,

        }
    }
} )