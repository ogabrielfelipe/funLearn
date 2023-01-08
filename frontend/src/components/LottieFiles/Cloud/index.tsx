import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Cloud from '../../../../public/assets/LottieFiles/cloud.json'


export default function LottieFilesLoading(){
    return (
        <>
            <Player
                src={Cloud}
                loop
                autoplay
                speed={2.5}
            />
        </>
    )
}