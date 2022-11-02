import styled from "styled-components"

export const Card = styled.button`
    width: 90vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
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
    margin-top: 5rem;
    padding: 16px 30px;
    color: #ffffff;
    background: #fff;
    border-radius: .6rem;
    transition: .2s all;
`

export const Imagem = styled.button`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-image: url('../../../assets/BackgroundSistema.svg');
    background-repeat: no-repeat;
    background-size: cover;

    font-family: 'Bungee', cursive;
`