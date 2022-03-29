import { useEffect, useState } from "react";
import Constants from "../Support/Constants";
import axios from "axios";
import { useRouter } from "next/router";
import CloseCircleLineIcon from "remixicon-react/CloseCircleLineIcon";
import ConvertTime from "../Support/ConvertTime";

const Loading = () => {
    return (

        <div className="d-flex justify-content-center align-items-center" style={{minHeight : "80vh"}}>
            <div className="big-progress"></div>
        </div>
    )
}

const NoMsg = () => {
    return (

        <div className="d-flex justify-content-center align-items-center flex-column" style={{minHeight : "80vh"}}>
            <CloseCircleLineIcon className="my-2" size={30}/>
            <h5>No Message Found</h5>
        </div>
    )
}

const MessagesPage = ({data, count}) => {

    const [msgs, setMsgs] = useState([]);
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [noLoad, setNoLoad] = useState(false);

    useEffect(() => {

        if(noLoad === false){

            axios.get(Constants.apiUrl + `messages?pg=${page}` , {withCredentials : true})
            .then((e) => {
                if(e.data.status === "success"){
                    
                    if(e.data.messages.length === 0){
                        setNoLoad(true);
                    }
                    else{
                        setMsgs([...msgs, ...e.data.messages]);
                    }
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    router.push("/login");
                }
                console.clear();
            });
        }

    },[page]);


    //on msg btn click call pg 1 again
    useEffect(() => {

        axios.get(Constants.apiUrl + `messages?pg=1` , {withCredentials : true})
        .then((e) => {
            if(e.data.status === "success"){
                
                if(e.data.messages.length === 0){
                    setNoLoad(true);
                }
                else{
                    setMsgs([...e.data.messages]);
                }
            }
        })
        .catch((err) => {
            if (err.response.status === 401) {
                router.push("/login");
            }
            console.clear();
        });

    }, [count]);

   
    const onEndScroll = (event) => {


        if((event.currentTarget.scrollTop + document.body.clientHeight) == event.currentTarget.scrollHeight){
            setPage(++page); 
        }
    
    }

    useEffect(() => {

        const pageContainer = document.querySelector(".page-container");

        pageContainer.addEventListener("scroll", onEndScroll);

        return () => {
            pageContainer.removeEventListener("scroll", onEndScroll);
        }

    },[]);

    return (
        <div className="messages-container">

        {
            (msgs.length === 0 && noLoad === false)? <Loading /> : 

            (noLoad === true && page === 1) ? <NoMsg /> :

            msgs.map((e, idx) => {
            return(
                <div className="msg-card" key={idx}>
                    <p className="anno-msg">{e.msg}</p>
                    <p className="msg-date">{ConvertTime(e.date)}</p>
               </div>
            );
        })

        }
            

        </div>
    )
};

export default MessagesPage;