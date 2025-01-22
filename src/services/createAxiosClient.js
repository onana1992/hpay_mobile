
import axios from 'axios';



export function createAxiosClient({ options }) {

    const client = axios.create(options);
    return client;
}


