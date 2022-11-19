import styled from "styled-components"


export const Container = styled.main`
    width: 100vw;
    height: calc(100vh - 5rem);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;

    gap: 2rem;

`

export const Content = styled.div`
    width: 19rem;
    height: 13rem;
    border-radius: 0.6rem;
    padding: 1rem;
    background-color: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.35);

    display: flex;
    flex-direction: column;
    align-items: center;

    strong{
        font-size: 1.1rem;
        font-family: 'Bungee','Cabin', sans-serif;
        text-align: center;
    }

    span{
        font-size: 8rem;
        font-family: 'Bungee','Cabin', sans-serif;
        filter: opacity(.6);
    }
    

`