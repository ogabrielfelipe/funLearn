import React from 'react';

import Link from "next/link";

import TelaInicial from './assets/TelaInicial.svg';

import { Card, Container } from "./styles"

function App() {
  return (
  <>
    <Card>
      <Container>
          <img src={TelaInicial}/>
      </Container>  
    </Card>
  </>
  );
}

export default App;