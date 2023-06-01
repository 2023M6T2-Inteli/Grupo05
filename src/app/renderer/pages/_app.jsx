import React from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  React.useEffect(() => {
    if (router.pathname !== '/login') {
      router.push('/login'); // Redireciona para a página de login
    }
  }, []);
  return <Component {...pageProps} />;
}
export default MyApp;