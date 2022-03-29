import { useRef, useState } from "react";
import { isEmpty, isEmail, isSpecialCharsOk } from "../Support/FormValidator";
import axios from "axios";
import Constants from "../Support/Constants";
import Link from "next/link";
import { useRouter } from 'next/router';
import Head from "next/head";

const Register = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({ color: "white", msg: "" });
    const regForm = useRef();
    const router = useRouter();

    //const history = useHistory();

    const onRegister = (event) => {

        event.preventDefault();

        //checking all form fields
        if (isEmpty(["name", "email", "username", "password"], regForm.current)) {
            setMsg({ color: "red", msg: "Please fill all the fields !" });
            return;
        }

        //saving form values
        const { name, username, password, email } = regForm.current;

        //validating email
        if (!isEmail(email.value)) {
            setMsg({ color: "red", msg: "Please input a valid email !" });
            return;
        }

        //checking if username contains special chars
        if (!isSpecialCharsOk(username.value)) {
            setMsg({ color: "red", msg: "Username should not contain any special characters except underscore." });
            return;
        }

        if (username.value.length > 15) {
            setMsg({ color: "red", msg: "Username should not be more than 15 characters." });
            return;
        }
        else if(username.value.length < 4){
            setMsg({ color: "red", msg: "Username should be more than 4 characters." });
            return;
        }

        //if any prev error removing it
        if (msg.msg != "") {
            setMsg({ color: "white", msg: "" });
        }

        setIsLoading(true);


        axios.post(Constants.apiUrl + "register", {
            name: name.value,
            email: email.value,
            password: password.value,
            username: username.value,
        },
            {
                withCredentials: true,
            })
            .then((e) => {
                setIsLoading(false);
                if (e.data.status == "reg success") {
                    router.push({
                        pathname: "/login",
                        query: { msg: "Registration success, please login." }
                    }, "/login");
                }
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
                <title>Sign Up - SayAll</title>
            </Head>

            <nav className="navbar">
                <div className="d-flex justify-content-center align-items-center w-100">
                    <Link href="/" ><a className="navbar-title">{Constants.appName}</a></Link>
                </div>
            </nav>

            <div className="main-container">

                <div className="form-box">

                    <div className="d-flex justify-content-center align-items-center register-card">

                        <form ref={regForm}>

                            <h5 className="mb-2">Sign Up</h5>

                            <span className="msg mb-2" style={{ color: msg.color }}>{msg.msg}</span>

                            <div className="mb-3 mt-2">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-control" name="name" />
                            </div>

                            <div className="mb-3 mt-2">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" name="username" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" name="email" />
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
                                    <button type="submit" className="btn btn-primary w-100 mt-2 mb-2" onClick={onRegister}>Sign Up</button>
                            }

                            <p className="my-2">Already have an account?  <Link href="/login"><a>Sign In</a></Link></p>

                        </form>
                    </div>
                </div>

            </div>

        </>
        
        )
}


            export default Register;