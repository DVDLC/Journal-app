import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startUpdateNote, uploadImageNote } from "../../redux/actions/notes.actions"

export const NotesAppBar = () => {

    const dispatch = useDispatch()
    const { activeNote } = useSelector( state => state.notes )
    const fileInput = useRef( null )
    
    const handleSaveDb = () => {
        dispatch( startUpdateNote( activeNote ) )
    }

    const handleuploadImg = () => {
        clickInputFile()
    }

    const handlefileChange = e => {
        dispatch( uploadImageNote( e.target.files[0] ) )
    }

    const clickInputFile = () => {
        fileInput.current.click()
    }

    return (
        <div className="notes_app-bar">
            <span> 28 de agosto 2020 </span>

            <input 
                ref={ fileInput }
                type="file" 
                style={ { display: 'none' } }
                onChange={ handlefileChange }
            />

            <div>
                <button
                    className="btn"
                    onClick={ handleuploadImg }
                >
                    Picture
                </button>
                <button
                    className="btn"
                    onClick={ handleSaveDb }
                >
                    Save
                </button>
            </div>
        </div>
    )
}