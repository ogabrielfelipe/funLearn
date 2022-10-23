import { useContext } from 'react'
import Link from 'next/link'

import { AuthContext } from '../../contexts/AuthContext'
import React from 'react'

export function Header(){
    const { signOut } = useContext(AuthContext)


    return(
        <header>
            <div>
                <Link href="/dashboard">
                    <img src='./components/assets/Header.svg' width={190} height={60} />
                </Link>
            </div>
            
        </header>
    )
}