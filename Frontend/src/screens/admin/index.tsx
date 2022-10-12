import React from 'react';

import Link from "next/link";

import LoginAdministrador from './assets/Login Administrador.svg';

import { Card, Container } from "./styles"

function Teacher() {
  return (
    <>
      <Card>
        <Container>
            <img src={LoginAdministrador}/>
        </Container>  
      </Card>
    </>
  );
}

export default Teacher;