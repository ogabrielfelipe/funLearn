import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Time from '../../../../public/assets/LottieFiles/time.json'


export default function LottieFilesTime(){
    return (
        <>
            <div 
                style={{
                    width: '7rem',
                    marginRight: '-20px'
                }}
            >
                <Player
                    src={Time}
                    loop
                    autoplay
                    speed={0.5}
                />
            </div>
            
        </>
    )
}