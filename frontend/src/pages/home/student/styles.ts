import styled from "styled-components"


export const Container = styled.main`
    max-width: 50vw;
    height: 80vh;    

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    left: 50%;
    transform: translateX(-50%);

    top: -3.5rem;

`

export const Content = styled.div`
    position: relative;
    height: 90vh;    
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: .5rem;
`

export const ContentLottie = styled.div`
    max-width: 20rem;
`

export const TitleTheme = styled.strong`
    font-family: 'Bungee','Cabin', sans-serif;
    font-size: 1.5rem;
    text-align: center;
    
    @media(max-width: 650px){
        font-size: 2rem;
    }
`

export const DescriptionTheme = styled.span`
  font-family: 'Cabin', sans-serif;
  font-size: 1rem;
  text-align: center;
`

