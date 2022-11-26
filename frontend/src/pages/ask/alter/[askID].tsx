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
import { ContentButton, ContentForm, ContentInputForm, ContentInputForm2, OptionSelect } from "../../team/add/styles";
import { Container } from "../../team/styles";
import { BtnAsk, ContainerListAsk, ContentImport, ContentSelects, ContentText, List } from "../add/styles";


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

type AnswaerProps = {
    id: string;
    description: string;
    correct: boolean;
}
type TipsProps = {
    id: string;
    name: string;
    visible: boolean;
}
type ThemesProps = {
    id: string;
    name: string;
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


    // Manager Tips
    const [idTip, setIdTip] = useState("")
    const [nameTip, setNameTip] = useState("")
    const [tipVisible, setTipVisible] = useState("1")
    const [listTips, setListTips] = useState(Array<TipsProps>())
    function handleSelectTipsVisible(e){
        setTipVisible(e.target.value)
    }
    async function handleAddTips(e){
        e.preventDefault();
        setLoading(true)

        if (idTip){
            setLoading(false)

            let tipByID = listTips.filter((value) => {
                return value.id === idTip
            })

            let othersTip = listTips.filter((value) => {
                return value.id != idTip
            })

            let data = {
                id: idTip,
                name: nameTip,
                correct: tipVisible === "0"? false: true
            }

            await apiClient.put('/tip', data)
            .then(resp => {
                console.log(resp.data)

                tipByID[0].name = resp.data.name;
                tipByID[0].visible = resp.data.visible

                othersTip.push(tipByID[0])
                setListTips(othersTip)

                setIdTip("")
            setNameTip("")
            setTipVisible("1")
                setLoading(false)
            })
            .catch(err =>{
                console.log(err)
                
                setIdTip("")
                setNameTip("")
                setTipVisible("1")
                setLoading(false)
            })


            tipByID[0].name = nameTip;
            tipByID[0].visible = tipVisible === "1" ? true : false

            othersTip.push(tipByID[0])
            setListTips(othersTip)

            setIdTip("")
            setNameTip("")
            setTipVisible("1")
            return;
        }

        let data = {
            askID: askID,
            name: nameTip,
            visible: tipVisible === "1" ? true : false
        }

        apiClient.post('/tip', data)
        .then(resp => {

            let lisAuxTips = Array<TipsProps>()
            lisAuxTips.push({
                id: resp.data.id,
                name: resp.data.name,
                visible: resp.data.visible
            }, ...listTips)
                        
            setListTips(lisAuxTips)
            setLoading(false)
            toast.success("Dica Cadastrada com sucesso!")
        })
        .catch(err => {
            setLoading(false)
            toast.error("Não foi possível cadastrar a dica.")
            console.log(err)
            

        })

        setIdTip("")
        setNameTip("")
        setTipVisible("1")

    } 

    function handleAlterTip(idTip: string){
        listTips.filter((value) => {
            if (value.id === idTip){
                setIdTip(value.id)
                setNameTip(value.name)
                setTipVisible(value.visible? "1": "0")
                return value
            }
        })
    }

    async function handleDeleteTip(idTip: string){
        setListTips(
            listTips.filter((value) => {
                return value.id != idTip
            })
        )

        setLoading(true)
        await apiClient.delete(`/tip?id=${idTip}`)
        .then( async resp => {
            await apiClient.get(`/ask?askID=${askID}`)
            .then(resp2 => {
                let lisAuxTips = Array<TipsProps>()
                resp2.data.tip.forEach((t, i) => {
                    lisAuxTips.push({
                        id: t.id,
                        name: t.name,
                        visible: t.visible
                    })
                })

                setLoading(false)
                toast.success("Dica excluida com sucesso!")
                setListTips(lisAuxTips)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })

        })
        .catch(err => {
            setLoading(false)
            toast.error("Não foi possível excluir a dica!")
            console.log(err)
        })
    }

     // Populate themes
     const [listThemes, setListThemes] = useState<ThemesProps[]>(Array())
     const [themeSelected, setThemeSelected] = useState("")


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
            active: askActive === "1"? true : false,
            themeID: themeSelected
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
                setThemeSelected(resp.data.theme.id)
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


                let lisAuxTips = Array<TipsProps>()
                resp.data.tip.forEach((t, i) => {
                    lisAuxTips.push({
                        id: t.id,
                        name: t.name,
                        visible: t.visible
                    })
                })

                setListTips(lisAuxTips)

            })
            .catch(err => {
                console.log(err)
            })

        }
        getAskByID(askID)


        async function getThemes(){
            setLoading(true)
            const apiClient = setupAPIClient();
            await apiClient.get('/themes', {
                data: {
                    name: ""
                }
            })
            .then(resp => {
                let theme= Array<ThemesProps>()
                console.log(resp.data)
                resp.data.forEach(t => {
                    theme.push({
                        id: t.id,
                        name: t.name
                    })
                });
                setListThemes(theme)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
        }
        getThemes()
    }, [askID])


    return (
        <>
            <Head>
                <title> Alterar de Pergunta - FunLearn </title>
            </Head>
            <HeaderAuth/>
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
                            <SelectForm
                                title="Selecione um Tema:"
                                value={themeSelected}
                                onChange={(e) => setThemeSelected(e.target.value)}
                            >   
                                {listThemes.map(theme => {
                                    return (
                                        <OptionSelect key={theme.id} value={theme.id}>{theme.name}</OptionSelect>
                                    )
                                })}
                            </SelectForm>

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


                        <Tabs >
                            <TabList >
                            <Tab >Respostas</Tab>
                            <Tab >Dicas</Tab>
                            </TabList>

                            <TabPanel style={{
                            }}>
                                <ContentInputForm2>
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
                                </ContentInputForm2>
                            </TabPanel>


                            <TabPanel>
                                <ContentInputForm2>
                                    <InputTextArea 
                                        title="Dica:"
                                        placeholder="Dica"
                                        value={nameTip}
                                        onChange={(e) => setNameTip(e.target.value)}
                                    />
                                    <ContentSelects>
                                        <div 
                                            style={{marginRight: "1rem" }}
                                        >
                                            <SelectForm
                                                title="Dica Visível:"
                                                value={tipVisible}
                                                onChange={handleSelectTipsVisible}

                                            >   
                                                <OptionSelect value={1} selected>Sim</OptionSelect>
                                                <OptionSelect value={0}>Não</OptionSelect>
                                            </SelectForm>
                                        </div>
                                        

                                        <ButtonConfirmBlue type="button" onClick={handleAddTips}>
                                            Adicionar
                                        </ButtonConfirmBlue>
                                    </ContentSelects>

                                    <ContainerListAsk>
                                        {listTips.map((l, i) => {
                                            return (
                                            <List key={l.id}>
                                                <span hidden>{l.id}</span>
                                                <span>{l.name.length > 20 ? l.name.slice(0, 15)+"..." :  l.name}</span>
                                                <span>{l.visible? "Visível" : "Invível"}</span>
                                                <div>
                                                    <BtnAsk type="button" onClick={(e) => {e.preventDefault(); handleAlterTip(l.id)}}><PencilLine size={22} weight="regular" /></BtnAsk>
                                                    <BtnAsk type="button" onClick={(e) => {e.preventDefault(); handleDeleteTip(l.id)}}><Trash size={22} weight="regular" /></BtnAsk>
                                                </div>
                                            </List>
                                            )
                                        })}
    
                                    </ContainerListAsk>
                                </ContentInputForm2>
                                        
                            </TabPanel>
                        </Tabs>

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