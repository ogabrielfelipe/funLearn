import React from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Trophy from '../../../../public/assets/LottieFiles/86896-trophy-icon-animation.json'
import Fire1 from '../../../../public/assets/LottieFiles/112134-fireworks-teal-and-red.json'
import styles from "./styles.module.css"

export default function LottieFilesTrophy(){
    return (
        <>
            <div className={styles.container}>
                <Player
                    src={Trophy}
                    loop
                    autoplay
                    speed={0.3}
                    className={styles.item1}

                />
                <Player
                    src={Fire1}
                    loop
                    autoplay
                    speed={0.5}
                    className={styles.item2}
                />
            </div>
            
        </>
    )
}