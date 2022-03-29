const isEmpty = (arr, body) => {

    for(const key of arr){
        if(body[key] == undefined || body[key] == "" || !body[key]){
            return true;
        }
    }

    return false;
}

const isEmail = (email) => {

    if(email.match(/^\S+@\S+\.\S+$/)){
        return true;
    }else{
        return false;
    }
}

const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const isSpecialCharsOk = (text) => {

    ///if text does not contain special chars except _ then return true
    if(text.match(/^[a-zA-Z0-9_]+$/)){
        return true;
    }
    else{
        return false;
    }
}


module.exports = {isEmpty, isEmail, isNumeric, isSpecialCharsOk};