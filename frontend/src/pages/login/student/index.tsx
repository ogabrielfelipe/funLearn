import { FormEvent, useContext, useState } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { canSSRGuest } from "../../../utils/canSSRGuest";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../../../public/assets/logo.svg";
import VoltarImg from "../../../../public/assets/buttonVoltar.svg"
import StudentSemTexto from "../../../../public/assets/StudantSemTexto.svg";

import {Container, Header, ContainerLogo, ContainerBtnAdmin, ContainerForm, ContainerCaricatura, TitleLogin } from "./styles";

const Loginstudent: NextPage = () => {
  const { signIn } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    let data = {
      username: username,
      password: password,
      typeSession: "student",
    };

    await signIn(data);
  }
  return (
    <>
      <Head>
        <title>Login Estudante - FunLearn</title>
      </Head>


      <Container>
        <Header>
          <ContainerLogo> 
            <Link href="/">
              <a>
                <Image src={Logo} layout="responsive"  alt={"Logo do Sistema."}/>
              </a>
            </Link>
          </ContainerLogo>

          <ContainerBtnAdmin> 
            <Link href="/">
              <a>
                <Image src={VoltarImg} layout="responsive" alt={"Botão para realizar login como administrador."}/>
              </a>
            </Link>
          </ContainerBtnAdmin>
        </Header>

        <ContainerForm>
            <ContainerCaricatura>
              <Image src={StudentSemTexto} layout="responsive"  alt={"Caricatura de estudante."}/>
            </ContainerCaricatura>
            
            <TitleLogin>
              Bem vindo ao módulo Aluno
            </TitleLogin>

        </ContainerForm>

      </Container>
{/* 
      <Card>
        <Header>
          <Button>
            <Link href="/"> Voltar </Link>
          </Button>

          <Link href="/">
            <a>
              <Image src={logo} alt={"Logo do Sistema."} />
            </a>
          </Link>
        </Header>

        <Content>
          <Container>
            <Image
              src={Student}
              alt={"Botão para realizar login como estudante."}
            />
            <h1> Bem Vindo ao Módulo Aluno </h1>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Numero de Matricula"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
              />

              <input type="submit" />
            </form>
          </Container>
        </Content>
      </Card>

      */}
    </>
  );
};

export default Loginstudent;
