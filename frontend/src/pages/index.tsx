import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import BackgroundSistema from '../assets/BackgroundSistema.svg';
import Admin from '../assets/Header_Login.svg';
import Student from '../assets/Student.svg';
import Teacher from '../assets/Teacher.svg';

import { Container, Imagem, Button, CardStudent, CardTeacher, CardAdmin } from "./styles";

const Home: NextPage = () => {
  return (
    <>
      {/* <Container> */}
        <Imagem>
          {/* <h1>Bem Vindo ao Funlearn</h1> */}

          <CardAdmin>
            <Link href="/login/admin"> Login administrador </Link>
          </CardAdmin>

          <br />
          <CardTeacher>
            <Link href="/login/teacher"> Login Professor </Link>
          </CardTeacher>

          <br />
          
          <CardStudent>
            <Link href="/login/student"> Login Aluno </Link>
          </CardStudent>
        </Imagem>
      {/* </Container> */}
    </>
  );
};

export default Home;
