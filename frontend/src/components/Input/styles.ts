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

    input.pw {
    -webkit-text-security: square;
}

    :focus{
        outline: none;
        border-bottom: .5px solid rgba(0, 0 , 0, 0.60);
    }
`

export const ContainerPass = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .6rem;
    align-self: center;

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

export const TextArea = styled.textarea`
    min-width: 23rem;
    resize: none;
    background-color: transparent;
    border-radius: .6rem;
    border: none;
    border: 1px solid rgba(0, 0, 0, 0.60);
    padding: 0.5rem;

    :focus{
        outline: none;
    }
`