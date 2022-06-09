
import { types } from '../types/auth.types'

const initialState = {
    uid: null,
    name: ""
}

export const authReducer = ( state = initialState, action ) => {
    switch( action.type ){
        case types.login:
            return{
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.logout:
            return {}
        default:
            return state
    }
}