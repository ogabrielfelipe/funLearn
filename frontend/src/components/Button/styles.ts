import styled from "styled-components"

export const Button = styled.button`
    width: 7rem;
    height: 3rem;

    background-color: #8870FF;
    border-radius: 0.6rem;
    color: #FFFFFF;

    transition: all .2s linear;

    :active{
        filter: brightness(1.5);
    }
`

export const ButtonP = styled.button`
    width: 7rem;
    height: 3rem;

    background-color: #9684A3;
    border-radius: 0.6rem;
    color: #FFFFFF;
`

export const ButtonST = styled.button`
    appearance: button;
    background-color: #AAB69B;
    color: #FFFFFF;

    box-shadow: #2D2D2D 0 6px 0 0, #2D2D2D 0 6px 0 0;
    width: 9rem;
    height: 3rem;
    border: 3px solid #2D2D2D;
    border-radius: 4rem;


    font-size: 1rem;

    &:active {
        box-shadow: rgba(0, 0, 0, .125) 0 3px 5px inset;
        outline: 0;
    }
    &:hover {
      box-shadow: #2D2D2D 0 6px 0 0, rgba(0, 0, 0, .125) 0 3px 5px inset;
    }

    &:not([disabled]):active {
        box-shadow: #2D2D2D 0 3px 0 0, #2D2D2D 0 3px 0 0;
        transform: translate(3px, 3px);
    }

`

export const ButtonSSB = styled.button`
    appearance: button;
    background-color: #8870FF;
    color: #FFFFFF;

    box-shadow: #2D2D2D 0 6px 0 0, #2D2D2D 0 6px 0 0;
    width: 9rem;
    height: 3rem;
    border: 3px solid #2D2D2D;
    border-radius: 4rem;

    font-size: 1rem;

    &:active {
        box-shadow: rgba(0, 0, 0, .125) 0 3px 5px inset;
        outline: 0;
    }
    &:hover {
      box-shadow: #2D2D2D 0 6px 0 0, rgba(0, 0, 0, .125) 0 3px 5px inset;
    }

    &:not([disabled]):active {
        box-shadow: #2D2D2D 0 3px 0 0, #2D2D2D 0 3px 0 0;
        transform: translate(3px, 3px);
    }
`


export const ButtonSS = styled.button`
    appearance: button;
    background-color: #9684A3;
    color: #FFFFFF;

    box-shadow: #2D2D2D 0 6px 0 0, #2D2D2D 0 6px 0 0;
    width: 9rem;
    height: 3rem;
    border: 3px solid #2D2D2D;
    border-radius: 4rem;

    font-size: 1rem;

    &:active {
        box-shadow: rgba(0, 0, 0, .125) 0 3px 5px inset;
        outline: 0;
    }
    &:hover {
      box-shadow: #2D2D2D 0 6px 0 0, rgba(0, 0, 0, .125) 0 3px 5px inset;
    }

    &:not([disabled]):active {
        box-shadow: #2D2D2D 0 3px 0 0, #2D2D2D 0 3px 0 0;
        transform: translate(3px, 3px);
    }
`