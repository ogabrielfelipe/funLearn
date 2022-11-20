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
type ListTeachersProps = {
    id: string,
    name: string,
    useername: string,
    active: boolean,
}

type ListView = {
    id: string,
    name1: string,
    name2: string,
}


interface TeachersFindProps {
    listTeachers: TeachersProps[]
    listTeams   : ListTeachersProps[]
}


export default function Studant( { listTeachers, listTeams }: TeachersFindProps ){
    const apiClient = setupAPIClient();
    const [teachers, setTeachers] = useState(listTeachers|| []);
    const [teams, setTeams] = useState(listTeams|| []);
    const [visibleModal, setVisibleModal] = useState(false)
    
    const [teacherToDelete, setTeacherToDelete] = useState("")
    const [loading, setLoading] = useState(false);

    const [passImport, setPassImport] = useState("");
    const [teacherSelected, setTeacherSelected] = useState("0");
    const [fileImport, setFileImport] = useState(null);


    const [filterName, setFilterName] = useState("")

    var listTeachersFor = Array<ListView>();
    teachers.forEach((t, i) => {
        listTeachersFor.push({
            id: t.id,
            name1: t.name,
            name2: t.active ? "Ativo" : "Inativo"
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


    function handleAlterTeacher(identiTeacher: string){
        Router.push(`/teacher/alter/${identiTeacher}`)
    }

    function handleDeleteTeacher(identiTeacher: string){
        setVisibleModal(true)
        setTeacherToDelete(identiTeacher);
    }

    function handleFileSelected(e: any){
        setFileImport(e.target.files[0])
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
                            handleEdit={handleAlterTeacher}
                            handleDelete={handleDeleteTeacher}
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
                        console.log(teacherToDelete)
                        let data = {
                            id: teacherToDelete,
                            name: "",
                            password: "",
                            active: false
                        }

                        await apiClient.put('/teacher', data)
                        .then( async resp => {
                            if (resp.status === 200){ 
                                await apiClient.get('/teachers', {
                                    data: {
                                        name: ""
                                    }
                                }).then( res => {
                                    var listTeacherFor = Array<ListView>();
                                    res.data.forEach((t: any, i: any) => {
                                        listTeacherFor.push({
                                            id: t.id,
                                            name1: t.name,
                                            name2: t.active ? "Ativo" : "Inativo",
                                        })                                        
                                    })
                                    setListTeachersConv(listTeacherFor);
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