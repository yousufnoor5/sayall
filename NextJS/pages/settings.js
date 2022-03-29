import MainLayout from '../Components/MainLayout';
import SettingsPage from '../Components/SettingsPage';
import axios from 'axios';
import Constants from '../Support/Constants';
import Head from 'next/head';

const Settings = ({data}) => {

    return(
        <>
            <MainLayout title="Settings" settings={true} >
             <SettingsPage data={data} />
            </MainLayout>
        </>
    );

}

export async function getServerSideProps(context) {

    const cookies = context.req.cookies;
    let data = null;

    try{
        data = await axios.get(Constants.apiUrl + "userinfo", {
            headers: {
                Cookie: `token=${cookies.token};`
            }
        });
    }
    catch(err){
        //on error
    }


    return {
      props: { data : data.data }, // will be passed to the page component as props
    }
}

export default Settings;