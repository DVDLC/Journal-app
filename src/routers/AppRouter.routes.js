import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { JournalScreen } from "../components/journal/JournalScreen"
import { ErrorPage } from "../components/ui/404"
import { LoadingScreen } from "../components/ui/LoadingScreen"
import { login } from "../redux/actions/auth.actions"
import { startLoadingNotes } from "../redux/actions/notes.actions"
import { AuthRouter } from "./AuthRouter.routes"
import { PrivateRoutes } from "./Private.routes"
import { PublicRoutes } from "./Public.routes"

export const AppRouter = ( ) => {

    const dispatch = useDispatch()
    const [ checkin, setCheckin ] = useState( true )
    const [ isLoggedIn, setIsLoggedIn ] = useState( false )

    useEffect(() => {

        const auth = getAuth()
        onAuthStateChanged( auth, async ( user ) => {
            if( user?.uid ){
                dispatch( login( user.uid, user.displayName ) )
                setIsLoggedIn( true )

                dispatch( startLoadingNotes( user.uid ) )

            }else{
                setIsLoggedIn( false )
            }
            setCheckin( false )
        })

    },[ dispatch, setCheckin, setIsLoggedIn ])

    if( checkin ){
        return(
            <LoadingScreen/>
       ) 
    }

    return(
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/" 
                    element={ 
                        <PrivateRoutes isAuthenticated={ isLoggedIn } >
                            <JournalScreen /> 
                        </PrivateRoutes> 
                    }
                />
                <Route 
                    path="auth/*" 
                    element={ 
                        <PublicRoutes isAuthenticated={ isLoggedIn } >
                            <AuthRouter /> 
                        </PublicRoutes>
                    }
                />

                <Route path="*" element={ <ErrorPage /> }/>
            </Routes>
        </BrowserRouter>
    )
} 