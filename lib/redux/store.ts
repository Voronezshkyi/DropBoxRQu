import { configureStore } from "@reduxjs/toolkit";
import deleteModalVisibility from "./features/modal/deleteModalVisibility";
import updateModalVisibility from "./features/modal/updateModalVisibility";


export const store = configureStore({
    reducer: {
        deleteModal: deleteModalVisibility,
        updateModal: updateModalVisibility,
    }
    
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch