import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { replacePassword, startGoogleLogin, startLoginEmailPassword } from '../../redux/actions/auth.actions.js'

export const LoginScreen = ( ) => {

    const dispatch = useDispatch()
    const { loading } = useSelector( state => state.ui )

    const [ values, handleInputChange ] = useForm({
        email: '',
        password: '' 
    })

    const { email, password } = values

    const handleSubmit = ( e ) => {
        e.preventDefault()
        dispatch( startLoginEmailPassword( email, password ) )
    }
    
    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() )
    }

    const handleForgot = () => {
        dispatch( replacePassword( email ) )
    }

    return(
        <div>
            <h1 className="auth_welcome-msg typewriter-animation" >Hello world!</h1>
            <h3 className="auth_title" >Login</h3>
            <form 
                onSubmit={ handleSubmit }
            >
                <input
                    className="auth_input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input
                    className="auth_input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <span 
                    className="auth_forgot-password"
                    onClick={ handleForgot }
                > Forgot the password </span>

                <button 
                    className="btn btn-primary btn-block mt-5"
                    type="submit" 
                    disabled={ loading }
                >
                    Login
                </button>
                <div className="auth_social-networks" > 
                    <span className= 'auth_text-p' >Login with social networks</span>
                    <div
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                        disabled={ loading }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link 
                    className="link link_auth-link"
                    to="/auth/signup"
                >
                    Create new account
                </Link>
            </form>
        </div>
    )
} 