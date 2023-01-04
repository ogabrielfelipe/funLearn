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
