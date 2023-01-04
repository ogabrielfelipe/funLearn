import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import animatedTheme1 from '../../../../public/assets/LottieFiles/animatedTheme1.json'

function AnimationTheme1(){
    return (
        <>
            <Player
                src={animatedTheme1}
                loop
                autoplay
                speed={1}
            />
        </>
    )
}

export { AnimationTheme1  }