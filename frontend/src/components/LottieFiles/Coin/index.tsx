import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Coin from "../../../../public/assets/LottieFiles/18089-gold-coin.json";

export default function LottieFilesCoin() {
  return (
    <>
      <div
        style={{
          width: "10rem",
          marginRight: "-30px",
        }}
      >
        <Player src={Coin} loop autoplay speed={0.5} />
      </div>
    </>
  );
}
