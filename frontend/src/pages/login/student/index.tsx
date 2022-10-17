import { FormEvent, useContext, useState } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { canSSRGuest } from "../../../utils/canSSRGuest";

import BackgroundSistema from '../../../assets/BackgroundSistema.svg';

import { Card, Container, Button } from "./styles";

export default function Loginstudent(){


    const { signIn } = useContext(AuthContext)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e: FormEvent) {
        e.preventDefault();


        let data = {
            username: username,
            password: password,
            typeSession: 'student'
        }

        await signIn(data);

    }
    return (
        <>
            <Card>
                <Container>
                    {/* <img src={BackgroundSistema}/> */}
                    <h1> Tela de Login do Aluno </h1>
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
