import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonConfirmBlue } from "../../components/Button";
import { ContentItems } from "../../components/ContentItems";
import { HeaderAuth } from "../../components/Header";
import { InputFrom } from "../../components/Input";
import { ListView } from "../../components/ListView";
import { LoadingManager } from "../../components/Loading";
import { ModalConfirmation } from "../../components/Modal";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Container, ContainerInput, ContainerIpntBut, ContainerList, Content } from "../team/styles";


type TeamProps = {
    team: {
        id: string,
        name: string,
        active: string,
    }
}
type TeacherProps = {
    id: string,
    name: string,
    active: string,
}
type ListView = {
    id: string,
    name1: string,
    name2: string,
}
type ThemeTypeProps = {
    id: string,
    name: string,
    description: string,
    teams: TeamProps[],
    teacher: TeacherProps
}
interface ThemeProps {
    listThemes: ThemeTypeProps[]
}

export default function Theme( { listThemes }:ThemeProps ){

    const apiClient = setupAPIClient();
    const [themes, setThemes] = useState(listThemes || [])


    const [visibleModal, setVisibleModal] = useState(false)
    const [teamToDelete, setTeamToDelete] = useState("")
    const [loading, setLoading] = useState(false);


    const [filterName, setFilterName] = useState("")

    var listThemeFor = Array<ListView>();
    themes.forEach((t, i) => {
        listThemeFor.push({
            id: t.id,
            name1: t.name,
            name2: t.description.length > 50 ? t.description.slice(0, 50)+"..." :  t.description
        })
        
    })
    const [listThemesConv, setListThemesConv] = useState(listThemeFor|| []);

    function handleDeleteTeam(identiTeam: string){
        setVisibleModal(true)
        setTeamToDelete(identiTeam);
    }


    function handleFilterName (e: FormEvent){
        e.preventDefault();

        if (filterName === ""){
            setListThemesConv(listThemeFor)
            return;
        }

        var listConv = Array<ListView>();

        listThemeFor.forEach( (list, index) => {
            var name = list.name1.split(" "); 
            for (var i = 0; i < name.length; i++){
                if (name[i] === filterName){
                    listConv.push(list)
                }
            }
        })

        setListThemesConv(listConv)
    }


    return (
        <>
            <Head>
                <title> Tema - FunLearn </title>
            </Head>
            <HeaderAuth/>
            <Container>
                <ContentItems 
                    title="Visualizar Temas"
                >
                     <Content>
                        <ButtonConfirmBlue onClick={() => { Router.push('/theme/add') }}>
                            Novo
                        </ButtonConfirmBlue>

                        <ContainerIpntBut onSubmit={handleFilterName}>
                            <ContainerInput>
                                <InputFrom 
                                    title="Pesquisar pelo nome do Tema:"
                                    placeholder="Nome do Tema"     
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
                            names={listThemesConv}
                            handleEdit={(id) => { Router.push(`/theme/alter/${id}`) }}
                            handleDelete={handleDeleteTeam}
                        />
                            
                    </ContainerList>
                </ContentItems>
            </Container>


            {visibleModal === true ? (
                <ModalConfirmation 
                    title="Confirmação de Inativação"
                    description="Deseja realmente inativar esse Tema?"
                    msgBtnConfirm="Desejo Inativar"
                    msgBtnCancel="Não quero Inativar"
                    handleDeleteRegis={async () => { 
                        setVisibleModal(false)
                        setLoading(true)
                        console.log(teamToDelete)
                        let data = {
                            id: teamToDelete,
                            description: "",
                            name: "",
                            teacherID: "",
                            active: false
                        }

                        await apiClient.put('/theme', data)
                        .then( async resp => {
                            if (resp.status === 200){ 
                                await apiClient.get('/themes', {
                                    data: {
                                        name: ""
                                    }
                                }).then( res => {

                                    var listThemeFor = Array<ListView>();
                                    res.data.forEach((t, i) => {
                                        listThemeFor.push({
                                            id: t.id,
                                            name1: t.name,
                                            name2: t.description.length > 50 ? t.description.slice(0, 50)+"..." :  t.description
                                        })
                                        
                                    })

                                    setListThemesConv(listThemeFor)
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
    const res = await apiClient.get('/themes', {
        data: {
            name: ""
        }
    })

    return {
        props:{
            listThemes: res.data
        }
    }
    
    
} )