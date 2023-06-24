import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Fire1 from '../../../../public/assets/LottieFiles/112134-fireworks-teal-and-red.json'
import Fire2 from '../../../../public/assets/LottieFiles/133373-celebration-fireworks.json'


export default function LottieFilesFireWorks(){
    return (
        <>
            <div 
                style={{                   
                    scale: '0.6',
                    position: 'relative'
                }}
            >
                <Player
                    src={Fire1}
                    loop
                    autoplay
                    speed={0.5}
                />
            </div>
            
        </>
    )
}