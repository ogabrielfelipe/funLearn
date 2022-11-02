import styled from "styled-components"

export const Container = styled.button`
    width: 25rem;
    height: 30rem;

    border-radius: .6rem;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 1) ;


    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
`
export const CardAdmin = styled.button`
    width: 100vw;
    height: 13vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-image: url('../assets/Header_login.svg');
    background-repeat: no-repeat;
    background-size: cover;
    /*background-color: rgba(200, 252, 255, 1);*/

    font-family: 'Bungee', cursive;
`

export const CardStudent = styled.button`
    width: 20vw;
    height: 33vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-image: url('./assets/Student.svg');
    background-repeat: no-repeat;
    background-size: cover;
    /*background-color: rgba(200, 252, 255, 1);*/

    font-family: 'Bungee', cursive;
`

export const CardTeacher = styled.button`
    width: 20vw;
    height: 38vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-image: url('../assets/Teacher.svg');
    background-repeat: no-repeat;
    background-size: cover;
    /*background-color: rgba(200, 252, 255, 1);*/

    font-family: 'Bungee', cursive;
`

export const Button = styled.button`
    margin-top: 5rem;
    padding: 16px 30px;
    color: #ffffff;
    background: #fff;
    border-radius: .6rem;
    transition: .2s all;
`
export const Imagem = styled.button`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-image: url('./assets/BackgroundSistema.svg');
    background-repeat: no-repeat;
    background-size: cover;

    font-family: 'Bungee', cursive;
`