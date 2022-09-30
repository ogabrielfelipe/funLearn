# funLearn
Trabalho de Conclusão de Curso.


## Backend


### 📄 Introdução do Módulo

Este módulo contem todas as funcionalidades do Sistema e disponibiliza em forma de APIs para ser utilizado. Foi criado em [Node.js](https://nodejs.org/en/) e utiliza o framework [Express.js](http://expressjs.com/) para disponibilzar as APIs e para armazenar os dados utiliza o [MySQL](https://www.mysql.com/)


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
    
    > […]
    src/
    static/
    tmp/
    **.env**
    […]
    > 

```bash
#URL de conexão com MySQL: mysql://USER:****@localhost:3306/DATABASE
DATABASE_URL=" **Deverá informar a URL para a conexão com o mysql** "

#Código para criptografia: i8^NoHm%Cao6*Vf0LJmlMHk2SUEVHhqr
SECRET=" **Deverá ser preenchido com o código para criptografia** "
```

- Após a criação e configuração do arquivo .env, é necessário executar o seguinte comando para criar as tabelas no banco de dados:

```bash
yarn prisma migrate dev
```

- Realizado a instalação o próximo passo é executar o módulo do sistema.

```bash
yarn dev
```

Com o módulo em execução, você poderá acessa-lo pelo link: [http://localhost:3333](http://localhost:3333/), e terá acesso a tela inicial da API que poderá visualizar a documentação da mesma.

![image](https://user-images.githubusercontent.com/80602315/193366751-7a51224d-82cb-4e10-9e88-023f0d70fb28.png)

