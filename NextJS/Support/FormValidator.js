const isEmpty = (arr, form) => {

    for(const key of arr){
        
        if(form[key].value == ""){
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


const isSpecialCharsOk = (text) => {

    ///if text does not contain special chars except _ then return true
    if(text.match(/^[a-zA-Z0-9_]+$/)){
        return true;
    }
    else{
        return false;
    }
}

export {isEmpty, isEmail, isSpecialCharsOk};