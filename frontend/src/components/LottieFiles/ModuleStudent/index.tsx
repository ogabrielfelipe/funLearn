import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import animatedTheme1 from '../../../../public/assets/LottieFiles/animatedTheme1.json'
import animatedTheme2 from '../../../../public/assets/LottieFiles/animatedTheme2.json'
import animatedTheme3 from '../../../../public/assets/LottieFiles/animatedTheme3.json'


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

function AnimationTheme2(){
    return (
        <>
            <Player
                src={animatedTheme2}
                loop
                autoplay
                speed={1}
            />
        </>
    )
}

function AnimationTheme3(){
    return (
        <>
            <Player
                src={animatedTheme3}
                loop
                autoplay
                speed={1}
            />
        </>
    )
}

export { AnimationTheme1,  AnimationTheme2, AnimationTheme3 }