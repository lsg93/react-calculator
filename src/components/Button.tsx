import React, {useState} from 'react'
import styled from 'styled-components'

interface ButtonProps {
    text : string
    type : string,
    alias ?: number,
    onPress(text: string) : any
}

const StyledButton = styled.div<{buttonType : string}>`
    background-color: ${props => props.buttonType === 'number' ? '#ffffff' : '#DCDCDC'};
    color: ${props => props.buttonType === 'number' ? '#000000' : '#4285F4'};
    box-shadow: 0 0 0 1px #b1b1b1;
    height: 100%;
    cursor : pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;


    &.pressed {
        background-color: ${props => props.buttonType === 'number' ? '#f5f3f3cc' : '#ececec'};
    }

    &:last-of-type {
        grid-row-start: 4;
        grid-row-end: 6;
        background-color: #4285F4;
        color : #FFFFFF;
        grid-column-end: 5;

        &.pressed {
            background-color : #649eff;
        }

    }

`

const Button: React.FC<ButtonProps> = ({text, type, alias, onPress}) => {

    const [pressed, setPressed] = useState<Boolean>(false)

    const handleMouseDown = () => {
        setPressed(true)
    }

    const handleClick = () => {
        onPress(alias ? String.fromCharCode(alias) : text)
    }

    const handleMouseUp = () => {
        setPressed(false)
    }

    return (
            <StyledButton
                className={pressed ? 'pressed' : ''} 
                onMouseUp={() => handleMouseUp()} 
                onMouseDown={() => handleMouseDown()} 
                onClick={ () => handleClick()}
                buttonType={type}
            >
            { alias ? String.fromCharCode(alias) : text}
            </StyledButton>
    )
}

export default Button
