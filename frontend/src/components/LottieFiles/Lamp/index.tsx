import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Lamp from '../../../../public/assets/LottieFiles/500-lamp.json'


export default function LottieFilesLoading(){
    return (
        <>
            <Player
                src={Lamp}
                loop
                autoplay
                speed={2.5}
            />
        </>
    )
}