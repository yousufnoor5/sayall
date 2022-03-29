const IsLoggedInController = (req, res) => {

   const sess = req.session;

   if(sess.loggedIn){
       return res.send({
           status : "ok",
           msg : "User is logged in.",
           isLoggedIn : true,
       });
   }
   else{
        return res.send({
            status : "ok",
            msg : "User is not logged in.",
            isLoggedIn : false,
        });
   }


}

module.exports = IsLoggedInController;