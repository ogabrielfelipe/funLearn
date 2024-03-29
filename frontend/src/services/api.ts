import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'
import setupGame from '../../SetupGame.json'

import { signOut } from '../contexts/AuthContext'

export function setupAPIClient( ctx = undefined ){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: `${setupGame.config.protocol}://${setupGame.config.ipServer}:${setupGame.config.portServer}`,
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    },(error: AxiosError) => {
        if(error.response.status === 401){
            //QUalquer error 401 devemos deslogar o usuário
            // eslint-disable-next-line valid-typeof
            if (typeof window != undefined){
                signOut();
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error);
    })
    return api
}