import React, { Component, useContext } from 'react'
import Image from "next/image"
import Link from "next/link"
import { destroyCookie, setCookie, parseCookies } from 'nookies'

import { BtnCadastros, BtnDashboard, ContainerBtnAdmin, ContainerLogo, ContainerMenu, ContainerOptions, Header, HeaderS, Option } from "./styles"


import Logo from "../../../public/assets/logo.svg";
import VoltarImg from "../../../public/assets/Exit.svg"
import { CaretDown } from "phosphor-react";
import Router from "next/router";
import { ButtonStudenTertiary } from '../Button'


function HeaderAuth(){
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
                    <Image src={Logo} layout="responsive"  alt={"Logo do Sistema."}/>
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
                                <Option onClick={() => Router.push("/team")}>
                                    <span>Turmas</span>
                                </Option>                
                            <Option onClick={() => Router.push("/student")}>
                                <span>Alunos</span>
                            </Option>             

                            {cookies["@nextauth.type"] == "administrator" && (
                                <Option onClick={() => Router.push("/teacher")}>
                                    <span>Professor</span>
                                </Option>  
                            ) }   
                                    
                            <Option onClick={() => Router.push("/ask")}>
                                <span>Perguntas</span>
                            </Option>  


                            {cookies["@nextauth.type"] == "administrator" && (
                                <Option onClick={() => Router.push("/administrator")}>
                                    <span style={{fontSize: "14px"}}>Administrador</span>
                                </Option>  
                            )}

                            <Option onClick={() => Router.push("/theme")}>
                                <span>Temas</span>
                            </Option>     
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


function HeaderStudent(){
    function singOut(){
        try{
            destroyCookie(undefined, '@nextauth.token')
            destroyCookie(undefined, '@nextauth.type')
            destroyCookie(undefined, '@nextauth.user')
            Router.push('/')
        }catch{
            console.log('erro ao deslogar')
        }
    }

    return (
        <>
            <HeaderS>
                <Image src={Logo} alt={'Logo ao do Sistema'} width={120}/>
                <ButtonStudenTertiary style={{width: '8rem'}} onClick={singOut}>
                    Sair
                </ButtonStudenTertiary>
            </HeaderS>
                
        </>
    )
}


export { HeaderAuth, HeaderStudent }