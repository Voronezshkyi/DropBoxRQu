import { createSlice } from "@reduxjs/toolkit";

interface updateModal {
    show: boolean;
}

const initialState: updateModal = {
    show: false
}

const updateModalVisibility = createSlice({
    name: "updateModal",
    initialState,
    reducers: {
        updateModalChangeVisibility: (state)=>{!state}
    }
})

export const {updateModalChangeVisibility} = updateModalVisibility.actions

export default updateModalVisibility.reducer