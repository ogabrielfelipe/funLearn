import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import BackgroundSistema from '../assets/BackgroundSistema.svg';
import Admin from '../assets/Header_Login.svg';
import Student from '../assets/Student.svg';
import Teacher from '../assets/Teacher.svg';

import { Card, Container, Button } from "./styles";

const Home: NextPage = () => {
  return (
    <>
      <Card>
        <Container>
            {/* <img src={Admin}/> */}

            <Button>
              <Link href='/login/admin'> Login Administrador </Link>
            </Button>
          
            <Button>
              <Link href='/login/teacher'> Login Professor </Link>
            </Button>

            <Button>
              <Link href='/login/student'> Login Aluno </Link>
            </Button>
        </Container>  
      </Card>
    </>
  )
}

export default Home
