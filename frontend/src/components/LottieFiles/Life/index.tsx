import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Life from '../../../../public/assets/LottieFiles/cloud.json'


export default function LottieFilesLoading(){
    return (
        <>
            <Player
                src={Life}
                loop
                autoplay
                speed={2.5}
            />
        </>
    )
}