/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { PencilLine, Trash, UploadSimple } from "phosphor-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ButtonConfirmBlue, ButtonConfirmPink } from "../../../components/Button";
import { ContentItems } from "../../../components/ContentItems";
import { HeaderAuth } from "../../../components/Header";
import { InputTextArea, SelectForm } from "../../../components/Input";
import { LoadingManager } from "../../../components/Loading";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { ContentButton, ContentForm, ContentInputForm, OptionSelect } from "../../team/add/styles";
import { Container } from "../../team/styles";
import { BtnAsk, ContainerListAsk, ContentImport, ContentSelects, ContentText, List } from "../add/styles";
import { btnAskImg } from "./styles"

type AnswaerProps = {
    id: string;
    description: string;
    correct: boolean;
}


export default function AlterAsk(){
    const router = useRouter();
    const { askID } = router.query;
    const [loading, setLoading] = useState(false);
    const apiClient = setupAPIClient();

    //Manager of answers (Create, Alter and delete)
    const [listAnswer, setListAnswer] = useState<AnswaerProps[]>(Array());
    const [answerID, setAnswerID] = useState("");
    const [answerDescription, setAnswerDescription] = useState("");
    const [answerCorrect, setAnswerCorrect] = useState("0")

    function handleSelectAnswerCorrect(e){
        setAnswerCorrect(e.target.value)
    }
    async function handleAddAnswer(e){
        e.preventDefault();
        setLoading(true)

        if (answerID){
            if (!answerDescription){
                toast.error("É necessario informar a descrição da resposta.")
                setLoading(false)
                return;
            }

            let answerByID = listAnswer.filter((value) => {
                return value.id === answerID
            })

            let othersAnswer = listAnswer.filter((value) => {
                return value.id != answerID
            })

            if (answerCorrect === "1"){
                for (var i = 0; i < othersAnswer.length; i++) {
                    if (othersAnswer[i].correct === true){
                        toast.error("Já possui uma resposta marcada como correta.")
                        setLoading(false)
                        return;
                    }
                    
                }
            }

            let data = {
                answerID: answerID,
                description: answerDescription,
                correct: answerCorrect === "0"? false: true
            }

            await apiClient.put('/answer/', data)
            .then(resp => {
                console.log(resp.data)

                answerByID[0].correct = resp.data.correct
                answerByID[0].description = resp.data.description

                othersAnswer.push(answerByID[0])
                setListAnswer(othersAnswer)

                setAnswerID("")
                setAnswerDescription("")
                setAnswerCorrect("0")
                setLoading(false)
            })
            .catch(err =>{
                console.log(err)
                
                setAnswerID("")
                setAnswerDescription("")
                setAnswerCorrect("0")
                setLoading(false)
            })
        }
        

        if (!answerDescription){
            toast.error("É necessario informar a descrição da resposta.")
            setLoading(false)
            return;
        }
        if (listAnswer.length === 4){
            toast.info("Só é permitido informar 4 respostas.")
            setLoading(false)
            return;
        }

        if (answerCorrect === "1"){
            for (var i = 0; i < listAnswer.length; i++) {
                if (listAnswer[i].correct === true){
                    toast.error("Já possui uma resposta marcada como correta.")
                    setLoading(false)
                    return;
                }
                
            }
        }

        let data = {
            askID: askID,
            description: answerDescription,
            correct: answerCorrect === "0"? false: true
        }

        await apiClient.post('/answer', data)
        .then(resp => {
            let answer = Array<AnswaerProps>();

            answer.push({
                id: resp.data.id,
                description: resp.data.description,
                correct: resp.data.correct
            }, ...listAnswer)
    
    
            setListAnswer(answer)
            setLoading(false)
    
            setAnswerID("")
            setAnswerDescription("")
            setAnswerCorrect("0")
        })
        .catch(err => {
            console.log(err)
            setLoading(false)

            setAnswerID("")
            setAnswerDescription("")
            setAnswerCorrect("0")
        })
        

    }

    function handleAlterAnswer(e, id: string){
        e.preventDefault();

        listAnswer.filter((value) => {
            if (value.id === id){
                setAnswerID(value.id)
                setAnswerDescription(value.description)
                setAnswerCorrect(value.correct ? "1" : "0")
                return value
            }
        })
    }

    async function handleDeleteAnswer(e, id: string){
        e.preventDefault();

        setLoading(true)
        await apiClient.delete(`/answer?answerID=${id}`)
        .then( async resp => {
            await apiClient.get(`/ask?askID=${askID}`)
            .then(resp2 => {
                var listAnswerFor = Array<AnswaerProps>();
                resp2.data.answer.forEach((t, i) => {
                    listAnswerFor.push({
                        id: t.id,
                        description: t.description,
                        correct: t.correct
                    })
         
                })
                setListAnswer(listAnswerFor)

            })
            .catch(err => {
                console.log(err)
            })

            setLoading(false)
            toast.success("Resposta excluida com sucesso!")
        })
        .catch(err => {
            setLoading(false)
            toast.error("Não foi possível excluir a resposta!")
            console.log(err)
        })
    }
    

    //Manager image (Uploading, Previewing, Delete)
    const [avatarUrl, setAvatarUrl] = useState("");
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        setLoading(true)
        if (!e.target.files) {
          return;
        }
    
        const image = e.target.files[0];
        if (!image) {
          return;
        }
    
        if (
          image.type === "image/jpeg" ||
          image.type === "image/png" ||
          image.type === "image/jpg"
        ) {
          setImageAvatar(image);
          setAvatarUrl(URL.createObjectURL(e.target.files[0]));

            let formData = new FormData();
            formData.append("image", image)

          await apiClient.put(`/ask/image?askID=${askID}`, formData)
          .then(resp => {
            setAvatarUrl(`http://localhost:3333/ask/image/${resp.data.image}`)
            setLoading(false)
        })
          .catch(err => {
            console.log(err)
            setLoading(false)
          })
        }
    }

    async function handleDeleteImage(e){
        e.preventDefault();
        setLoading(true)
        await apiClient.delete(`/ask/image?askID=${askID}`)
        .then(resp => {
            setAvatarUrl("")
            setImageAvatar(null)
            setLoading(false) 
        })
        .catch(err =>{
            console.log(err)
            setLoading(false)
        })
    }


    //Register Ask
    const [askDescription, setAskDescription] = useState("");
    const [askActive, setAskActive] = useState("1");
    const [askLevel, setAskLevel] = useState("INITIAL");

    async function handleRegisterAsk(e){
        e.preventDefault();
        setLoading(true)

        let data = {
            askID: askID,
            question: askDescription,
            active: askActive === "1"? true : false
        }
        
        
        await apiClient.put("/ask", data)
        .then(resp => {
            toast.success("Pergunta Alterada com sucesso!")
            Router.push("/ask")
            setLoading(false)
        })
        .catch(err => {
            toast.error("Não foi possível alterar a Pergunta, motivo: " + err.message)
            setLoading(false)
        })
    }


    // Find Ask by ID and populate fields

    useEffect(() => {
        async function getAskByID(askID: string){
            await apiClient.get(`/ask?askID=${askID}`)
            .then(resp => {
                console.log(resp.data)
                setAskDescription(resp.data.question)
                setAskLevel(resp.data.level)
                setAskActive(resp.data.active? "1" : "0")
                if (resp.data.image){
                    setAvatarUrl(`http://localhost:3333/ask/image/${resp.data.image}`)
                }

                var listAnswerFor = Array<AnswaerProps>();
                resp.data.answer.forEach((t, i) => {
                    listAnswerFor.push({
                        id: t.id,
                        description: t.description,
                        correct: t.correct
                    })
                    
                })
                setListAnswer(listAnswerFor)

            })
            .catch(err => {
                console.log(err)
            })

        }

        getAskByID(askID)
    }, [askID])


    return (
        <>
            <Head>
                <title> Alterar de Pergunta - FunLearn </title>
            </Head>
            <HeaderAuth teacher={false}/>
            <Container>
                <ContentItems 
                    title="Alterar de Pergunta"
                >
                    <ContentForm onSubmit={handleRegisterAsk}>
                        <ContentInputForm>
                            <InputTextArea 
                                title="Pergunta:"
                                placeholder="Pergunta"
                                value={askDescription}
                                onChange={(e) => setAskDescription(e.target.value)}
                            />

                            <ContentSelects>
                                <SelectForm
                                    title="Turma Ativa:"
                                    value={askActive}
                                    onChange={(e) => setAskActive(e.target.value)}
                                >   
                                    <OptionSelect value={1}>Sim</OptionSelect>
                                    <OptionSelect value={0}>Não</OptionSelect>
                                </SelectForm>

                                <SelectForm
                                    title="Nível da Pergunta"
                                    placeholder="Nível"
                                    value={askLevel}
                                    onChange={(e) => setAskLevel(e.target.value)}
                                >   
                                    <OptionSelect value={"INITIAL"} selected>Iniciante</OptionSelect>
                                    <OptionSelect value={"INTERMEDIARY"}>Intermediária</OptionSelect>
                                    <OptionSelect value={"ADVANCED"}>Avançada</OptionSelect>
                                </SelectForm>
                            </ContentSelects>

                            <ContentImport>
                                    {avatarUrl ?  (
                                        <>
                                            <img
                                            style={{
                                                height: "80%",
                                                objectFit: "cover",
                                                borderRadius: ".6rem",
                                                zIndex: "1"
                                            }}
                                            src={avatarUrl}
                                            alt="Foto do banner"
                                            />


                                            <button
                                                type="button"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundColor: "transparent",
                                                    alignSelf: "center",
                                                    margin: ".3rem"
                                                }}
                                                onClick={handleDeleteImage}
                                            >Remover Imagem</button>
                                        </>
                                    ) : (
                                        <>
                                            <input 
                                                type="file"
                                                style={{position: "absolute", top: "-1000rem"}}
                                                accept="image/png, image/jpeg, image/jpg"
                                                onChange={handleFile}
                                            />  


                                            <ContentText>
                                                <span><UploadSimple size={32}/></span>
                                                <span>Enviar Imagem</span>
                                            </ContentText>
                                        </>
                                    )}
                                
                            </ContentImport>
                            
                        </ContentInputForm>

                        <ContentInputForm>
                            <InputTextArea 
                                title="Resposta:"
                                placeholder="Resposta"
                                value={answerDescription}
                                onChange={(e) => setAnswerDescription(e.target.value)}
                            />
                            <ContentSelects>
                                <div 
                                    style={{marginRight: "1rem" }}
                                >
                                    <SelectForm
                                        title="Resposta Correta:"
                                        value={answerCorrect}
                                        onChange={handleSelectAnswerCorrect}
                                    >   
                                        <OptionSelect value={0} selected>Não</OptionSelect>
                                        <OptionSelect value={1}>Sim</OptionSelect>
                                    </SelectForm>
                                </div>
                                

                                <ButtonConfirmBlue onClick={handleAddAnswer}>
                                    Adicionar
                                </ButtonConfirmBlue>
                            </ContentSelects>

                            <ContainerListAsk>

                                {listAnswer.map((l, i) => {
                                    return (
                                    <List key={l.id}>
                                        <span hidden>{l.id}</span>
                                        <span>{l.description.length > 20 ? l.description.slice(0, 15)+"..." :  l.description}</span>
                                        <span>{l.correct? "Correta" : "Incorreta"}</span>
                                        <div>
                                            <BtnAsk onClick={(e) => {handleAlterAnswer(e, l.id)}}><PencilLine size={22} weight="regular" /></BtnAsk>
                                            <BtnAsk onClick={(e) => {handleDeleteAnswer(e, l.id)}}><Trash size={22} weight="regular" /></BtnAsk>
                                        </div>
                                    </List>
                                    )
                                })}

                                
                                    
                            </ContainerListAsk>


                        </ContentInputForm>

                        <ContentButton>
                            <ButtonConfirmPink type="button" onClick={() => Router.push('/ask') }>
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
    return {
        props:{ }
    }
} )