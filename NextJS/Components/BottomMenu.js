import UserLineIcon from 'remixicon-react/UserLineIcon';
import Chat1LineIcon from "remixicon-react/Chat1LineIcon";
import LogoutCircleRLineIcon from "remixicon-react/LogoutCircleRLineIcon";
import SettingsLineIcon from "remixicon-react/SettingsLineIcon";
import Constants from '../Support/Constants';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

const BottomMenu = (props) => {

    const router = useRouter();

    const Logout = () => {

        axios.get(Constants.apiUrl + "logout", {withCredentials : true})
        .then((e) => {
            router.push("/login");
        })
        .catch((err) => {

        });
    
    };


    const getActive = (name) => {

        if (props.active === name) {
        return "bmenu-active"
        } else {
        return "";
        }
    };

    return (

        <div className="bottom-menu">

        <ul className='b-menu-ul'>

          <Link href="/profile"><a><li className={getActive('profile')}>
            <div className="b-menu-btn">
              <UserLineIcon size={Constants.bmenuSize} />
              <span>Profile</span>
            </div>
          </li></a></Link>

          <Link href="/messages"><a><li className={getActive('messages')}>
            <div className="b-menu-btn">
              <Chat1LineIcon size={Constants.bmenuSize} />
              <span>Messages</span>
            </div>
          </li></a></Link>

          <Link href="/settings"><a><li className={getActive('settings')}>
            <div className="b-menu-btn">
              <SettingsLineIcon size={Constants.bmenuSize} />
              <span>Settings</span>
            </div>
          </li></a></Link>

          <li className={getActive('logout')} onClick={Logout}>
            <div className="b-menu-btn">
              <LogoutCircleRLineIcon size={Constants.bmenuSize} />
              <span>Logout</span>
            </div>
          </li>


        </ul>

      </div>


    );
}

export default BottomMenu;