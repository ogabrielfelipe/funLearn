import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import CompleteTheme from '../../../../public/assets/LottieFiles/CompleteTheme2.json'


export default function LottieFilesCompleteTheme(){
    return (
        <>
            <div style={{
                width: '8rem',
                marginRight: '-30px'
            }}
            >
                <Player
                    src={CompleteTheme}
                    loop
                    autoplay
                    speed={0.5}
                />
            </div>
        </>
    )
}