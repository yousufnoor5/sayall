const uniqueID = () => {

    let result           = '';
    let characters       = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;

    for(i of Array(8).keys()){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   
    return result;
};

module.exports = uniqueID;