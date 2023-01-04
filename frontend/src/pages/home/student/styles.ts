import styled from "styled-components"


export const Container = styled.main`

    width: 50%;
    height: 80vh;    

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    left: 50%;
    transform: translateX(-50%);
`

export const Content = styled.div`
    position: relative;
    height: 80vh;
    
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: 1rem;
`

export const ContentLottie = styled.div`
    max-width: 30rem;
`

export const TitleTheme = styled.strong`
font: 400 12rem;
font-family: 'Bungee','Cabin', sans-serif;
font-size: 3rem;
    
`

export const DescriptionTheme = styled.span`
  font: 400 1rem;
  font-family: 'Cabin', sans-serif;
  font-size: 1.5rem;


`



export const SideBar = styled.nav`
    position: fixed;
    top: calc(50% - 15rem);
    height: 25rem;
    width: 15rem;
`

export const BtnSideBar = styled.span`
    width: 5rem;
    height: 2rem;
    background-color: #FF0000;
    cursor: pointer;
    
    display: ${hamburguerOpen ? 'inline' : 'none'};
`

export const Classification = styled.div`
    width: 100%;
    height: 25rem;
    background-color: blue;
`
