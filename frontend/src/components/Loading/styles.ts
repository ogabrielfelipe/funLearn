import styled from "styled-components"


export const ContainerLoading = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(255, 255, 255, 0.70);
    z-index: 999;
`

export const ContentSpinner = styled.div`
    width: 4rem;
    height: auto;
    background-color: var(--cl-white);
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.25);
    padding: 0.6rem;
    border-radius: 0.6rem;
`
