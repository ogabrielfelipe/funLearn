import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react"
import Router from "next/router";
import { setupAPIClient } from "../../../services/api";

import DashboardAdministrador from '../../../assets/Dashboard Administrador.svg';

export default function HomeAdministrator(){

    const { user } = useContext(AuthContext)
    
    return (
        <>
            <h1> Tela inicial do Administrador </h1>        
            <img src={DashboardAdministrador}/>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const api = setupAPIClient(ctx);
    try{
        const userLog = await api.post('/administrator/auth/session')
        if (userLog.status === 200){
            return{
                props:{
                    userLog: userLog.data
                }
            }
        }else{  
            return{
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }
    }catch(error){
        return{
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    
}