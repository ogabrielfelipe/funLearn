import React from 'react';

import Link from "next/link";

import LoginEstudante from './assets/Login Estudante.svg';

import { Card, Container} from "./styles"

function Student() {
  return (
    <>
      <Card>
        <Container>
            <img src={LoginEstudante}/>
        </Container>  
      </Card>
    </>
    );
}

export default Student;