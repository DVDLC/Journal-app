import { types } from "../types/auth.types"
import { googleAuthProvider } from "../../firebase/firebase-config"
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithPopup, 
    updateProfile,
    signInWithEmailAndPassword, 
    signOut,
    sendPasswordResetEmail
} from "firebase/auth"
import { FinishLoading, StartLoading } from "./ui.actions"
import Swal from 'sweetalert2'
import { noteLogout } from "./notes.actions"



export const startLoginEmailPassword = ( email, password ) => {
    return async ( dispatch ) => {

        dispatch( StartLoading() ) 
        const auth = getAuth()
        signInWithEmailAndPassword( auth, email, password )
            .then( ( { user }) => {
                dispatch( login( user.uid, user.displayName  ) )
                dispatch( FinishLoading() ) 
            } )
            .catch( err => {
                console.log(err )
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message
                })
            })
            .finally(() =>  dispatch( FinishLoading() ) )
    }
}

export const startRegistered = ( email, password, name ) => {
    return ( dispatch ) => {

        dispatch( StartLoading() )
        const auth = getAuth()
        createUserWithEmailAndPassword( auth, email, password )
            .then( async ({ user }) => {
                await updateProfile( user, { 'displayName': name })
                dispatch( login( user.uid, user.displayName  ) )
            })
            .catch( err => console.log( err ))
            .finally(() => dispatch( FinishLoading() ))
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => { 
        dispatch( StartLoading() )
        const auth = getAuth()
        signInWithPopup( auth, googleAuthProvider )
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName  ) )
            })
            .catch( err => console.log( err ))
            .finally( () => dispatch( FinishLoading() ) )
    } 
}

export const startLogout = () => { 
    return async ( dispatch ) => {
        const auth = getAuth()
        await signOut( auth )
        
        dispatch( logout() )
        dispatch( noteLogout() )
    } 
} 


export const replacePassword = ( email ) => {
    console.log( email )

    return dispatch => {

        dispatch( StartLoading() )
        
        const auth = getAuth()
        sendPasswordResetEmail( auth, email )
            .then( () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Password reset email sent!'
                })
            })
            .catch(err => {
                Swal.fire({
                    icon: 'question',
                    title: 'Something happen',
                    text: `${ err.message }, ${ err.code }`
                })
            })
            .finally( () => dispatch( FinishLoading() ) )
    }
}

export const login = ( uid, displayName ) => ( { type: types.login, payload: { uid, displayName } } )

export const logout = () => ({ type: types.logout })