import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'

//Responsaveis pelas notificações
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastContainer 
        autoClose={3000} 
        position="top-right"
        theme='light'
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Component {...pageProps} />
    </AuthProvider>
  ) 
}

export default MyApp
