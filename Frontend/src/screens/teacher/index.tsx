import React from 'react';

import Link from "next/link";

import { Header, HeaderLogin, Background, ScreenStudent, Rectangle, Model, Card } from "./styles"

function Teacher() {
  return (
  <>
    <Header>
      <HeaderLogin>
        <h3>FunLearn</h3>

        <Link href="/">
          <a>Voltar</a>
        </Link>

        <Background>
          <Rectangle>
            <ScreenStudent>
              <h3>imagem</h3>
            </ScreenStudent>
            <Model>
              <h3>Bem vindo ao módulo aluno</h3>
            </Model>
            <Card>
              <div>
                <p>Número da matrícula</p>
                <input type="text" name="" id="" />
              </div>
              <div>
                <p>Senha</p>
                <input type="text" name="" id="" />
              </div>
              <button>Entrar</button>
            </Card>
          </Rectangle>
        </Background>
      </HeaderLogin>
    </Header>
  </>
  );
}

export default Teacher;