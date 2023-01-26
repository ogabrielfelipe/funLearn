import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/assets/logo.svg"
import admin from "../../../public/assets/Administrator.svg"
import Student from '../../../public/assets/Student.svg';
import Teacher from '../../../public/assets/Teacher.svg';

import { Container, Header, ContainerButtons, ContainerLogo, ContainerBtnAdmin, ContainerBtnUser } from "./styles";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login - FunLearn</title>
      </Head> 
      <Container>
        <Header>
          <ContainerLogo> 
            <Link href="/">
              <a>
                <Image src={logo} layout="responsive"  alt={"Logo do Sistema."}/>
              </a>
            </Link>
          </ContainerLogo>

          <ContainerBtnAdmin> 
            <Link href="/login/admin">
              <a>
                <Image src={admin} layout="responsive" alt={"Botão para realizar login como administrador."}/>
              </a>
            </Link>
          </ContainerBtnAdmin>
        </Header>

        <ContainerButtons>
          <ContainerBtnUser>
            <Link href="/login/student">
              <a>
                <Image src={Student} alt={"Botão para realizar login como estudante."}/>
              </a>
            </Link>
          </ContainerBtnUser>

          <ContainerBtnUser>
            <Link href="/login/teacher">
              <a>
                <Image src={Teacher} alt={"Botão para realizar login como Professor."}/>
              </a>
            </Link>
          </ContainerBtnUser>
        </ContainerButtons>
      </Container>
    </>
  );
};

export default Home;
