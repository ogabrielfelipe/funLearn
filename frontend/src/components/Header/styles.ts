import styled, { keyframes } from "styled-components"

export const Header = styled.header`
    background-color: var(--cl-white);
    height: 4rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 9px rgba(0,0,0, 0.20);

    padding: 0 1.5rem;
`

export const ContainerLogo = styled.div`
    width: 6rem;
    height: auto;

`
export const ContainerMenu = styled.div`
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;
    cursor: pointer;

`
export const BtnDashboard = styled.div`
    background-image: url(/assets/FundoDashboard.svg);
    background-repeat: no-repeat;
    width: 15.8rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;


    font-size: 1.05rem;
    font-weight: 400;
    font-family: 'Bungee','Cabin', sans-serif;
    color: var(--cl-white);
    user-select: none;

    cursor: pointer;


    :active{
        filter: brightness(1.2);
    }
`

export const ContainerOptions = styled.div`
    display: none;
    position: absolute;
    padding: 1rem;
    z-index: 1;

    top: 3.5rem;
    gap: .6rem;

    transition: all 2s ease-out;


`

export const BtnCadastros = styled.div`
    background-image: url(/assets/FundoDropDown.svg);
    background-repeat: no-repeat;
    width: 14.2rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;


    font-size: 1.05rem;
    font-weight: 400;
    font-family: 'Bungee','Cabin', sans-serif;
    color: var(--cl-white);
    user-select: none;


    gap: .6rem;

    :hover ${ContainerOptions} {
        display: flex;
        flex-direction: column;
    }
`


export const Option = styled.div`
    background-image: url(/assets/OptionDropDown.svg);
    background-repeat: no-repeat;
    width: 11.75rem;
    height: 2.9rem;

    display: flex;
    justify-content: center;
    align-items: center;


    cursor: pointer;

    :active{
        filter: brightness(1.2);
    }
`


export const ContainerBtnAdmin = styled.div`
    width: 8rem;

    height: auto;
`