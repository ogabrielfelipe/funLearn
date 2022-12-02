import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Loading from '../../../../public/assets/LottieFiles/loading-cloud.json'


export default function LottieFilesLoading(){
    return (
        <>
            <Player
                src={Loading}
                loop
                autoplay
                speed={2.5}
            />
        </>
    )
}