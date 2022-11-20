import Head from "next/head";
import Router from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { ButtonConfirmBlue, ButtonConfirmPink } from "../../../components/Button";
import { ContentItems } from "../../../components/ContentItems";
import { HeaderAuth } from "../../../components/Header";
import { InputFrom, SelectForm } from "../../../components/Input";
import { LoadingManager } from "../../../components/Loading";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { ContentButton, ContentForm, ContentInputForm, OptionSelect } from "../../team/add/styles";
import { Container } from "../../team/styles";


type teamsFindProps = {    
    id: string,
    name: string,
    teacherID: string,
    active: boolean,
    teacher: {
        "id": string,
        "name": string,
        "active": boolean
    }
      
}

interface AddTeacherProps {
    teams: teamsFindProps[]
}



export default function AddTeacher( { teams }: AddTeacherProps ){

    const [teamList, setTeamList] = useState(teams || [])
    const [loading, setLoading] = useState(false);


    const [nameTeacher, setNameTeacher] = useState("");
    const [registerTeacher, setRegisterTeacher] = useState<any>();
    const [passTeacher, setNPassTeacher] = useState("");

    const [teamSelected, setTeamSelected] = useState("0");
    const [teacherActive, setTeacherActive] = useState("1");
    function handleTeamSelected(e: any){
        setTeamSelected(e.target.value)
    }
    function handleTeacherActive(e: any){
        setTeacherActive(e.target.value)
    }


    async function handleRegisterTeam(e: FormEvent){
        e.preventDefault();
        setLoading(true);

        if (nameTeacher === ""){
            setLoading(false);
            toast.warn("Por favor, informe o nome do professor.")
            return;
        }
        
        if (passTeacher === ""){
            setLoading(false);
            toast.warn("Por favor, informe uma senha para realizar o cadastro.")
            return;
        }


        let data = {
            name: nameTeacher,
            teamID: teamSelected,
            active: teacherActive === "1"? true : false,
            password: passTeacher,
            register: registerTeacher
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/teacher', data)
        .then(resp => {
            if (resp.status === 200){
                setLoading(false);
                toast.success("Professor Cadastrado com sucesso!");
                Router.push("/teacher")
            }
        })
        .catch(err => {
            setLoading(false);
            console.log(err)
            toast.error("Não foi possível realizar o cadastro, Motivo: "+err.response.data.error);
        })

    }

    return (
        <>
            <Head>
                <title> Cadastro de Aluno - FunLearn </title>
            </Head>
            <HeaderAuth teacher={false}/>
            <Container>
                <ContentItems 
                    title="Cadastro de Professor"
                >
                    <ContentForm onSubmit={handleRegisterTeam}>
                        <ContentInputForm>
                            <InputFrom 
                                title="Nome do Professor:"
                                type={"text"}
                                placeholder="Nome"
                                value={nameTeacher}
                                onChange={(e) => setNameTeacher(e.target.value)}
                            />
                            <InputFrom 
                                title="Matrícula do Aluno:"
                                type={"number"}
                                placeholder="Matrícula"
                                value={registerTeacher}
                                onChange={(e) => setRegisterTeacher(Number(e.target.value))}
                            />
                            <InputFrom 
                                title="Senha:"
                                type={"password"}
                                placeholder="Sennha"
                                value={passTeacher}
                                onChange={(e) => setNPassTeacher(e.target.value)}
                            />

                            <SelectForm
                                title="Selecione uma Turma"
                                placeholder="Turma"
                                value={teamSelected}
                                onChange={handleTeamSelected}
                            >   
                                <OptionSelect value={0} selected>Turma</OptionSelect>
                                {teamList.map((team, index) => {
                                    return (
                                        <OptionSelect key={team.id} value={team.id} hidden={!team.active}>{team.name}</OptionSelect>
                                    )
                                })}
                            </SelectForm>

                            <SelectForm
                                title="Professor Ativo:"
                                value={teacherActive}
                                onChange={handleTeacherActive}
                            >   
                                <OptionSelect value={1}>Sim</OptionSelect>
                                <OptionSelect value={0}>Não</OptionSelect>
                            </SelectForm>
                        </ContentInputForm>

                        <ContentButton>
                            <ButtonConfirmPink type="button" onClick={() => Router.push('/teacher') }>
                                Cancelar
                            </ButtonConfirmPink>
                            <ButtonConfirmBlue>
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
    const res = await apiClient.get('/teams', {
        data: {
            name: ""
        }
    })

    return {
        props:{
            teams: res.data
        }
    }
})