import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
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

  },
});


export const { signIn, signOut } = profilSlice.actions;

export default profilSlice.reducer;
