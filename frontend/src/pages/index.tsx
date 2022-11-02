import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import logo from "../../public/assets/logo.svg"
import admin from "../../public/assets/Administrator.svg"
import Student from '../../public/assets/Student.svg';
import Teacher from '../../public/assets/Teacher.svg';


import { Container, Header, ContainerButtons } from "./styles";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>FunLearn</title>
      </Head> 
      <Container>
        <Header> 
          <Link href="/">
            <a>
              <Image src={logo} alt={"Logo do Sistema."}/>
            </a>
          </Link>
          <Link href="/login/admin">
            <a>
              <Image src={admin} alt={"Botão para realizar login como administrador."}/>
            </a>
          </Link>
        </Header>


        <ContainerButtons>
          <Link href="/login/student">
            <a>
              <Image src={Student} alt={"Botão para realizar login como estudante."}/>
            </a>
          </Link>

          <Link href="/login/teacher">
            <a>
              <Image src={Teacher} alt={"Botão para realizar login como Professor."}/>
            </a>
          </Link>


        </ContainerButtons>
      </Container>
    </>
  );
};

export default Home;
