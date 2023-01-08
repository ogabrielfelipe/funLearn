import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Coin from '../../../../public/assets/LottieFiles/18089-gold-coin.json'


export default function LottieFilesLoading(){
    return (
        <>
            <Player
                src={Coin}
                loop
                autoplay
                speed={2.5}
            />
        </>
    )
}