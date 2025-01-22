import {configureStore} from '@reduxjs/toolkit';
import profilReducer from './profilSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';



// persist configs
const persistConfig = {
  key: 'root',
 // version: 1,
  storage: AsyncStorage,
};



// adding our rootReducer
const rootReducer = combineReducers({
  profil: profilReducer,
  //cart:   cartReducer
});



// persisting our rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);



// creating our store and exporting it
export const store = configureStore({

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),

  reducer: persistedReducer,

});



export default store;




