import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token:null,
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

  },
});


export const { signIn, signOut, saveToken } = profilSlice.actions;

export default profilSlice.reducer;
