const User = require("../Models/User");

const UsersListController = (req, res) => {

    let data = User.find({}, ['name', 'bio', 'profilePic', '-_id'])
    .then((e) => {
        res.send(e);
    })
    .catch(err => {
        res.status(500).send("Internal Server Error");
    });


}

module.exports = UsersListController;