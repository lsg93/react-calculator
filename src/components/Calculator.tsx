import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {evaluate} from 'mathjs'
import Screen from './Screen'
import Button from './Button'
import buttonArr from '../buttons'

const StyledCalculator = styled.div`
    display: flex;
    flex-direction: column;
    background-color : #D8DBE2;
    width : 25%;
    min-height : 400px;
    align-self: center;

    @media (max-width: 960px) {
        width : 40%
    }

    @media (max-width: 600px) {
        width : 55%
    }

    @media (max-width: 460px) {
        padding : 15px;
        background: none;
        width : calc(100% - 15px)
    }

`

const StyledButtons = styled.div`
    flex: 1;
    display : grid;
    grid-gap: 1px;
    grid-template-columns : repeat(4, 1fr);
    grid-template-row : repeat(4, 1fr);
`

type Props = {
    children ?: React.ReactNode
}

const Calculator: React.FC<Props> = () => {

    const [currentExpression, setCurrentExpression] = useState<string>('')
    const [nextNumber, setNextNumber] = useState<number>(0)
    // const [animateScreen, setAnimateScreen] = useState<null | boolean>(null)

    useEffect(() => {

        // mathjs does not like expressions which are incomplete, so
        // replace all operators in current expression with white space, then split into an array
        // compare this against the amount of operators found in an expression

        let totalNumbers : number = currentExpression.slice(0).replace(/[^\d]/g, ' ').split(' ').filter(v => v).length
        let totalOperators : null | string[] = currentExpression.slice(0).match(/[^\d]/g)

        if (totalOperators && totalNumbers > totalOperators.length ) {

            // do string replacement here with aliases..

            let cleanedString = currentExpression.slice(0)

            cleanedString = cleanedString.replace(String.fromCharCode(215), '*')
            cleanedString = cleanedString.replace(String.fromCharCode(247), '/')

            setNextNumber(evaluate(cleanedString))
        }

    }, [currentExpression])

    const clear = () => {
        setCurrentExpression('')
        setNextNumber(0)
    }

    const remove = () => {
        setCurrentExpression(currentExpression.slice(0, -1))
    }

    const equals = () => {
        setNextNumber(0)
        setCurrentExpression(nextNumber.toString())
    }

    const onPress = (text : string,) => {

        if (['C', 'DEL', '='].indexOf(text) !== -1 ) {

            switch (text) {
                case 'C' :
                    clear()
                    break
                case 'DEL' :
                    remove()
                    break;
                case '=' :
                    equals()
                    break;
            }
        } else {

            let lastChar = currentExpression.slice(0).substring(currentExpression.length - 1)       

            if ([text, lastChar].every((v) => ['-', String.fromCharCode(215), String.fromCharCode(247), '+'].includes(v))) {
                setCurrentExpression(currentExpression.slice(0, -1).concat(text))
            } else {
                setCurrentExpression(currentExpression.slice(0).concat(text))                
            }

        }
        
    }

    return (
            <StyledCalculator>
                <Screen value={currentExpression} nextValue={nextNumber} />
                    <StyledButtons>
                        {buttonArr.map( (v) => {
                            return <Button key={v.text} onPress={onPress} alias={v.alias} text={v.text} type={v.type}/>
                        })}
                    </StyledButtons>
            </StyledCalculator>
    )
}

export default Calculator
