import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store/store';
import { saveToken, signIn } from '../store/profilSlice';



export function createAxiosClient({ options }) {

    const client = axios.create(options);

    /*  client.interceptors.request.use(
          async (config) => {
  
              
              // Retrieve the token from AsyncStorage
              //const token = await AsyncStorage.getItem('root');
              // console.log(store.getState().profil.token)
             
              // If the token exists, attach it to the Authorization header
              if (store.getState().profil.token) {
                  config.headers['Authorization'] = `Bearer ${store.getState().profil.token}`;
              }
  
              return config; // Return the config object after modifying it
          },
          (error) => {
              return Promise.reject(error); // If error occurs, reject the promise
          }
      );*/


 /* client.interceptors.response.use(
         (response) => {
             return response;  // Simply return the response if everything is fine
         },
         async (error) => {
             
             const status = await error.response ? error.response.status : null;
             
             if(error.response && error.response.status === 403) {
                 
                // console.log('Session expired or unauthorized. Please log in again.');
                // Here, you can clear the JWT token from AsyncStorage
                //AsyncStorage.removeItem('root');
                store.dispatch(saveToken(null));
                store.dispatch(signIn(null));
                
             }
 
             // Handle 500 Internal Server Error - Server issues
             if (status === 500) {
                 console.log('Internal Server Error. Please try again later.');
                 // Show a message to the user or perform any other handling
             }
 
             // You can add more error handling logic for other status codes here
 
             // Reject the error so it can be handled elsewhere if needed
             return Promise.reject(error);
         }
     );
 
}*/

    return client;

}