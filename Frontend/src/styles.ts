import styled from "styled-components"

export const Card = styled.button`
   width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    
`

export const Container = styled.button`
    width: 25rem;
    height: 30rem;

    border-radius: .6rem;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 1) ;


    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
`

export const Button = styled.button`
    margin-top: 5rem;
    padding: 16px 30px;
    color: #ffffff;
    background: #8870FF;
    border-radius: .6rem;
    transition: .2s all;
`