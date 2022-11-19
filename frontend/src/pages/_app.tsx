import "../../styles/globals.css"


import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'

//Responsaveis pelas notificações
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

//Responsável pela loading de paginas
import NextNProgress from 'nextjs-progressbar';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastContainer 
        autoClose={3000} 
        position="top-right"
        theme="colored"
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <NextNProgress
        startPosition={0.3} 
        stopDelayMs={200} 
        height={5} 
        showOnShallow={true}
      />

      <Component {...pageProps} />
    </AuthProvider>
  ) 
}

export default MyApp
