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

    margin-bottom: 2rem;

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

    @media (max-width: 400px) {
        gap: 2rem;
        scale: .8;
    }

    @media (max-width: 450px) {
        margin-top: 1rem;
        gap: 5rem;
        scale: .9;
    }

    @media (max-width: 920px) {
        margin-top: 1rem;
        scale: .9;
    }

`

export const ContainerLogo = styled.div`
    width: 8rem;
    height: auto;

    @media (max-width: 450px) {
        width: 5rem;
        height: auto;
    }
`

export const ContainerBtnAdmin = styled.div`
    width: 15rem;
    height: auto;

    @media (max-width: 450px) {
        width: 10rem;
        height: auto;
    }
`

export const ContainerBtnUser = styled.div`
    width: 18rem;
    height: auto;


    @media (max-width: 450px) {
        width: 15rem;
        height: auto;
    }

    @media (max-width: 920px) {
        width: 17rem;
        height: auto;
    }
`
