import { useEffect, useRef} from 'react';
import Constants from '../Support/Constants';

const ProfilePage = ({data}) => {

  const shareUrl = useRef();
  const copyUrl = useRef();
  const timeouts = useRef([]);

  if(!data.profilePic){
     data.profilePic = "nouser.jpeg";
  }

  useEffect(() => {

    //removing timeouts
    return () => {
       if(timeouts.current){
         for(const x of timeouts.current){
           clearTimeout(x);
         }
       }
    }

  },[]);

  const onCopy = () => {

    if(copyUrl.current.innerText === "Copied To Clipboard"){
      return;
    }

    navigator.clipboard.writeText(shareUrl.current.innerText);

    copyUrl.current.style.opacity = 0;

    const t1 = setTimeout(() => {
      copyUrl.current.innerText = "Copied To Clipboard";
      copyUrl.current.style.opacity = 1;
    }, 200);

    timeouts.current.push(t1);
  

    const t2 = setTimeout(() => {

       copyUrl.current.style.opacity = 0;

       const t3 = setTimeout(() => {
         copyUrl.current.innerText = "Copy Link";
         copyUrl.current.style.opacity = 1;
       }, 200);

       timeouts.current.push(t3);

    }, 3000);

    timeouts.current.push(t2);
  }

  return(

    <div className="profile-container">

       <div className="profile-info d-flex justify-content-center align-items-center flex-column">
         <img src={Constants.apiUrl + "images/" + data.profilePic} />
         <h4 className="profile-name">{data.name}</h4>
       </div>

       <div className="profile-bio" >
         <p>{data.bio}</p>
       </div>

       <div className="share-url">
         <p ref={shareUrl}>{Constants.appLink}{data.username}</p>
       </div>

       <div className="share-url-btn-container">
         <button ref={copyUrl} onClick={onCopy} className="btn share-url-btn">Copy Link</button>
        </div>

    </div>
    
  )
}

export default ProfilePage;