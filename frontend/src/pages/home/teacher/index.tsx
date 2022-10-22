import { canSSRAuth } from "../../../utils/canSSRAuth"
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react"
import Router from "next/router";
import { api } from "../../../services/apiClient";

import Link from 'next/link'

import { Button } from "./styles";

export default function HomeTeacher(){
    return (
        <>
            <h1> Tela inicial do Professor! </h1> 

            <Button>
                <Link href='/'> Voltar  </Link>
            </Button>    
        </>
    )
}

export const getServerSideProps = canSSRAuth( (ctx) => {

    if (ctx.req.cookies['@nextauth.type'] === 'teacher') {        
        return {
            props:{}
        }
    }else{
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
})