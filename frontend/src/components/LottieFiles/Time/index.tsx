import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Time from '../../../../public/assets/LottieFiles/time.json'


export default function LottieFilesLoading(){
    return (
        <>
            <Player
                src={Time}
                loop
                autoplay
                speed={2.5}
            />
        </>
    )
}