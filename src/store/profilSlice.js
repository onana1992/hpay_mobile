import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    benefs: [],
    newClients: [],
    accounts: [],
    benef: null,
    notReadMessage:0,
};


const profilSlice = createSlice({
  name: 'profil',
  initialState,
  reducers: {

    signIn: (state, action) => {
      state.user = action.payload;
    },


    signOut: (state, action) => {
      state.user = null;
      },

    saveToken: (state, action) => {
        state.token = action.payload;
      },

    saveBenefs: (state, action) => {
        state.benefs = action.payload;
    },

    saveNewClients: (state, action) => {
        state.newClients = action.payload;
    },

    saveAccount: (state, action) => {
        state.accounts = action.payload;
    },

    deleteAccount: (state, action) => {
        state.accounts = [];
    },

    saveBenef: (state, action) => {
        state.benef = action.payload;
    },

    deleteAccount: (state, action) => {
        state.benef = null;
    },

    savenotReadMessage: (state, action) => {
        state.notReadMessage = action.payload;
    },

  },
});


export const { signIn, signOut, saveToken,
                saveBenefs, saveNewClients,
                saveAccount, saveBenef,
                savenotReadMessage } = profilSlice.actions;

export default profilSlice.reducer;
