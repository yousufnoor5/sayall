import { useEffect, useState, useRef } from "react";
import { isEmail, isEmpty } from "../Support/FormValidator";
import axios from "axios";
import Constants from "../Support/Constants";
import { useRouter } from "next/router";

const SettingsPage = ({ data }) => {

    const formData = useRef();
    const saveBtn = useRef();
    const passFormData = useRef();
    const passSaveBtn = useRef();

    const router = useRouter();

    const [errMsg, setErrMsg] = useState("");
    const [passErrMsg, setPassErrMsg] = useState("");
    const [imgErr, setImgErr] = useState("");
    const [imgName, setImgName] = useState(null);
    const [profImg, setProfImg] = useState(null);

    const saveBtnTimeout = useRef(null);
    const passBtnTimeout = useRef(null);

    if(!data.profilePic){
        data.profilePic = "nouser.jpeg";
    }


    useEffect(() => {

        return () => {

            if(saveBtnTimeout.current){
                clearTimeout(saveBtnTimeout.current);
                saveBtnTimeout.current = null;
            }
            if(passBtnTimeout.current){
                clearTimeout(passBtnTimeout.current);
                passBtnTimeout.current = null;
            }
     
        }

    },[]);

    const changePass = (event) => {
        event.preventDefault();

        const passBtnText = passSaveBtn.current.innerText;

        if (passBtnText === "Changing..." || passBtnText === "Password Changed") {
            return;
        }

        if (isEmpty(['currpass', 'newpass', 'confirmpass'], passFormData.current)) {
            setPassErrMsg("Please fill all the fields.");
            return;
        }

        const { currpass, newpass, confirmpass } = passFormData.current;


        if (newpass.value.length < 6) {
            setPassErrMsg("Password length should be atleast of 6 characters.");
            return;
        }
        else if (newpass.value != confirmpass.value) {
            setPassErrMsg("Confirm password is not correct.");
            return;
        }
        else if (currpass.value === newpass.value) {
            setPassErrMsg("Current and new password should not be same.");
            return;
        }

        if (passErrMsg != "") {
            setPassErrMsg("");
        }

        passSaveBtn.current.innerText = "Changing...";

        axios.post(Constants.apiUrl + "changepass", {

            currpass: currpass.value,
            newpass: newpass.value,
            confirmpass: confirmpass.value,

        },
            { withCredentials: true })
            .then((e) => {

                if (e.data.status === "success") {
                    passSaveBtn.current.innerText = "Password Changed";

                    passBtnTimeout.current = setTimeout(() => {
                        passSaveBtn.current.innerText = "Change";
                    }, 5000);

                    currpass.value = "";
                    newpass.value = "";
                    confirmpass.value = "";
                }
                else {
                    setPassErrMsg(e.data.msg);
                    passSaveBtn.current.innerText = "Change";
                }

            })
            .catch((err) => {

                if (err.response.status === 401) {
                    router.push("/login");
                }
                else {
                    setPassErrMsg(err.response.data.msg);
                    passSaveBtn.current.innerText = "Change";
                }
                console.clear();

            });

    }


    const Save = (event) => {

        event.preventDefault();

        const saveBtnText = saveBtn.current.innerText;

        if (saveBtnText === "Saving..." || saveBtnText === "Saved" || imgErr != "") {
            return;
        }

        saveBtn.current.innerText = "Saving...";

        const { name, bio, email } = formData.current;

        if (name.value === "") {
            setErrMsg("Please write name.");
            saveBtn.current.innerText = "Save";
            return;
        }
        else if (email.value === "" || !isEmail(email.value)) {
            setErrMsg("Please write valid email address.");
            saveBtn.current.innerText = "Save";
            return;
        }
        else if(bio.value.length > 300){
            setErrMsg("Bio is too long !");
            saveBtn.current.innerText = "Save";
            return;
        }
        else {
            if (errMsg !== "") {
                setErrMsg("");
            }
        }

        const form = new FormData();
        form.append("name", name.value);
        form.append("bio", bio.value);
        form.append("email", email.value);

        if(profImg && imgName){
            form.append("img", profImg);
            form.append("imgName", imgName);
        }

        axios.post(Constants.apiUrl + "updateuser", form
        , { withCredentials: true })
            .then((e) => {

                if (e.data.status === "success") {
                    saveBtn.current.innerText = "Saved";
                    saveBtnTimeout.current = setTimeout(() => {
                        saveBtn.current.innerText = "Save";
                    }, 5000);
                }
                else {
                    setErrMsg(e.data.msg);
                    saveBtn.current.innerText = "Save";
                }

            })
            .catch((err) => {

                if (err.response.status === 401) {
                    router.push("/login");
                }
                else {
                    setErrMsg(err.response.data.msg);
                    saveBtn.current.innerText = "Save";
                }
                console.clear();

            });

    }

    const onImgChange = (e) => {
       
        const imgName = e.target.files[0].name;
        const img = e.target.files[0];

        if(!imgName.match(/^.*\.(jpg|gif|GIF|png|jpeg|bmp|webp)$/i)){
            setImgErr("Wrong Image Format !");
            return;
        }

        if(imgErr != ""){
            setImgErr("");
        }

        setImgName(imgName);
        setProfImg(img);

         //imgInp = id set to choose file
        const [file] = imgInp.files;

        if (file) {
            //id set to profile img
            profileImg.src = URL.createObjectURL(file);
        }
    }
    return (

        <div className="settings-container">

            <form className="mx-3 my-3" ref={formData}>

                <h5 className="mb-3">Account Information</h5>

                <div className="mb-3 acc-set-img d-flex">
                    <img src={Constants.apiUrl + "images/" + data.profilePic} id="profileImg" />
                    <input type="file" id="imgInp" onChange={onImgChange} />
                </div>

                <p className="my-3 mx-1 text-danger">{imgErr}</p>

                <div className="mb-3">

                    <label className="form-label">Username</label>
                    <input type="text" defaultValue={data.username} className="form-control" disabled />

                </div>

                <div className="mb-3">

                    <label className="form-label">Email</label>
                    <input name="email" type="email" defaultValue={data.email} className="form-control" />

                </div>

                <div className="mb-3">

                    <label className="form-label">Name</label>
                    <input name="name" type="text" defaultValue={data.name} className="form-control" />

                </div>

                <div className="mb-3">

                    <label className="form-label">Bio</label>
                    <textarea name="bio" defaultValue={data.bio} style={{ minHeight: "200px" }} className="form-control"></textarea>

                </div>

                <p className="my-2 mx-1 text-danger">{errMsg}</p>

                <button ref={saveBtn} type="submit" className="btn btn-primary" onClick={Save}>Save</button>

            </form>

            <hr />

            <form className="mx-3 my-4" ref={passFormData}>

                <h5 className="mb-3">Change Password</h5>

                <div className="mb-3">

                    <label className="form-label">Current Password</label>
                    <input name="currpass" type="password" className="form-control" />

                </div>

                <div className="mb-3">

                    <label className="form-label">New Password</label>
                    <input name="newpass" type="password" className="form-control" />

                </div>

                <div className="mb-3">

                    <label className="form-label">Confirm Password</label>
                    <input name="confirmpass" type="password" className="form-control" />

                </div>

                <p className="my-2 mx-1 text-danger">{passErrMsg}</p>

                <button onClick={changePass} ref={passSaveBtn} type="submit" className="btn btn-primary">Change</button>


            </form>


        </div>
    )
};

export default SettingsPage;