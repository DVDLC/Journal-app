import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducers } from '../reducers';


export const store = configureStore({
    reducer: rootReducers
}, [thunk]);
