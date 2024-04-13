import Cookies from 'js-cookie';

const SetCookie = (name, body) => {
    try{
        Cookies.set(name, body);
    }catch(err){
        throw err;
    }

};


export default SetCookie;
