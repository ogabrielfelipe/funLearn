import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Link href='/login/admin'> Login Administrador </Link>
      <br/>
      <Link href='/login/teacher'> Login Professor </Link>
      <br/>
      <Link href='/login/student'> Login Student </Link>
    </>
  )
}

export default Home
