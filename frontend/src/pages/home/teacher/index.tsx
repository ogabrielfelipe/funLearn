import { canSSRAuth } from "../../../utils/canSSRAuth"
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react"
import Router from "next/router";
import { api } from "../../../services/apiClient";

import Link from 'next/link'

import { Button } from "./styles";
import { setupAPIClient } from "../../../services/api";

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

export const getServerSideProps = async (ctx) => {
    const api = setupAPIClient(ctx);
    try{
        const userLog = await api.post('/teacher/auth/session')
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