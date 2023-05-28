import { FormEvent, useContext, useState } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { canSSRGuest } from "../../../utils/canSSRGuest";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../../../public/assets/logo.svg";
import VoltarImg from "../../../../public/assets/buttonVoltar.svg"
import AdminSemTexto from "../../../../public/assets/AdminSemTexto.svg";

import {Container, Form, Header, ContainerLogo, ContainerBtnAdmin, ContainerForm, ContainerCaricatura, TitleLogin } from "./styles";
import { InputFrom } from "../../../components/Input";
import { ButtonConfirmBlue } from "../../../components/Button";


export default function LoginAdmin() {
  const { signIn } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    let data = {
      username: username,
      password: password,
      typeSession: "administrator",
    };

    await signIn(data);
  }
  return (
    <>
      <Head>
        <title>FunLearn</title>
      </Head>

      <Header>
          <ContainerLogo> 
            <Link href="/">
              <a>
                <Image src={Logo} layout="responsive"  alt={"Logo do Sistema."}/>
              </a>
            </Link>
          </ContainerLogo>

          <ContainerBtnAdmin> 
            <Link href="/login">
              <a>
                <Image src={VoltarImg} layout="responsive" alt={"Botão para realizar login como administrador."}/>
              </a>
            </Link>
          </ContainerBtnAdmin>
        </Header>

      <Container>
        <ContainerForm>
            <ContainerCaricatura>
              <Image src={AdminSemTexto} layout="responsive"  alt={"Caricatura de estudante."}/>
            </ContainerCaricatura>
            
            <TitleLogin>
              Bem vindo ao módulo Administrador
            </TitleLogin>

            <Form onSubmit={handleLogin}>
              <InputFrom 
                title="Número de Usuário:"
                placeholder="Usuário"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputFrom 
                title="Senha:"
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <ButtonConfirmBlue type="submit">
                Entrar
              </ButtonConfirmBlue>
            </Form>

        </ContainerForm>

      </Container>
    </>
  );
}
