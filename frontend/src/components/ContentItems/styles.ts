import styled from "styled-components"


export const Container = styled.div`
    width: 90vw;
    height: 80vh;
    background-color: var(--cl-white);

    align-self: center;

    margin-top: 2rem;

    box-shadow: 0 0 5px rgba(0,0,0, 0.40);
    border-radius: 0.8rem;

    display: flex;
    flex-direction: column;

    @media (max-width: 920px) {
        width: 95vw;
        height: calc(100vh - 5rem);
    }
`

export const Title = styled.strong`
    font-size: 2rem;
    font-family: 'Bungee','Cabin', sans-serif;
    text-align: center;
    margin: .5rem;

    display: flex;
    flex-direction: column;

    

`