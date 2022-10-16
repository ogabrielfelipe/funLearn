import { canSSRAuth } from "../../../utils/canSSRAuth"
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react"
import Router from "next/router";
import { api } from "../../../services/apiClient";


export default function HomeAdministrator(){

    const { user } = useContext(AuthContext)
    
    return (
        <>
            <h1> Tela inicial do Administrador </h1>        
        </>
    )
}

export const getServerSideProps = canSSRAuth( (ctx) => {

    if (ctx.req.cookies['@nextauth.type'] === 'administrator') {        
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