import styled from "styled-components"

export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 1rem 0;
`

export const ContentList = styled.div`
    width: 95%;
    height: 2rem;
    padding: 0.8rem;
    margin-bottom: .8rem;

    border-radius: 0.6rem;
    box-shadow: 0 0 4px 0 rgba(0,0,0, 0.60);

    background-color: rgba(200,252,255, 0.5);

    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
    justify-content: space-between;

    text-align: center;

    :hover{
        box-shadow: 0 0 6px 0 rgba(0,0,0, 0.80);
    }
`

export const TextList = styled.span`
    font-size: 1.1rem;
    width: 15rem;
`

export const ContentBtn = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`

export const Btn = styled.button`
    background-color: transparent;

    transition: all .2s ease-in;

    :hover{
        transform: scale(1.1);
    }
`