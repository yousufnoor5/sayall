import MainLayout from '../Components/MainLayout';
import ProfilePage from '../Components/ProfilePage';
import Head from 'next/head';
import axios from 'axios';
import Constants from '../Support/Constants';

const Profile = ({data}) => {

    return (
       <>

        <MainLayout title="Profile" profile={true}>
            <ProfilePage data={data} />
        </MainLayout>
       </>
    )

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


export default Profile;