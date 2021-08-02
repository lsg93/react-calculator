import React, {useState, useRef, useEffect} from 'react'
import styled from 'styled-components'

interface ScreenProps {
    value : string
    nextValue : number
}

const StyledScreen = styled.div`
    background-color: #FFFFFF;
    height : 60px;
    padding: 0.4rem;
    box-shadow: 0 0 0 1px #b1b1b1;
    overflow: hidden;

    > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;

    }

    > .topRow {
        font-size: 1.6rem;
        height : 35px;
        position : relative;
        top : 0px;

        &.slideUp {
            transition : top 0.3s;
            top : -40px;
        }

    }

    > .bottomRow {
        height: 25px;
        opacity: 0.4;
        font-size: 1.2rem;
        position : relative;
        top : 0px;


        &.expandUp {
            transition : all 0.3s;
            top : -30px;
            font-size : 1.6rem;
            opacity : 1;
        }

    }

`

const usePreviousValue = (value : number) => {
    const ref = useRef<number>(0);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

const Screen: React.FC<ScreenProps> = ({value, nextValue}) => {

    const [animating, setAnimating] = useState<null | boolean>(false)

    const oldValue = usePreviousValue(nextValue)

    useEffect(() => {
        // remove animation when values change
        setAnimating(false)
    }, [value])

    useEffect(() => {
        // if new value is 0 and old value was not 0, then trigger animation.
        if (nextValue === 0 && oldValue !== 0) {
            setAnimating(true)
        } 
    }, [nextValue, oldValue])

    return (
        <StyledScreen>
            <div className={`topRow ${animating ? 'slideUp' : ''}`}>
                <span>{value}</span>
            </div>
            <div className={`bottomRow ${animating ? 'expandUp' : ''}`} >
                <span>{ (animating) ? value : nextValue || ''}</span>
            </div>
        </StyledScreen>
    )
}

export default Screen
