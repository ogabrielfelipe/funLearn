import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import CompleteTheme from '../../../../public/assets/LottieFiles/CompleteTheme2.json'


export default function LottieFilesCompleteThemeSmall(){
    return (
        <>
            <div style={{
                    width: '3rem',
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