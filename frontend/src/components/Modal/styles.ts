import styled from "styled-components"


export const ContainerModal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.60) ;
    z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;

`

export const Content = styled.div`
    background-color: #ffffff;
    width: 20rem;
    height: auto;

    border: 5px solid #9E906E;
    border-radius: 0.6rem;

    padding: 1rem;
    text-align: center;

    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Title = styled.strong`
    font-size: 1.5rem;
    font-family: 'Bungee','Cabin', sans-serif;

`

export const Description = styled.span`
    font-size: 1.2rem;
    font-family: 'Cabin', sans-serif;

`

export const ContainerBtn = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;

    align-self: center;
`