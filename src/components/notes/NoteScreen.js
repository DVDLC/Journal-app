import { useDispatch, useSelector } from "react-redux"
import { NotesAppBar } from "./NotesAppBar"
import { useForm } from "../../hooks/useForm"
import { useEffect, useRef } from "react"
import { activeNote, startDeleting } from "../../redux/actions/notes.actions"

export const NoteScreen = () => {

    const { activeNote:note } = useSelector( state => state.notes )
    const dispatch = useDispatch()

    const [ values, handleInputChange, reset ] = useForm( note )
    const { body, title, id } = values

    const activeID = useRef( note.id )

    useEffect(() => {
        if( note.id !== activeID.current ){
            reset( note )
            activeID.current = note.id
        }
    }, [ note, reset ])

    useEffect(() => {
        dispatch( activeNote( values.id, { ...values }) )
    }, [ values, dispatch ])

    const handleDelete = () => {
        dispatch( startDeleting( id ) )
    }
    
    return (
        <div className="notes_main">
            <NotesAppBar/>
            <div className="notes_content">
                <input 
                    placeholder="Some awesome Title"
                    type="text" 
                    className="notes_title-input"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />
                <textarea 
                    className="notes_text-area"
                    placeholder="What happen today?"
                    cols="30" 
                    rows="10"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                >
                </textarea>
                {
                    note?.url && 
                    <div className="notes_image">                    
                        <img src={ note?.url } alt="userImg"/>
                    </div>
                }
            </div>
            <button 
                className="btn btn-danger" 
                onClick={ handleDelete }
            > 
                Delete
            </button>
        </div>
    )
}