import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../redux/actions/auth.actions"
import { addNewNote } from "../../redux/actions/notes.actions"
import { JournalEntries } from "./JournalEntries"

export const Sidebar = () => {

    // TODO
    
    const dispatch = useDispatch()
    const { name } = useSelector( state =>  state.auth  )
    

    const handleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddEntry = () => {
        dispatch( addNewNote() )
    }

    //Esto solo me ayuda para saber si cambia el estado de notes
/* import { useEffect } from "react" */
/*     const state = useSelector( state =>  state  )
    useEffect(()=> {
        console.log( state )
    }, [ handleAddEntry ]) */

    return(
        
        <aside className="journal_sidebar">
            <div className="journal_sidebar-navbar">
                <h3 
                    className="mt-5"
                    style={{ marginLeft: '10px' }}
                >
                    <span>{ name }</span>
                </h3>
                <button 
                    className="btn" 
                    onClick={ handleLogout }
                > 
                        Log-out
                </button>
            </div>

            <div 
                onClick={ handleAddEntry }
                className="journal_new-entry"
            >
                <i className="far fa-calendar-plus fa-5x"></i> 
                <p className="mt-5" >new entry</p>
            </div>
            <JournalEntries />
        </aside>
    )
}
