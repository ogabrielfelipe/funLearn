import styled from "styled-components"


export const Container = styled.main`
    display: flex;
    flex-direction: column;

`
export const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem;

    margin-bottom: 5rem;

`

export const ContainerButtons = styled.section`
    width: 100vw;
    height: calc(100vh - 9rem);

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20rem;

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