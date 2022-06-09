import { Routes, Route } from "react-router-dom"
import { LoginScreen } from "../components/auth/LoginScreen"
import { RegistrerScreen } from "../components/auth/RegistrerScreen"
import { ErrorPage } from "../components/ui/404"

export const AuthRouter = ( ) => {
    return(
        <div className="auth_main">
            <div className="auth_box-container" >
                <Routes>
                    <Route path='login' element={ <LoginScreen /> } />
                    <Route path='signup' element={ <RegistrerScreen /> } />
                
                    <Route path="*" element={ <ErrorPage /> }/>
                </Routes>   
            </div>
        </div>
    )
} 