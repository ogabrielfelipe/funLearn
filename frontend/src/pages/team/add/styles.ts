import styled from "styled-components"

export const ContentForm = styled.form`
    width: calc(100% - 10rem);
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: .6rem;
`

export const ContentInputForm = styled.div`
    width: 25rem;
    height: 24rem;
    padding: 2rem;
    margin-left: 3rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: .6rem;
`

export const ContentInputForm2 = styled.div`
    width: 25rem;
    height: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: .6rem;
`

export const OptionSelect = styled.option`
    font-family: 'Cabin', sans-serif;
    color: #000000;

`

export const ContentButton = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;

    align-self: flex-end;
    align-items: flex-end;

    
    position: fixed;
    right: 7%;
    bottom: 7%;

    margin: .6rem;

    @media (max-width: 1440px) {
        bottom: 3.5%;
    }

`