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
import { parseCookies } from 'nookies'


type AdministratorProps = {
    id: string,
    name: string,
    username: string,
    password: boolean,
}

interface FindAdministratorProps {
    administrators: AdministratorProps[]
}


export default function AddTeam( {administrators}: FindAdministratorProps){
    const apiClient = setupAPIClient();
    const router = useRouter();
    const { id } = router.query;

    const [administratorList, setAdministratorList] = useState(administrators || [])

    const [nameAdministrator, setNameAdministrator] = useState("");

    const [userAdministrator, setUserAdministrator] = useState("");

    const [passwordAdministrator, setPasswordAdministrator] = useState("");

    var administratorSelectedPosition = "0";
    const cookies = parseCookies()
    if (cookies["@nextauth.type"] === "teacher"){
        administratorSelectedPosition = cookies["@nextauth.user"]
    }

    const [administratorSelected, setAdministratorSelected] = useState(administratorSelectedPosition);
    const [administratorActive, setAdministratorActive] = useState("1");

    const [loading, setLoading] = useState(false);
    
    useEffect(() =>{
        async function LoadingAdministrator(){
            setLoading(true);
            await apiClient.get(`/administrator?adminID=${id}`)
            .then(resp => {
                setLoading(false);
                setNameAdministrator(resp.data.name)
                setUserAdministrator(resp.data.username)
                setAdministratorSelected(resp.data.administrator.id)
                setAdministratorActive(resp.data.active === true ? "1": "0")
            })
            .catch(err => {
                setLoading(false);
                console.log(err)

            })
        }
        LoadingAdministrator()
    }, [])

    function handleAdministratorSelected(e: any){
        setAdministratorSelected(e.target.value)
    }

    function handleAdministratorActive(e: any){
        setAdministratorActive(e.target.value)
    }

    async function handleRegisterAdministrator(e: FormEvent){
        e.preventDefault();
        setLoading(true);

        // if (administratorSelected === "0"){
        //     setLoading(false);
        //     toast.warn(" Nenhum administrador selecionado! ")
        //     return;
        // }

        if (nameAdministrator === ""){
            setLoading(false);
            toast.warn("Por favor, informe o nome do administrador.")
            return;
        }

        // if (passwordAdministrator === ""){
        //     setLoading(false);
        //     toast.warn("Por favor, informe uma senha para realizar o cadastro.")
        //     return;
        // }

        let data = {
            id: id,
            name: nameAdministrator,
            username: userAdministrator,
            password: passwordAdministrator,
            active: administratorActive === "1"? true : false,
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/administrator', data)
        .then(resp => {
            if (resp.status === 200){
                setLoading(false);
                toast.success("Administrador Atualizado com sucesso!");
                Router.push("/administrator")
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
                <title> Alteração do Cadastro do Administrador - FunLearn </title>
            </Head>
            <HeaderAuth teacher={false}/>
            <Container>
                <ContentItems 
                    title="Alteração do Administrador"
                >
                    <ContentForm onSubmit={handleRegisterAdministrator}>
                        <ContentInputForm>
                            <InputFrom 
                                title="Nome Completo:"
                                type={"text"}
                                placeholder="Nome"
                                value={nameAdministrator}
                                onChange={(e) => setNameAdministrator(e.target.value)}
                            />

                            <InputFrom 
                                title="Nome de Usuário:"
                                type={"text"}
                                placeholder="Usuário"
                                value={userAdministrator}
                                onChange={(e) => setUserAdministrator(e.target.value)}
                            />

                            <InputFrom 
                                title="Senha:"
                                type={"password"}
                                placeholder="Senha"
                                value={passwordAdministrator    }
                                onChange={(e) => setPasswordAdministrator(e.target.value)}
                            />

                            <SelectForm
                                title="Administrador Ativo:"
                                value={administratorActive}
                                onChange={handleAdministratorActive}
                            >   
                                <OptionSelect value={1}>Sim</OptionSelect>
                                <OptionSelect value={0}>Não</OptionSelect>
                            </SelectForm>
                        </ContentInputForm>

                        <ContentButton>
                            <ButtonConfirmPink type="button" onClick={() => Router.push('/administrator') }>
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
   
    return {
        props:{ }
    }
    
    
} )