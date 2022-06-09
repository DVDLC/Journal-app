import dayjs from "dayjs"
import { useDispatch } from "react-redux"
import { activeNote } from "../../redux/actions/notes.actions"

export const JournalEntry = ({ id, date, title, body, url }) => {

    const day = dayjs( date )
    const dispatch = useDispatch()

    const handleEntryClick = () => {
        dispatch( activeNote( id, { title, body, date, url } ) )
    }

    return(
        <div
            className="journal_entry"
            onClick={ handleEntryClick } 
        >
            <div 
                className="journal_entry-picture"
            >   
                {
                    url &&
                        <img src={url} alt="" />
                }
            </div>
            <div className="journal_entry-body">
                <p className="journal_entry-title">
                    { title }
                </p>
                <p className="journal_entry-content">
                    { body } 
                </p>
            </div>
            <div className="journal_entry-date-box">
                <span>{ day.format('dddd') }</span>
                <h4>{ day.format( 'Do' ) }</h4>
            </div>
        </div>
    )
}