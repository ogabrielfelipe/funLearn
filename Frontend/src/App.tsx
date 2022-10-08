import React from 'react';

import Link from "next/link";

import { Header, HeaderLogin, Background, ScreenStudent, ScreenTeacher } from "./styles"

function App() {
  return (
  <>
    <Header>
      <HeaderLogin>
        <h3>FunLearn</h3>
        
        <Link href="/admin">
          <a>Administrador</a> 
        </Link>
      </HeaderLogin>
        <Background>
          <ScreenStudent>
            <Link href="/student">
              <a>Estudante</a>
            </Link>
          </ScreenStudent>

          <ScreenTeacher>
            <Link href="/teacher">
              <a>Professor</a>
            </Link>
          </ScreenTeacher>
        </Background>
    </Header>
  </>
  );
}

export default App;