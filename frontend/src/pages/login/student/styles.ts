import styled from "styled-components"



export const Container = styled.main`
    display: flex;
    flex-direction: column;

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

    margin-top: -100%;
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
`

/*
export const Card = styled.main`
    display: flex;
    flex-direction: column;
`

export const Container = styled.button`
    position: relative;
    width: 2020px;
    height: 2020px;
    width: 25rem;
    height: 30rem;
    border-radius: .6rem;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 1) ;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background: #fff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
`

export const Button = styled.button`
    position: absolute;
    width: 97px;
    height: 78px;
    left: 1418px;
    top: 12.58px;

    background: #8870FF;
    color: #fff;
`

export const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem;

    margin-bottom: 5rem;

`

export const Content = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
`*/