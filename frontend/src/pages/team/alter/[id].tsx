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
import { Container } from "../styles";
import { ContentButton, ContentForm, ContentInputForm, OptionSelect } from "../add/styles";
import { parseCookies } from "nookies";

type TeamProps = {
    id: string,
    name: string,
    active: boolean
  }

type TeacherProps = {
    id: string,
    name: string,
    username: string,
    active: boolean,
    team:[
        {
            id: string,
            name: string,
            active: boolean
        }
    ]
}

interface FindTeacherProps {
    teachers: TeacherProps[]
}


export default function AlterTeam( {teachers}: FindTeacherProps){
    const apiClient = setupAPIClient();
    const router = useRouter();
    const { id } = router.query;
    const [teacherList, setTeacherList] = useState(teachers || [])

    const [nameTeam, setNameTeam] = useState("");

    var teacherSelectedPosition = "0";
    const cookies = parseCookies()
    if (cookies["@nextauth.type"] === "teacher"){
        teacherSelectedPosition = cookies["@nextauth.user"]
    }

    const [teacherSelected, setTeacherSelected] = useState(teacherSelectedPosition);
    const [teamActive, setTeamActive] = useState("1");

    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        async function LoadingTeam(){
            setLoading(true);
            await apiClient.get(`/team?teamID=${id}`)
            .then(resp => {
                setLoading(false);
                setNameTeam(resp.data.name)
                setTeacherSelected(resp.data.teacher.id)
                setTeamActive(resp.data.active === true ? "1": "0")
            })
            .catch(err => {
                setLoading(false);
                console.log(err)

            })
        }
        LoadingTeam()
    }, [])
    
    function handleTeacherSelected(e: any){
        setTeacherSelected(e.target.value)
    }

    function handleTeamActive(e: any){
        setTeamActive(e.target.value)
    }

    async function handleRegisterTeam(e: FormEvent){
        e.preventDefault();
        setLoading(true);

        if (teacherSelected === "0"){
            setLoading(false);
            toast.warn(" Nenhum professor selecionado! ")
            return;
        }
        if (nameTeam === ""){
            setLoading(false);
            toast.warn("Por favor, informe o nome da turma.")
            return;
        }


        let data = {
            ident: id,
            name: nameTeam,
            teacherID: teacherSelected,
            active: teamActive === "1"? true : false
        }

        await apiClient.put('/team', data)
        .then(resp => {
            if (resp.status === 200){
                setLoading(false);
                toast.success("Turma Alterada com sucesso!");
                Router.push("/team")
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
                <title> Cadastro de Turma - FunLearn </title>
            </Head>
            <HeaderAuth/>
            <Container>
                <ContentItems 
                    title="Alteração da Turma"
                >
                    <ContentForm onSubmit={handleRegisterTeam}>
                        <ContentInputForm>
                            <InputFrom 
                                title="Nome da Turma:"
                                type={"text"}
                                placeholder="Nome"
                                value={nameTeam}
                                onChange={(e) => setNameTeam(e.target.value)}
                            />

                            <SelectForm
                                title="Selecione um Professor"
                                placeholder="Professor"
                                value={teacherSelected}
                                onChange={handleTeacherSelected}
                            >   
                                <OptionSelect value={0} selected>Professor</OptionSelect>
                                {teacherList.map((teacher, index) => {
                                    return (

                                        <OptionSelect key={teacher.id} value={teacher.id} hidden={!teacher.active}>{teacher.name}</OptionSelect>
                                    )
                                })}
                            </SelectForm>

                            <SelectForm
                                title="Turma Ativa:"
                                value={teamActive}
                                onChange={handleTeamActive}
                            >   
                                <OptionSelect value={1}>Sim</OptionSelect>
                                <OptionSelect value={0}>Não</OptionSelect>
                            </SelectForm>
                        </ContentInputForm>

                        <ContentButton>
                            <ButtonConfirmPink type="button" onClick={() => Router.push('/team') }>
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

export const getServerSideProps = canSSRAuth( async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const typeUser = ctx.req.cookies['@nextauth.type'];
    try{    
        if (typeUser === "administrator"){
            const res = await apiClient.get('/teachers', {
                data: {
                    name: ""
                }
            })

            return {
                props:{
                    teachers: res.data
                }
            }
        }else if (typeUser === "teacher"){

            const idUser = ctx.req.cookies['@nextauth.user'];
            const res = await apiClient.get('/teacher', {
                params: {
                    teacherID: idUser
                }
            })

            return {
                props:{
                    teachers: [res.data]
                }
            }
        }else{
            return {
                props:{}
            }
        }

    }catch(err){
        console.log(err)
        return {
            props:{}
        }
    }

    
    
} )