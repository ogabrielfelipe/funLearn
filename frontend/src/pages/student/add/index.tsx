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

interface AddStudantProps {
    teams: teamsFindProps[]
}



export default function AddStudant( { teams }: AddStudantProps ){

    const [teamList, setTeamList] = useState(teams || [])
    const [loading, setLoading] = useState(false);


    const [nameStudent, setNameStudent] = useState("");
    const [registerStudent, setRegisterStudent] = useState<any>();
    const [passStudent, setNPassStudent] = useState("");

    const [teamSelected, setTeamSelected] = useState("0");
    const [studentActive, setStudentActive] = useState("1");
    function handleTeamSelected(e: any){
        setTeamSelected(e.target.value)
    }
    function handleStudentActive(e: any){
        setStudentActive(e.target.value)
    }


    async function handleRegisterTeam(e: FormEvent){
        e.preventDefault();
        setLoading(true);

        if (teamSelected === "0"){
            setLoading(false);
            toast.warn(" Nenhum professor selecionado! ")
            return;
        }
        if (nameStudent === ""){
            setLoading(false);
            toast.warn("Por favor, informe o nome do aluno.")
            return;
        }
        if (registerStudent === undefined || registerStudent === 0){
            setLoading(false);
            toast.warn("Por favor, informe o número de matrícula do aluno.")
            return;
        }
        if (passStudent === ""){
            setLoading(false);
            toast.warn("Por favor, informe uma senha para realizar o cadastro.")
            return;
        }


        let data = {
            name: nameStudent,
            teamID: teamSelected,
            active: studentActive === "1"? true : false,
            password: passStudent,
            register: registerStudent
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/student', data)
        .then(resp => {
            if (resp.status === 200){
                setLoading(false);
                toast.success("Aluno Cadastrado com sucesso!");
                Router.push("/student")
            }
        })
        .catch(err => {
            setLoading(false);
            console.error(err)
            if(err.response.data.mensage.split('`')[3] === 'student_register_key'){
                toast.error("Não foi possível realizar o cadastro, Motivo: Já existe um aluno com essa matrícula.");
                return;
            }
            toast.error("Não foi possível realizar o cadastro, Motivo: "+err.response.data);
        })

    }

    return (
        <>
            <Head>
                <title> Cadastro de Aluno - FunLearn </title>
            </Head>
            <HeaderAuth/>
            <Container>
                <ContentItems 
                    title="Cadastrar Aluno"
                >
                    <ContentForm onSubmit={handleRegisterTeam}>
                        <ContentInputForm>
                            <InputFrom 
                                title="Nome do Aluno:"
                                type={"text"}
                                placeholder="Nome"
                                value={nameStudent}
                                onChange={(e) => setNameStudent(e.target.value)}
                            />
                            <InputFrom 
                                title="Matrícula do Aluno:"
                                type={"number"}
                                placeholder="Matrícula"
                                value={registerStudent}
                                onChange={(e) => setRegisterStudent(Number(e.target.value))}
                            />
                            <InputFrom 
                                title="Senha:"
                                type={"password"}
                                placeholder="Sennha"
                                value={passStudent}
                                onChange={(e) => setNPassStudent(e.target.value)}
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
                                title="Aluno Ativo:"
                                value={studentActive}
                                onChange={handleStudentActive}
                            >   
                                <OptionSelect value={1}>Sim</OptionSelect>
                                <OptionSelect value={0}>Não</OptionSelect>
                            </SelectForm>
                        </ContentInputForm>

                        <ContentButton>
                            <ButtonConfirmPink type="button" onClick={() => Router.push('/student') }>
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