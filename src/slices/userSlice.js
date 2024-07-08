import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: "user",  //veriable name for user Slice
    initialState,
    reducers:{
        setUser:(state, action) => {
            state.user = action.payload;  //this user is initialState user
        },
        clearUser: (state) => {
            state.user = null; //this user is initialState user
        },
    },
});

//exporting actionCreator
export const {setUser, clearUser} = userSlice.actions;

//exporting reducers
export default userSlice.reducer;
