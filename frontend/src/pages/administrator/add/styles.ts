import styled from "styled-components"

export const ContentForm = styled.form`
    width: calc(100% - 10rem);
    height: 100%;
    padding: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: .6rem;
`

export const ContentInputForm = styled.div`
    width: 25rem;
    height: auto;
    padding: 3rem;
    display: flex;
    flex-direction: column;
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

`