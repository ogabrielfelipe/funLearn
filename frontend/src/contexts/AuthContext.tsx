import { createContext, ReactNode, useState, useEffect } from 'react'

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { toast } from 'react-toastify'

import { api } from '../services/apiClient'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: ( credentials: SignInProps ) => Promise<void>;
    signOut: () => void;
}

type UserProps  = {
    id: string;
    name: string;
    username: string;
    typeUser: string;
}

type SignInProps = {
    username: string;
    password: string;
    typeSession: string;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        destroyCookie(undefined, '@nextauth.type')
        destroyCookie(undefined, '@nextauth.user')
        Router.push('/')
    }catch{
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [ user, setUser ] = useState<UserProps>()
    const isAuthenticated = !!user; // !! => Converte em boolean (se estiver vazio fica "false")

    useEffect( () => {
        const {'@nextauth.token': token} = parseCookies('');
        const {'@nextauth.type': typeUser} = parseCookies('');
        const {'@nextauth.user': userID} = parseCookies('');
        
        if(token){
            if(typeUser === "student") {
                api.get('/student', {
                    params:{
                        studentID: userID,
                    }
                })
                .then( response => {
                    const {id, name, register} = response.data;
                    setUser({
                        id, 
                        name, 
                        username: String(register),
                        typeUser
                    })
                })
                .catch(() =>{
                    signOut();
                })
            } else if(typeUser === "administrator") {
                api.get('/administrator',{
                    params:{
                        adminID: userID,
                    }
                })
                .then( response => {
                    const {id, name, username} = response.data;
                    setUser({
                        id, 
                        name, 
                        username,
                        typeUser
                    })
                })
                .catch(() =>{
                    signOut();
                })
            } else if(typeUser === "teacher") {
                api.get('/teacher', {
                    params:{
                        teacherID: userID,
                    }
                })
                .then( response => {
                    const {id, name, username} = response.data;
                    setUser({
                        id, 
                        name, 
                        username,
                        typeUser
                    })
                })
                .catch(() =>{
                    signOut();
                })
            }

            
        }

    }, [] )

    async function signIn({username, password, typeSession}: SignInProps){
        try{
            let response;
            if(typeSession === "student")   {
                response = await  api.post('/student/auth', {
                    register: Number(username), 
                    password
                })
            } else if(typeSession === "administrator") {
                response = await  api.post('/administrator/auth', {
                    username, 
                    password
                })
            } else if(typeSession === "teacher") {
                response = await  api.post('/teacher/auth', {
                    username, 
                    password
                })
            }
            const {id, name} = response.data;
            const token = response.headers['x-access-token']
            const typeUser = response.headers['x-access-type']
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: typeUser !== 'student' ? 60 * 60 : 60 * 60 * 24 * 15, // Expira em 1h 
                path: "/" // Quais caminhos terão acesso ao cookie
            })
            setCookie(undefined, '@nextauth.type', typeUser, {
                maxAge: typeUser !== 'student' ? 60 * 60 : 60 * 60 * 24 * 15, // Expira em 1h 
                path: "/" // Quais caminhos terão acesso ao cookie
            })
            setCookie(undefined, '@nextauth.user', id, {
                maxAge: typeUser !== 'student' ? 60 * 60 : 60 * 60 * 24 * 15, // Expira em 1h 
                path: "/" // Quais caminhos terão acesso ao cookie
            })
            setUser({
                id,
                name,
                username,
                typeUser
            })
            
            //Passar para as próximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //toast.success('Logado com sucesso')

            
            if (typeUser === "student"){
                Router.push('/home/student');
            }else if (typeUser === "administrator") {
                Router.push('/home/administrator');
            }else if (typeUser === "teacher"){
                Router.push('/home/teacher');
            }
        
        }catch(err){
            toast.error(!err.response?.data.error ? 'Não foi possível realizar o login, Motivo: Desconhecido' : 'Não foi possível realizar o login, Motivo: '+ err.response?.data.error);
            console.log(err)
        }
    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            { children }
        </AuthContext.Provider>
    )
}
