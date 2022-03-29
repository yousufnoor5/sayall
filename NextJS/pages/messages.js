import MessagesPage from "../Components/MessagesPage";
import MainLayout from "../Components/MainLayout";
import Head from "next/head";

let count = 0;

const Messages = () => {
    
    return(
        <>
            <MainLayout title="Messages" messages={true} >
              <MessagesPage data="" count={count++} />
            </MainLayout>
        </>
    );
};

export default Messages;