import Constants from "../Support/Constants";
import Link from "next/link";
import UserLineIcon from 'remixicon-react/UserLineIcon';
import Chat1LineIcon from "remixicon-react/Chat1LineIcon";
import LogoutCircleRLineIcon from "remixicon-react/LogoutCircleRLineIcon";
import SettingsLineIcon from "remixicon-react/SettingsLineIcon";
import { useRouter } from "next/router";
import axios from "axios";
import BottomMenu from "./BottomMenu";
import Head from "next/head";

const MainLayout = (props) => {

    const router = useRouter();

    const Logout = () => {

        axios.get(Constants.apiUrl + "logout", {withCredentials : true})
        .then((e) => {
            router.push("/login");
        })
        .catch((err) => {

        });
    
    };

    return (

      <>

      <Head>
        <title>{props.title}</title>
      </Head>

      <BottomMenu />


        <div className="container-fluid mc" style={{overflowY : "auto"}}>

        <div className="row">

          <div className="col-3 left-sb">

            <div className="side-menu-container">

                <h5 className="brand-heading"><Link href="/"><a>{Constants.appName}</a></Link></h5>

                <ul className="side-menu">

                <Link href="/profile"><a><li className={props.profile ? "side-menu-link active-menu" : "side-menu-link"}> 
                   <UserLineIcon size={22} className="menu-icon" />
                   Profile
                </li></a></Link>

                <Link href="/messages"><a><li className={props.messages ? "side-menu-link active-menu" : "side-menu-link"}>
                    <Chat1LineIcon size={22} className="menu-icon" />
                    Messages
                </li></a></Link>

                <Link href="/settings"><a><li className={props.settings ? "side-menu-link active-menu" : "side-menu-link"}>
                    <SettingsLineIcon size={22} className="menu-icon" />
                    Settings
                </li></a></Link>

                <li className="side-menu-link" onClick={Logout}>
                  <LogoutCircleRLineIcon size={22} className="menu-icon"/>
                  Logout
                </li>
                
                </ul>

            </div>

          </div>

          <div className="col-6 main-content">
           

            <div className="page-container">
              
              <div className="page-heading">
                <h4>{props.title}</h4>
              </div>

              {props.children}

            
            </div>

          </div>

          <div className="col-2 my-2 right-sb">
            {/* <h3>Ad</h3> */}
          </div>

        </div>

      </div>

    </>

    );
}

export default MainLayout;