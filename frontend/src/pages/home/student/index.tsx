import { canSSRAuth } from "../../../utils/canSSRAuth"


export default function HomeStudent(){
    return (
        <>
            <h1> Tela inicial do Aluno! </h1>        
        </>
    )
}

export const getServerSideProps = canSSRAuth( (ctx) => {

    if (ctx.req.cookies['@nextauth.type'] === 'student') {        
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