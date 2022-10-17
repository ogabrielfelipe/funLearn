import DashboardProfessor from '../../../assets/Dashboard Professor.svg';

export default function HomeTeacher(){
    return (
        <>
            <h1> Tela inicial do Professor! </h1>
            <img src={DashboardProfessor}/>     
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