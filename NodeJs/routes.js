//Controllers
const UsersListController = require("./Controllers/UsersListController");
const RegisterController = require("./Controllers/RegisterController");
const LoginController = require("./Controllers/LoginController");
const IsLoggedInController = require("./Controllers/IsLoggedInController");
const UserInfoController = require("./Controllers/UserInfoController");
const UpdateUserInfoController = require("./Controllers/UpdateUserInfoController");
const ChangePassController = require("./Controllers/ChangePassController");
const MessageListController = require("./Controllers/MessagesListController");
const CheckUserController = require("./Controllers/CheckUserController");
const SendMessageController = require("./Controllers/SendMessageController");

//Middlewares
const AuthMiddleware = require("./Middlewares/AuthMiddleware");
const HTMLFilterMiddleware = require("./Middlewares/HTMLFilterMiddleware");


const routes = (app) => {

    app.get("/isloggedin", IsLoggedInController);

    app.use(HTMLFilterMiddleware);

    app.get("/", UsersListController);

    app.post("/register", RegisterController);

    app.post("/login", LoginController);

    app.get("/checkuser/:username", CheckUserController);

    app.post("/sendmessage", SendMessageController);

    //Middleware to check login
    app.use(AuthMiddleware);

    app.get("/userinfo", UserInfoController);

    app.post("/updateuser", UpdateUserInfoController);

    app.post("/changepass", ChangePassController);

    app.get("/messages", MessageListController);

    app.get("/logout" , (req,res) => {
        req.session.destroy();
        res.send({
            status : "logout success",
            msg : "Logout",
        });
    });

}

module.exports = routes;