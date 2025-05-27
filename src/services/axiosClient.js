import { createAxiosClient } from "./createAxiosClient";
import { useSelector, useDispatch } from 'react-redux';
//const BASE_URL = 'http://10.0.0.133:80/api';
//const BASE_URL = 'http://192.168.2.38:80/api';
//const BASE_URL = 'http://192.168.2.38:5000/api';

const BASE_URL = 'http://10.0.0.133:5000/api';

//const BASE_URL = "https://api-hpay-mobile.hpaytest.cash/api";
//const token = useSelector((state: any) => state.profil.token);


//const BASE_URL = 'https://backend.clanlantene.com/joe92/api/';

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


