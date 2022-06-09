import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"; 
import { db } from "../../firebase/firebase-config"
import { loadNotes } from "../../helper/loadNotes"
import { types } from "../types/auth.types"

import Swal from "sweetalert2"


// El segundo argumento "getState" nos devuelve el state actual de la app

export const addNewNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

// Segmento de firebase :D

        try{
            const docRef = await addDoc( collection( db, `${ uid }/journal/notes` ), newNote )
            dispatch( activeNote( docRef.id, newNote ) )
            dispatch( refreshWhenAddNote( docRef.id, newNote ) )
            
        }catch (e) {
            console.error( 'Error adding document: ', e );
            Swal.fire('error', e.code, 'error')
        }

    }
}

export const startUpdateNote = ( note ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth

        const noteToFirestore = { ...note }
        delete noteToFirestore.id

        if( !note.url ){
            delete noteToFirestore.url
        }

        const firestoreDoc = doc(db, `${uid}`, 'journal', 'notes',`${note.id}`)
        await setDoc(firestoreDoc, noteToFirestore);

        dispatch( refreshNote( note.id, note ) )
        Swal.fire( 'Saved', note.title, 'success' )
    }
}

export const uploadImageNote = ( img ) => {
    return async ( dispatch, getState ) => {

        const storage = getStorage()
        const imgRef = ref( storage, `images/${ img.name }` )

        const { activeNote } = getState().notes
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
    
        await uploadBytes( imgRef, img )
            .then( () => console.log( 'Uploaded a blob or file' ) )
            .catch( err => console.log( err ) )
        
        
        getDownloadURL( ref( storage, `images/${ img.name }` ) )
            .then( url => activeNote.url = url )
            .catch( err => console.log( err ))

        dispatch( startUpdateNote( activeNote ) )
        Swal.close()
    }
}


export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid )
        dispatch( setNotes( notes ) )
    }
}


export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth
        await deleteDoc( doc( db, `${ uid }/journal/notes/${ id }` ) )

        dispatch( deleteNote( id ) )
    }
}

export const refreshWhenAddNote = ( id , note) => ({ type: types.notesAdd, payload: { id, ...note } })

export const refreshNote = (id, note) => ({ type: types.notesUpdated, payload: { id, note }})

export const activeNote = ( id, note ) => ({ type: types.notesActive, payload: { id, ...note } })

export const setNotes = ( notes ) => ({ type: types.notesLoad, payload: notes })

export const deleteNote = ( id ) => ({ type: types.notesRemove, payload: id })

export const noteLogout = () => ({ type: types.notesLogOutCleaning })