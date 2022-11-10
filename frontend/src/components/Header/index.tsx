import Image from "next/image"
import Link from "next/link"
import { destroyCookie, setCookie, parseCookies } from 'nookies'

import { BtnCadastros, BtnDashboard, ContainerBtnAdmin, ContainerLogo, ContainerMenu, ContainerOptions, Header, Option } from "./styles"


import Logo from "../../../public/assets/logo.svg";
import VoltarImg from "../../../public/assets/Exit.svg"
import { CaretDown } from "phosphor-react";
import Router from "next/router";


interface HeaderProps{
    teacher: boolean ;
}

function HeaderAuth( { teacher }: HeaderProps){
    const cookies = parseCookies()
    
    function handleClickDashboard(){
        if (cookies["@nextauth.type"] === "administrator"){
            Router.push('/home/administrator')
        }else if (cookies["@nextauth.type"] === "teacher"){
            Router.push('/home/teacher')
        }else{
            Router.push('#')
        }
    }


    return (
        <>
            <Header>
                <ContainerLogo> 
                    <Link href={"#"}>
                    <a>
                        <Image src={Logo} layout="responsive"  alt={"Logo do Sistema."}/>
                    </a>
                    </Link>
                </ContainerLogo>

                <ContainerMenu>
                    <BtnDashboard onClick={handleClickDashboard}>
                        <span>Painel de Controle</span>
                    </BtnDashboard>
                    <BtnCadastros>
                        <ContainerMenu>
                            <span>Cadastros</span>
                            <CaretDown size={24} weight="bold" style={{paddingLeft: "10"}} />
                        </ContainerMenu>
                        <ContainerOptions>
                            <Option onClick={() => Router.push("/turma")}>
                                <span>Turmas</span>
                            </Option>                  
                            <Option>
                                <span>Alunos</span>
                            </Option>                
                            {!teacher ? (
                                <Option>
                                    <span>Professor</span>
                                </Option>  
                            ) : ( <></> ) }  
                                    
                            <Option>
                                <span>Perguntas</span>
                            </Option>     
                            {!teacher ? (
                                <Option>
                                    <span style={{fontSize: "14px"}}>Administrador</span>
                                </Option>  
                            ) : ( <></> ) }       
                        </ContainerOptions>
                    </BtnCadastros>
                </ContainerMenu>

                <ContainerBtnAdmin> 
                    <Link href="/">
                    <a>
                        <Image src={VoltarImg} layout="responsive" alt={"Botão para voltar a tela inicial."}/>
                    </a>
                    </Link>
                </ContainerBtnAdmin>
            </Header>
        </>
    )
}

export { HeaderAuth }