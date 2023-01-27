# FunLearn
    
Este projeto tem como objetivo o desenvolvimento de uma ferramenta web, voltada para auxiliar professores e alunos no ensino e aprendizagem de diversos temas, ficando a critério do professor definir o tema e cadastrar as perguntas. O sistema visa trabalhar o conteúdo através de uma interface simples e intuitiva através de um jogo de perguntas e respostas, deixando assim, menos cansativa e mais divertida a aprendizagem.


## Backend

### 📄 Introdução do Módulo

Este módulo contem todas as funcionalidades do Sistema e disponibiliza em forma de APIs para ser utilizado. Foi criado em [Node](https://nodejs.org/en/) e utiliza o Framework [Express](http://expressjs.com/) para criação das rotas das APIs e para armazenar os dados utiliza o [MySQL](https://www.mysql.com/).

---

### ✅ Requisitos

> Versões citadas foram as que foram utilizadas para o desenvolvimento da aplicação, podendo ser utilizado versões superiores.
> 
- Node.js - Versião: 16.16.0
- MySQL - Versão: 8.0
- Yarn - Versão: 1.22.19

---

### ⚙ Instruções para Utilização

- Primeiro é necessário realizar a cópia do projeto, faça o download do arquivo .zip ou o git clone:

```bash
funLearn.zip or git clone https://github.com/ogabrielfelipe/funLearn.git
```

- Feito a cópia do projeto, o próximo passo é acessar a pasta *Backend*  e instalar as dependências

```bash
cd funLearn && cd Backend/
```

- Instalando as dependências

```bash
yarn or yarn install
```


- Para prosseguir é necessário criar o arquivo *.env* na raiz do Módulo e definir alguns parâmetros para o módulo funcionar corretamente. Os parâmetros são os seguintes:
    
    ![organizacao_dir](Backend/static/organizacao_dir.png)
    

```bash
#URL de conexão com MySQL, exemplo: mysql://USER:****@localhost:3306/DATABASE
DATABASE_URL=" **Deverá informar a URL para a conexão com o mysql** "

#Código para criptografia, exemplo: i8^NoHm%Cao6*Vf0LJmlMHk2SUEVHhqr
SECRET=" **Deverá ser preenchido com o código para criptografia** "

#Campo para definiir onde será a pasta temporária das importações
DIR_TEMP_IMPORT="tmp/import/"

#Campo para definir onde será salvo as imagens das perguntas
DIR_IMAGEASK="ImagesAsk/"
```

- Após a criação e configuração do arquivo .env, é necessário executar o seguinte comando para instalar o prisma/cli:

```bash
yarn add @prisma/cli
```

- Depois é necessário executar o seguinte comando para criar as tabelas no banco de dados:

```bash
yarn prisma db push
```

- Realizado a instalação o próximo passo é executar o módulo do sistema.

```bash
yarn dev
```

Com o módulo em execução, você poderá acessa-lo pelo link: [http://localhost:3333](http://localhost:3333/), e terá acesso a tela inicial da API que poderá visualizar a documentação da mesma.

![demo_initial](Backend/static/demo_initial.png)


---

## Frontend


### ✅ Requisitos

> Versões citadas foram as que foram utilizadas para o desenvolvimento da aplicação, podendo ser utilizado versões superiores.
> 
- Node.js - Versião: 16.16.0
- Yarn - Versão: 1.22.19

---

### ⚙ Instruções para Utilização

- Primeiro é necessário realizar a cópia do projeto, faça o download do arquivo .zip ou o git clone:

```bash
funLearn.zip or git clone https://github.com/ogabrielfelipe/funLearn.git
```

- Feito a cópia do projeto, o próximo passo é acessar a pasta *Frontend*  e instalar as dependências

```bash
cd funLearn && cd Frontend/
```

- Instalando concurrently

```bash
yarn add concurrently
```

- Instalando as dependências

```bash
yarn or yarn install
```

- Realizado a instalação o próximo passo é executar o módulo do sistema.

```bash
yarn dev
```

Com o módulo em execução, você poderá acessa-lo pelo link: [http://localhost:3000](http://localhost:3000/), e terá acesso a tela inicial da plataforma.

> Usuário padrão (Adminstrador):
- Usuário: admin
- Senha: funLearn

![demo_inital_frontend](frontend/public/FrontEnd.png)
