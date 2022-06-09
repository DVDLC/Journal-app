import { types } from "../types/auth.types";

const initialState = {
    notes: [],
    activeNote: null,
}

export const notesReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.notesAdd: {
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }
        }
        case types.notesActive:
            return {
                ...state,
                activeNote: { ...action.payload }
            }
        case types.notesLoad:        
            return {
                ...state,
                notes: [ ...action.payload ]
            } 
        case types.notesUpdated:        
            return {
                ...state,
                notes: state.notes.map(
                        note => note.id === action.payload.id
                            ? action.payload.note
                            : note
                    )
            }
        case types.notesRemove:        
            return {
                ...state,
                activeNote: null,
                notes: state.notes.filter( note => note.id !== action.payload)
            }    
        case types.notesLogOutCleaning:        
            return {
                ...state,
                notes: [],
                activeNote: null
            }      
        default:
            return state
    }
}
