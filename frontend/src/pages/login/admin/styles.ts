import styled from "styled-components"



export const Container = styled.main`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100%;
    height: calc(100vh - 5rem);


    @media (max-width: 490px){
        scale: .9;
    }

    @media (max-width: 420px){
        scale: .75;
    }

`
export const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: .6rem;

    margin-bottom: 1rem;

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

export const ContainerLogo = styled.div`
    width: 6rem;
    height: auto;
`

export const ContainerCaricatura = styled.div`
    width: 13rem;
    height: auto;

    margin-top: -25%;
`
export const TitleLogin = styled.strong`
    font-size: 2rem;
    font-weight: 900;
    font-family: 'Bungee','Cabin', sans-serif;

    text-align: center;

    margin-top: 2rem;
    color: #8870FF;
` 


export const ContainerBtnAdmin = styled.div`
    width: 10rem;
    height: auto;
`



export const ContainerForm = styled.div`
    width: 25rem;
    height: 33rem;
    background-color: #FFFFFF;

    border-radius: 0.6rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);

    align-self: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0 .6rem;
    gap: 1.5rem;
`

export const Form = styled.form`
    width: 80%;
    height: auto;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    align-items: center;
`