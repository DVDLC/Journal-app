import { useSelector } from "react-redux"
import { NoteScreen } from "../notes/NoteScreen"
import { NothingSelected } from "./NothingSelected"
import { Sidebar } from "./Sidebar"

export const JournalScreen = ( ) => {

    const { activeNote } = useSelector( state => state.notes )

    return(
        <div className="journal_main-content">
            <Sidebar />
            
            <main>

                {
                    activeNote 
                        ? <NoteScreen /> 
                        : <NothingSelected />
                }
                
            </main>
        </div>
    )
} 