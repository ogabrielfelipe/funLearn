import styled from "styled-components"


export const Container = styled.main`
    display: flex;
    flex-direction: column;

`
export const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 1rem;
    margin-bottom: 2rem;

`

export const ContainerButtons = styled.section`    
    position: fixed;
    top: 15%;
    left: 50%;
    translate: -50%;

    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 28rem;

    @media (max-width: 400px) {
        gap: 2rem;
        scale: .8;
    }

    @media (max-width: 450px) {
        top: -10px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        scale: .9;
    }

    @media (max-width: 920px) {
        margin-top: 30%;
        scale: .9;
    }

`

export const ContainerLogo = styled.div`
    width: 20rem;
    height: auto;

    position: fixed;
    top: 15%;
    left: 50%;
    translate: -50%;


    @media (max-width: 450px) {
        width: 18rem;
        height: auto;
        top: 5%;
    }
`

export const ContainerBtnAdmin = styled.div`
    width: 15rem;
    height: auto;

    @media (max-width: 450px) {
        display: none;
    }
`

export const ContainerBtnUser = styled.div`
    width: 18rem;
    height: auto;


    @media (max-width: 450px) {
        width: 10rem;
        height: auto;
    }

    @media (max-width: 920px) {
        width: 14rem;
        height: auto;
    }
`

export const ContainerBtnUserTeacher = styled.div`
    width: 18rem;
    height: auto;


    @media (max-width: 450px) {
        display: none;
    }

    @media (max-width: 920px) {
        width: 14rem;
        height: auto;
    }
`
