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
    max-width: 40%;
`


export const ContentFilters = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 2rem;
    margin: 1rem;

    max-width: 100%;

`
export const ContentCharts = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    width: 100%;
`
export const Charts = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    width: 100%;
`

export const ContentListStudents = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    margin-top: 1rem;
    margin-bottom: 2rem;
`


export const ListStudent = styled.div`
    background-color: #FFFFFF;
    width: 80%;
    height: 2rem;
    border-radius: 0.6rem;
    box-shadow: 0 0 .6rem 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0.5rem 1rem;
    margin-top: .6rem;

    cursor: pointer;

    &:hover{
        box-shadow: 0 0 .6rem 0 rgba(0,0,0,0.5);

    }

`


