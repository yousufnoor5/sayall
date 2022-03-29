import Head from 'next/head';
import Link from "next/link";
import Constants from '../Support/Constants';


export default function Home() {
  return (

    <>

    <Head>

      <title>SayAll | Anonymous Messaging</title>
      <meta name="description" content="SayAll allows you to send and receive anonymous feedbacks and messages !" />
      <link rel="icon" href="/favicon.ico" />

    </Head>

      <div className='l-pg-container'>

       
      
        <h1 className='mb-3'>SayAll.me</h1>
          <p>SayAll allows you to send and receive anonymous feedbacks and messages !</p>

          <Link href="/register"><a><button className="btn l-pg-btn">Let&apos;s Start</button></a></Link>
          

      </div>

   

    </>
  )
}
