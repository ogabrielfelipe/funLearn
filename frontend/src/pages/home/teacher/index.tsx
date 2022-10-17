import DashboardProfessor from '../../../assets/Dashboard Professor.svg';

export default function HomeTeacher(){
    return (
        <>
            <h1> Tela inicial do Professor! </h1>
            <img src={DashboardProfessor}/>     
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