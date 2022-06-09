
import { AppRouter } from './routers/AppRouter.routes'
import { Provider } from "react-redux";
import { store } from './redux/store/store';
import './styles/styles.scss'


export const JournalApp = ( ) => {
    return(
        <Provider store={ store } >
            <AppRouter />
        </Provider>
    )
}