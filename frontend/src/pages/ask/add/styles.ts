import styled from "styled-components"

export const ContentSelects = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    max-height: 5.2rem;

    align-items: center;

`

export const ContentImport = styled.label`
    height: 10rem;
    background-color: #D9D9D9;
    border-radius: .6rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;

    width: 100%;
`
export const ContentText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transition: all .2s linear;
    cursor: pointer;
    filter: opacity(.6);

    :hover {
        scale: calc(1.1);
    }
`

export const ContainerListAsk = styled.div`
    height: 10rem;
    overflow-x: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.6rem;

    /* width */
    ::-webkit-scrollbar {
    width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: transparent; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }

`

export const List = styled.div`
    width: 95%;

    border-radius: 0.6rem;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    padding: .6rem;
    margin-bottom: 1rem;

    span{
        width: 9rem;
    }
`

export const BtnAsk = styled.button`
    background-color: transparent;
    margin-right: .6rem;

`