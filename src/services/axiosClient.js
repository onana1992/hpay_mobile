import { createAxiosClient } from "./createAxiosClient";
import { useSelector, useDispatch } from 'react-redux';

//const BASE_URL = 'http://10.0.0.133:80/api';
//const BASE_URL = 'http://192.168.2.38:80/api';
//const BASE_URL = 'http://192.168.2.38:5000/api';

//const BASE_URL = 'http://10.0.0.133:5000/api';

const BASE_URL = "https://api-hpay-mobile.hpaytest.cash/api";

//const token = useSelector((state: any) => state.profil.token);
//const BASE_URL = 'https://backend.clanlantene.com/joe92/api/';

//const BASE_URL_SOCHITEL = 'https://wt2.westsofts.com/sochitel/';
const BASE_URL_SOCHITEL_PROD = 'https://api.hpay.cash/sochitel/';
const BASE_URL_SOCHITEL_TEST = 'https://api.hpaytest.cash/sochitel/'

//'https://wt2.westsofts.com/sochitel/';
//    ;



export const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
            //"Content-Type": "multipart/form-data",
            "accept": "application/json",
            'Content-Type': 'application/json',
        }
    },
    
});


export const client2 = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    },

})


export const clientSochitelTest = createAxiosClient({
    options: {
        baseURL: BASE_URL_SOCHITEL_TEST,
        timeout: 300000,
        headers: {
            //"Content-Type": "multipart/form-data",
            "accept": "application/json",
            'Content-Type': 'application/json',
        }
    },

});



export const clientSochitelProd = createAxiosClient({
    options: {
        baseURL: BASE_URL_SOCHITEL_PROD,
        timeout: 300000,
        headers: {
            //"Content-Type": "multipart/form-data",
            "accept": "application/json",
            'Content-Type': 'application/json',
        }
    },
});




