import styled from "styled-components"

export const Container = styled.main`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100%;
    height: calc(100vh - 5rem);
`
export const Content = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    align-items: center;

    border: none;
    border-bottom: 0.5px solid rgba(0,0,0, 0.25);

`

export const ContainerIpntBut = styled.form`

    display: flex;
    flex-direction: row;

    align-items: center;
    gap: 2.5rem;

`

export const ContainerInput = styled.div`
    width: 25rem;
`

export const ContainerList = styled.div`
   margin: 1rem;
   height: 100%;

   overflow: auto;

   display: flex;
   flex-direction: column;
   align-items: center;


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
