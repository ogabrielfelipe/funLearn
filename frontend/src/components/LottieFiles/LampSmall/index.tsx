import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Lamp from '../../../../public/assets/LottieFiles/500-lamp.json'


export default function LottieFilesLamp(){
    return (
        <>
            <div 
                style={{
                    width: '6rem',
                    marginRight: '-20px',
                    marginLeft: '-20px',
                }}
            >
                <Player
                    src={Lamp}
                    loop
                    autoplay
                    speed={0.5}
                />
            </div>
        </>
    )
}