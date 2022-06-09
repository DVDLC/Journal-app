import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { notesReducer } from "./notes.reducer";
import { uiReducer } from "./ui.reducer";


export const rootReducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})