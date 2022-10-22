import { FormEvent, useContext, useState } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { canSSRGuest } from "../../../utils/canSSRGuest";

import Link from 'next/link'

import BackgroundSistema from '../../../assets/BackgroundSistema.svg';

import { Card, Container, Button } from "./styles";

export default function LoginAdmin(){


    const { signIn } = useContext(AuthContext)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e: FormEvent) {
        e.preventDefault();


        let data = {
            username: username,
            password: password,
            typeSession: 'administrator'
        }

        await signIn(data);

    }
    return (
        <>
            <Card>
                <Container>
                    {/* <img src={BackgroundSistema}/> */}

                    <Button>
                        <Link href='/'> Voltar  </Link>
                    </Button>
                    
                    <h1> Tela de Login do administrador </h1>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input 
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                        />

                        <input 
                            type="submit"
                        />
                    </form>
                </Container>  
            </Card>
        </>
    )
}
