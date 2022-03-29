import { useRef, useState } from "react";
import { isEmpty } from "../Support/FormValidator";
import axios from "axios";
import Constants from "../Support/Constants";
import Link from "next/link";
import { useRouter } from 'next/router';
import Head from "next/head";


const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const loginForm = useRef();
    const router = useRouter();
    // const location = useLocation();
    // const history = useHistory();
    let registerMsg = "";

    try {
        registerMsg = router.query.msg;
        // console.log(location.state.msg)
    }
    catch (err) {
        registerMsg = "";
    }

    const [msg, setMsg] = useState({ color: "#2962FF", msg: registerMsg });

    const onLogin = (event) => {

        event.preventDefault();

        //validating form details
        if (isEmpty(['username', 'password'], loginForm.current)) {
            setMsg({ color: "red", msg: "Please fill all the fields !" });
            return;
        }

        const { username, password } = loginForm.current;

        setIsLoading(true);

        axios.post(Constants.apiUrl + "login", {
            username: username.value,
            password: password.value,
        },
            {
                withCredentials: true,
            })
            .then((e) => {

                if (e.data.status == "login success") {
                    router.push({
                        pathname: "/profile",
                    });
                }
                else {
                    setIsLoading(false);
                }

                return;

            })
            .catch((err) => {

                setIsLoading(false);
                try {
                    setMsg({ color: 'red', msg: err.response.data.msg });
                }
                catch (err) {

                }
                console.clear();

            });


    }

    return (

        <>

            <Head>
                <title>Login - SayAll</title>
            </Head>

            <nav className="navbar">
                <div className="d-flex justify-content-center align-items-center w-100">
                    <Link href="/" ><a className="navbar-title">{Constants.appName}</a></Link>
                </div>
            </nav>

            <div className="main-container">

                <div className="form-box">

                    <div className="d-flex justify-content-center align-items-center login-card">

                        <form ref={loginForm}>

                            <h5 className="mb-2">Sign In</h5>

                            <span className="msg mb-2" style={{ color: msg.color }}>{msg.msg}</span>

                            <div className="mb-3 mt-2">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" name="username" />
                            </div>


                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" />
                            </div>

                            {
                                isLoading
                                    ?
                                    <div className="small-progress mt-4"></div>
                                    :
                                    <button type="submit" className="btn btn-primary w-100 mt-2 mb-2" onClick={onLogin}>Sign In</button>
                            }

                            <p className="my-2">Don&apos;t have an account?  <Link href="/register"><a>Sign Up</a></Link></p>
                        </form>

                    </div>
                </div>

            </div>

        </>
    )
}


export default Login;