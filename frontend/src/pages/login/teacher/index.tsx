import { FormEvent, useContext, useState } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { canSSRGuest } from "../../../utils/canSSRGuest";



export default function LoginTeacher(){


    const { signIn } = useContext(AuthContext)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e: FormEvent) {
        e.preventDefault();


        let data = {
            username: username,
            password: password,
            typeSession: 'teacher'
        }

        await signIn(data);

    }
    return (
        <>
            <h1> Tela de Login do Professor </h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
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
        </>
    )
}
