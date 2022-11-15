import styled, { keyframes } from "styled-components"


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

export const ContentModel = styled.div`
    background-color: #ffffff;
    width: 20rem;
    height: auto;

    border: 5px solid #9E906E;
    border-radius: 0.6rem;

    padding: 2rem;
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

export const LabelInputFile = styled.label`
    input[type="file"]{
        position: absolute;
        top: -1000px;
    }
    cursor: pointer;
    font-size: 1.5rem;
    font-family: 'Bungee','Cabin', sans-serif;

    width: 18rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;

    align-self: center;


    background-color: #9684A3;
    border-radius: 0.6rem;
    color: #FFFFFF;
`

export const ContentFormModel = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
`


export const TextMsg = styled.span`
    padding: 1rem;
    border-radius: .6rem;
    border: 0;
    border 1px solid #9684A3;
    border-style: dashed;
`