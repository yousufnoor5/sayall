import '../styles/globals.css';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';

function MyApp({ Component, pageProps }) {

    const loadingRef = useRef(null);
    const router = useRouter()

    useEffect(() => {

      const handleRouteChange = (url, { shallow }) => {

        loadingRef.current.continuousStart();
    

      }

      const handleRouteComplete = (url, obj) => {
          try{
              loadingRef.current.complete();
          }
          catch(err){

          }
      }

      router.events.on('routeChangeStart', handleRouteChange);
      router.events.on('routeChangeComplete', handleRouteComplete)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {

        router.events.off('routeChangeStart', handleRouteChange);
        router.events.off('routeChangeComplete', handleRouteComplete);
        try{
          loadingRef.current.complete();
        }
        catch(err){

        }

      }
    }, []);

  return (

    <>

      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
      </Head>

      <LoadingBar color='#7C4DFF' height={3} ref={loadingRef} />

     
      <Component {...pageProps} />
      

    </>

  );
}

export default MyApp
