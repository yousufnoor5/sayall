const ServerError = (res) => {
    res.status(500).send({
        status : "failed",
        msg : "Something went wrong !"
    });
}

module.exports = ServerError;