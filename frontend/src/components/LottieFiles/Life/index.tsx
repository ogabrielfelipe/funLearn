import React, { HTMLAttributes, useState } from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Life from '../../../../public/assets/LottieFiles/cloud.json'
import LifeRemove from '../../../../public/assets/LottieFiles/cloudRemove.json'


interface LifeProps extends HTMLAttributes<HTMLDivElement>{
    removeLife: boolean,
}



export default function LottieFilesLife( { removeLife }: LifeProps){

    const [removeLifeSt, setRemoveLifeSt] = useState(removeLife);

    return (
        <>
            <div 
                style={{
                    width: '7rem',
                    marginRight: '-20px'
                }}
            >

            <Player
                src={ removeLifeSt === true ? LifeRemove : Life  }
                loop
                autoplay
                speed={0.5}
            />

            </div>
            
        </>
    )
}