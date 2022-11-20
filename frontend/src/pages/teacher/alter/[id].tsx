import Head from "next/head";
import Router, { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
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

interface AlterTeacherProps {
    teams: teamsFindProps[]
}



export default function AlterStudent( { teams }: AlterTeacherProps ){
    const apiClient = setupAPIClient();
    const router = useRouter();
    const { id } = router.query;

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


    useEffect(() =>{
        async function LoadingStudent(){
            setLoading(true);
            await apiClient.get(`/teacher?teacherID=${id}`)
            .then(resp => {
                setLoading(false);
                setNameTeacher(resp.data.name)
                setRegisterTeacher(Number(resp.data.register))
                setTeamSelected(resp.data.teams.filter((value: any) => {
                    if (value.team.active){
                        return value.team.id
                    }
                })[0].team.id)
                setTeacherActive(resp.data.active === true ? "1": "0")
            })
            .catch(err => {
                setLoading(false);
                console.log(err)

            })
        }
        LoadingStudent()
    }, [])


    async function handleRegisterTeam(e: FormEvent){
        e.preventDefault();
        setLoading(true);

        if (nameTeacher === ""){
            setLoading(false);
            toast.warn("Por favor, informe o nome do professor.")
            return;
        }

        let data = {
            id: id,
            name: nameTeacher,
            teamID: teamSelected,
            active: teacherActive === "1"? true : false,
            password: passTeacher,
        }

        await apiClient.put('/teacher', data)
        .then(resp => {
            if (resp.status === 200){
                setLoading(false);
                toast.success("Professor Alterado com sucesso!");
                Router.push("/teacher")
            }
        })
        .catch(err => {
            setLoading(false);
            console.log(err)
            toast.error("Não foi possível realizar a alteração, Motivo: "+err.response.data.error);
        })

    }

    return (
        <>
            <Head>
                <title> Alteração do Cadastro do Professor - FunLearn </title>
            </Head>
            <HeaderAuth teacher={false}/>
            <Container>
                <ContentItems 
                    title="Alteração do Professor"
                >
                    <ContentForm onSubmit={handleRegisterTeam}>
                        <ContentInputForm>
                            <InputFrom 
                                title="Nome do Aluno:"
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
                                disabled
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
                            <ButtonConfirmBlue type="submit">
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