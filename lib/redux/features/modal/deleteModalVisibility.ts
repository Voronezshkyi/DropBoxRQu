import { createSlice } from "@reduxjs/toolkit";

interface DeleteModal {
    show: boolean;
}

const initialState: DeleteModal = {
    show: false
}

const deleteModalVisibility = createSlice({
    name: "deleteModal",
    initialState,
    reducers: {
        deleteModalChangeVisibility: (state) => {
            return {
                show: !state.show
            };
        }
    }
})

export const { deleteModalChangeVisibility } = deleteModalVisibility.actions

export default deleteModalVisibility.reducer
