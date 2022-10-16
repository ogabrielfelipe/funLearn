import React from 'react';

import Link from "next/link";

import LoginAdministrador from './assets/Background Sistema.svg';

import { Card, Container } from "./styles"

function Teacher() {
  return (
    <>
      <Card>
        <Container>
            <img src={LoginAdministrador}/>

            <Link href="/">
              <a>Voltar</a>
            </Link>
        </Container>  
      </Card>
    </>
  );
}

export default Teacher;