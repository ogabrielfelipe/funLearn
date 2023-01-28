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


    /* Notebook */
    @media all and (min-width: 1024px) and (max-width:1280){

    }

    /* Tablet */
    @media all and (min-width: 768px) and (max-width:1024px){

    }

    /* Celular deitado */
    @media all and (min-width: 480px) and (max-width:768px){
        
    }

    /* Celular */
    @media all and (max-width: 480px){     
        height: 60vh;    
        top: 6rem; 
    }
`

export const Content = styled.div`
    position: relative;
    height: 90vh;    
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: .5rem;

    /* Notebook */
    @media all and (min-width: 1024px) and (max-width:1280){

    }

    /* Tablet */
    @media all and (min-width: 768px) and (max-width:1024px){
    
    }

    /* Celular deitado */
    @media all and (min-width: 480px) and (max-width:768px){
        
    }

    /* Celular */
    @media all and (max-width: 480px){
        
        height: 80vh;    
        gap: 1rem;
    }

`

export const ContentLottie = styled.div`
    max-width: 20rem;

    /* Notebook */
    @media all and (min-width: 1024px) and (max-width:1280){

    }

    /* Tablet */
    @media all and (min-width: 768px) and (max-width:1024px){

    }

    /* Celular deitado */
    @media all and (min-width: 480px) and (max-width:768px){
        
    }

    /* Celular */
    @media all and (max-width: 480px){      
     max-width: 15rem;
    }
`

export const TitleTheme = styled.strong`
    font-family: 'Bungee','Cabin', sans-serif;
    font-size: 1.5rem;
    text-align: center;
    
    /* Notebook */
    @media all and (min-width: 1024px) and (max-width:1280){

    }

    /* Tablet */
    @media all and (min-width: 768px) and (max-width:1024px){

    }

    /* Celular deitado */
    @media all and (min-width: 480px) and (max-width:768px){
        
    }

    /* Celular */
    @media all and (max-width: 480px){        
        font-size: 1rem;
    }
`

export const DescriptionTheme = styled.span`
    font-family: 'Cabin', sans-serif;
    font-size: 1rem;
    text-align: center;

    /* Notebook */
    @media all and (min-width: 1024px) and (max-width:1280){

    }

    /* Tablet */
    @media all and (min-width: 768px) and (max-width:1024px){

    }

    /* Celular deitado */
    @media all and (min-width: 480px) and (max-width:768px){
        
    }

    /* Celular */
    @media all and (max-width: 480px){     
        font-size: 0.9rem;
    }
`

