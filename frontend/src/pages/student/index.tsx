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
import { ContainerBtn, ContainerModal, ContentFormModel, ContentModel, Description, LabelInputFile, Title } from "./styles";


type TeamStudantsProps = {
    team:{
      id: string,
      name: string,
      active: boolean
    }
}

type StudantsProps = {
    id: string,
    name: string,
    active: boolean,
    teams: TeamStudantsProps[]
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


interface StudantsFindProps {
    listStudants: StudantsProps[]
    listTeams   : ListTeamsProps[]
}


export default function Studant( { listStudants, listTeams }: StudantsFindProps ){
    const apiClient = setupAPIClient();
    const [studants, setStudants] = useState(listStudants|| []);
    const [teams, setTeams] = useState(listTeams|| []);
    const [visibleModal, setVisibleModal] = useState(false)
    const [visubleModelImport, setVisubleModelImport] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState("")
    const [loading, setLoading] = useState(false);

    const [passImport, setPassImport] = useState("");
    const [teamSelected, setTeamSelected] = useState("0");
    const [fileImport, setFileImport] = useState(null);


    const [filterName, setFilterName] = useState("")

    var listStudantFor = Array<ListView>();
    studants.forEach((s, i) => {
        listStudantFor.push({
            id: s.id,
            name1: s.name,
            name2: s.teams.filter((value) => {
                if (value.team.active === true){
                    return value.team.name;
                }
            })[0].team.name
        })  
    })
    const [listStudantsConv, setListStudantsConv] = useState(listStudantFor|| []);


    function handleFilterName (e: FormEvent){
        e.preventDefault();

        if (filterName === ""){
            setListStudantsConv(listStudantFor)
            return;
        }

        var listConv = Array<ListView>();

        listStudantFor.forEach( (list, index) => {
            var name = list.name1.split(" "); 
            for (var i = 0; i < name.length; i++){
                if (name[i] === filterName){
                    listConv.push(list)
                }
            }
        })

        setListStudantsConv(listConv)
    }


    function handleAlterTeam(identiTeam: string){
        Router.push(`/student/alter/${identiTeam}`)
    }

    function handleDeleteTeam(identiTeam: string){
        setVisibleModal(true)
        setTeamToDelete(identiTeam);
    }

    async function handleFileImport(e: FormEvent){
        e.preventDefault();

        if (!fileImport){
            toast.warn("Por favor, importe o arquivo")
        }
        console.log(fileImport)

        const data = new FormData();

        data.append("file", fileImport)
        data.append("password", passImport)
        data.append("teamID", teamSelected)

        console.log(data)

        await apiClient.post("/student/many")
        .then(resp => {
            console.log(resp)
        })
        .catch(err => {
            console.log(err)
        })

    }

    function handleFileSelected(e){
        setFileImport(e.target.files[0])
    }

    
    return (
        <>
            <Head>
                <title> Aluno - FunLearn </title>
            </Head>
            <HeaderAuth teacher={false}/>
            <Container>
                <ContentItems 
                        title="Visualizar Alunos"
                    >
                    <Content>
                        <div style={{display: "flex", gap: "1rem"}}>
                            <ButtonConfirmBlue onClick={() => { Router.push("/student/add") }}>
                                Novo
                            </ButtonConfirmBlue>
                            <ButtonConfirmBlue onClick={() => setVisubleModelImport(true)}>
                                Importar
                            </ButtonConfirmBlue>
                        </div>

                        <ContainerIpntBut onSubmit={handleFilterName}>
                            <ContainerInput>
                                <InputFrom 
                                    title="Pesquisar pelo nome do Aluno:"
                                    placeholder="Nome do Aluno"       
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
                            names={listStudantsConv}
                            handleEdit={handleAlterTeam}
                            handleDelete={handleDeleteTeam}
                        />
                            
                    </ContainerList>

                </ContentItems>
            </Container>


            {visubleModelImport === true ? (
                <ContainerModal>
                    <ContentModel>
                        <Title>Cadastrar Aluno em Massa</Title>
        
                        <Description>Para fazer o cadastro por meio da Importação, deverá baixar <a href="/modelo_criacao_usuario_aluno.xlsx" style={{color: "#8870FF", cursor: "pointer "}} download>o modelo de importação</a>, preencher e, por fim, fazer a importação.</Description>

                        <ContentFormModel onSubmit={handleFileImport}>
                            <LabelInputFile>
                                <input 
                                type="file" 
                                required
                                onChange={handleFileSelected}
                                />
                                <span>Importar Arquivo</span>
                            </LabelInputFile>
                            <InputFrom 
                                title="Senha Padrão:"
                                type={"password"}
                                placeholder="Senha"
                                value={passImport}
                                onChange={(e) => setPassImport(e.target.value)}
                            />

                            <SelectForm
                                title="Selecione uma Turma"
                                placeholder="Turma"
                                value={teamSelected}
                                onChange={(e) => setTeamSelected(e.target.value)}
                            >   
                                <OptionSelect value={0} selected>Turma</OptionSelect>
                                {teams.map((team, index) => {
                                    return (
                                        <OptionSelect key={team.id} value={team.id} hidden={!team.active}>{team.name}</OptionSelect>
                                    )
                                })}
                            </SelectForm>

                            <ContainerBtn>
                                <ButtonConfirmPink onClick={() => setVisubleModelImport(false)}>
                                    Cancelar
                                </ButtonConfirmPink>
                                <ButtonConfirmBlue type="submit">
                                    Importar
                                </ButtonConfirmBlue>
                            </ContainerBtn>
                        </ContentFormModel>
                    </ContentModel>
                </ContainerModal>
            ): (
                <>
                </>
            )}


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
                            studantID: teamToDelete,
                            name: "",
                            password: "",
                            active: false,
                            teamID: studants.filter((value) => {
                                if (value.id === teamToDelete){
                                    return value.teams
                                }
                            })[0].teams.filter((value) => {
                                if (value.team.active){
                                    return value.team.id
                                }
                            })[0].team.id
                        }

                        await apiClient.put('/student', data)
                        .then( async resp => {
                            if (resp.status === 200){ 
                                await apiClient.get('/students', {
                                    data: {
                                        name: ""
                                    }
                                }).then( res => {
                                    var listTeamFor = Array<ListView>();
                                    res.data.forEach((s: any, i: any) => {
                                        listTeamFor.push({
                                            id: s.id,
                                            name1: s.name,
                                            name2: s.teams.filter((value) => {
                                                if (value.team.active === true){
                                                    return value.team.name;
                                                }
                                                })[0].team.name
                                        })                                        
                                    })
                                    setListStudantsConv(listTeamFor);
                                })
                                setLoading(false)
                                toast.success("Aluno Inativado com sucesso!");                                
                            }
                        })  
                        .catch(err => {
                            setLoading(false)
                            console.log(err)
                            toast.error("Não foi possível inativar o aluno, Motivo: " + err.response.data.error);
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
    const res = await apiClient.get('/students', {
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
            listStudants: res.data,
            listTeams: resT.data,

        }
    }
    
    
} )