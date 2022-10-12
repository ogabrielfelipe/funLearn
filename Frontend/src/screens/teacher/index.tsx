import React from 'react';

import Link from "next/link";

import LoginProfessor from './assets/Login Professor.svg';

import { Card, Container} from "./styles"

function Teacher() {
  return (
    <>
      <Card>
        <Container>
            <img src={LoginProfessor}/>
        </Container>  
      </Card>
    </>
    );
}

export default Teacher;