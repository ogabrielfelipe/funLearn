import { FormEvent, useContext, useState } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { canSSRGuest } from "../../../utils/canSSRGuest";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../../public/assets/logo.svg";
import Student from "../../../../public/assets/Student.svg";

import { Card, Container, Button, Header, Content } from "./styles";

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
        <title>FunLearn</title>
      </Head>

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
    </>
  );
};

export default Loginstudent;
