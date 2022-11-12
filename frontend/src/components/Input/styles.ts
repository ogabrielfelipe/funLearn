import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #D9D9D9;

    width: 100%;
    height: auto;

    padding: 0.6rem;
    border-radius: .6rem;

    font-family: 'Cabin', sans-serif;
    gap: .2rem;
`
export const Input = styled.input`
    background-color: transparent;
    padding: .6rem;
    border-bottom: .5px solid rgba(0, 0 , 0, 0.35);


    :focus{
        outline: none;
        border-bottom: .5px solid rgba(0, 0 , 0, 0.60);
    }
`

export const Select = styled.select`
    background-color: transparent;
    padding: .6rem;
    border-bottom: .5px solid rgba(0, 0 , 0, 0.35);


    :focus{
        outline: none;
        border-bottom: .5px solid rgba(0, 0 , 0, 0.60);
    }
`
