import { useRouter } from 'next/router';
import Constants from '../Support/Constants';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import Head from 'next/head';

const User = ({ username, name, profileImg, bio }) => {

  const [msg, setMsg] = useState();
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg , setErrMsg] = useState('');

  name = name.length > 15 ? name.substr(0, 15) + "..." : name;

  profileImg = profileImg ? profileImg : "nouser.jpeg";

  const sendMsg = (event) => {

    event.preventDefault();

    if (!msg) {
      return;
    }

    if(msg.target.value.length <= 15){
      setErrMsg("Message is too short !");
      return;
    }
  
    if(msg.target.value.length > 500){
      setErrMsg("Message is too long ! Max characters limit : 500. new");
      return;
    }

    setIsLoading(true);

    axios.post(Constants.apiUrl + "sendmessage", {
      username: username,
      msg: msg.target.value
    })
      .then((e) => {

        if (e.data.status == "success") {
          setSent(true);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.clear();
        setIsLoading(false);
        setErrMsg(err.response.data.msg);
      })

  }

  return (


    <>

      <Head>
        <title>{username} | SayAll</title>
        <meta name="description" content={`Leave an anonymous message for ${username}`} />
        <meta property="og:type" content="profile" />
        <meta name="og:description" content={`Leave an anonymous message for ${username}`}  />
        <meta property="og:title" content={`${username} | SayAll`} />
        <meta property="og:image" content={Constants.apiUrl + "images/" + profileImg} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${username} | SayAll`} />
        <meta name="twitter:description" content={`Leave an anonymous message for ${username}`} />
        <meta property="twitter:image" content={Constants.apiUrl + "images/" + profileImg} />
      </Head>

      <nav className="navbar">
        <div className="d-flex justify-content-center align-items-center w-100">
          <Link href="/" ><a className="navbar-title">{Constants.appName}</a></Link>
        </div>
      </nav>

      <div className='send-msg-container'>

        <div className='d-flex justify-content-center align-items-center flex-column send-msg'>

          <img className='mb-2' src={Constants.apiUrl + "images/" + profileImg} />
          <span className='mb-3'>{name}</span>

          <p className='s-bio'>{bio}</p>

          {
            sent ?

              <h5 className='mt-5'>{name} has received your message.</h5>

              :

              <form className='s-msg-form'>
                <div className="form-group">
                  <p className='mb-3'>Leave an anonymous message for {name}</p>
                  <textarea className="form-control s-msg-text" rows="3" onChange={setMsg}></textarea>
                </div>

                <p className='mt-3 text-danger'>{errMsg}</p>

                {
                  !isLoading
                  &&
                  <button onClick={sendMsg} className="btn s-msg-btn mt-2">Send</button>
                }


              </form>
          }

          {
            isLoading && <div className="small-progress2 mt-4"></div>
          }


        </div>

      </div>

    </>

  )
}

export async function getServerSideProps(context) {

  const { username } = context.query;
  let data = null;

  try {

    data = await axios.get(Constants.apiUrl + "checkuser/" + username);

  } catch (err) {

    return {
      notFound: true
    }

  }


  return {
    props: {
      username: username,
      name: data.data.name,
      profileImg: data.data.profileImg,
      bio : data.data.bio,
    }, // will be passed to the page component as props
  }
}

export default User;
