import styled from "styled-components"


export const Container = styled.main`
    display: flex;
    flex-direction: column;

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