import Head from "next/head";
import Router from "next/router";
import { PencilLine, Trash, UploadSimple } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { ButtonConfirmBlue, ButtonConfirmPink } from "../../../components/Button";
import { ContentItems } from "../../../components/ContentItems";
import { HeaderAuth } from "../../../components/Header";
import { InputFrom, InputTextArea, SelectForm } from "../../../components/Input";
import { ListView } from "../../../components/ListView";
import { LoadingManager } from "../../../components/Loading";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { Container } from "../../styles";
import { ContentButton, ContentForm, ContentInputForm, OptionSelect } from "../../team/add/styles";
import { ContainerList } from "../../team/styles";
import { BtnAsk, ContainerListAsk, ContentImport, ContentSelects, ContentText, List } from "./styles";


type AnswaerProps = {
    id: string;
    description: string;
    correct: boolean;
}


export default function AddAsk(){
    const [loading, setLoading] = useState(false);

    //Manager of answers (Create, Alter and delete)
    const [listAnswer, setListAnswer] = useState<AnswaerProps[]>(Array());
    const [answerID, setAnswerID] = useState("");
    const [answerDescription, setAnswerDescription] = useState("");
    const [answerCorrect, setAnswerCorrect] = useState("0")

    function handleSelectAnswerCorrect(e){
        setAnswerCorrect(e.target.value)
    }
    function handleAddAnswer(e){
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

            answerByID[0].correct = answerCorrect === "0"? false: true
            answerByID[0].description = answerDescription

            othersAnswer.push(answerByID[0])
            setListAnswer(othersAnswer)
            
            
            setAnswerID("")
            setAnswerDescription("")
            setAnswerCorrect("0")
            setLoading(false)
            return;
        }



        let idRandom = String(Math.floor(Math.random() * (100000 - 10000 + 1) ) + 10000)
        
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

        let answer = Array<AnswaerProps>();

        answer.push({
            id: idRandom,
            description: answerDescription,
            correct: answerCorrect === "0"? false: true
        }, ...listAnswer)


        setListAnswer(answer)
        setLoading(false)

        setAnswerID("")
        setAnswerDescription("")
        setAnswerCorrect("0")
        return;

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

    function handleDeleteAnswer(e, id: string){
        e.preventDefault();

        setListAnswer(
            listAnswer.filter((value) => {
                return value.id != id
            })
        )
    }

    //Manager image (Uploading, Previewing)
    const [avatarUrl, setAvatarUrl] = useState("");
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
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
        }
    }


    //Register Ask
    const [askDescription, setAskDescription] = useState("");
    const [askActive, setAskActive] = useState("1");
    const [askLevel, setAskLevel] = useState("INITIAL");

    async function handleRegisterAsk(e){
        e.preventDefault();
        setLoading(true)

        const dataForm = new FormData();

        let data = listAnswer.map(l => {
                return {
                    description: l.description,
                    correct: l.correct
                }
            })
        

        dataForm.append("question", askDescription)
        dataForm.append("active", askActive === "1"? String(true) : String(false))
        dataForm.append("image", imageAvatar)
        dataForm.append("level", askLevel)
        dataForm.append("answer", JSON.stringify(data))

        
        const apiClient = setupAPIClient();
        await apiClient.post("/ask", dataForm)
        .then(resp => {
            toast.success("Pergunta cadastrada com sucesso!")
            Router.push("/ask")
            setLoading(false)
        })
        .catch(err => {
            toast.error("Não foi possível cadastrar a Pergunta, motivo: " + err.message)
            setLoading(false)
        })

    }

    return (
        <>
        <Head>
                <title> Cadastro de Pergunta - FunLearn </title>
            </Head>
            <HeaderAuth teacher={false}/>
            <Container>
                <ContentItems 
                    title="Cadastro de Pergunta"
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
                                <input 
                                    type="file"
                                    style={{position: "absolute", top: "-1000rem"}}
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={handleFile}
                                />  
                                    {avatarUrl ?  (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: ".6rem",
                                            zIndex: "1"
                                        }}
                                        src={avatarUrl}
                                        alt="Foto do banner"
                                        
                                        />
                                    ) : (
                                        <ContentText>
                                            <span><UploadSimple size={32}/></span>
                                            <span>Enviar Imagem</span>
                                        </ContentText>
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