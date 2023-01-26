import Head from "next/head"
import Image from "next/image"
import React from "react"

import styles from "./Home.module.css"
import illustration from "../../public/assets/IllustrationInitial2.svg"
import Router from "next/router"


import logo from "../../public/assets/logo.svg"

export default function InitialView(){
    return (
        <>
            <Head>
                <title>Bem Vindo ao FunLearn!!</title>
            </Head> 
            <main className={styles.main}>
                <div className={styles.contentIllustration}>
                    <Image 
                        src={illustration}
                        alt={"Illustração de banco de dados."}
                        layout={"responsive"}
                    />
                </div>

                <div className={styles.contentText}>
                    <strong className={styles.textPrincipal}> Bem-vindo ao ambiente de Aprendizagem de  <span style={{"color": "#8870FF"}}>Banco de Dados</span></strong>
                    <span className={styles.descriptionText}> A Plataforma funLearn tem como principal objetivo, como o próprio nome já diz, é deixar o ensino de banco de dados de uma forma
                        mais descontraida e divertida para os alunos. </span>
                

                    <button className={styles.btn} onClick={() => Router.push('/login')}>
                        Que comecem os Jogos!!!
                    </button>
                
                </div>
                



            </main>
            
        </>
    )
}