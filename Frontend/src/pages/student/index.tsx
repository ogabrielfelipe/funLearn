import React from 'react';

import Link from "next/link";

import LoginEstudante from './assets/Background Sistema.svg';

import { Card, Container} from "./styles"

function Student() {
  return (
    <>
      <Card>
        <Container>
            <img src={LoginEstudante}/>

            <Link href="/">
              <a>Voltar</a>
            </Link>
        </Container>  
      </Card>
    </>
    );
}

export default Student;