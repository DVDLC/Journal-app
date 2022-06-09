import { Link } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux";
import { RemoveError, SetError } from "../../redux/actions/ui.actions";
import { startRegistered } from "../../redux/actions/auth.actions";
import validator from "validator";

export const RegistrerScreen = ( ) => {


    const [ values, handleInputChange ] = useForm({
        name: 'David',
        email: 'dlc_97@outlook.com',
        password1: '',
        password2: ''
    })
    
    let { name, email, password1, password2 } = values

    const dispatch = useDispatch( )
    const { msgError } = useSelector( state => state.ui )



    const handleSubmit = e => {
        e.preventDefault()
        if( isFormValid() ) {
            dispatch( startRegistered( email, password1, name ) )
        }
    }

    const isFormValid = () => {

        if( name.trim().length === 0 ) {
            dispatch( SetError('Name is required') )
            return false
        }else if( !validator.isEmail( email ) ){
            dispatch( SetError('Email is not valid') )
            return false
        }else if( !validator.equals( password1, password2 ) ){
            dispatch( SetError('The password does not match') )
            return false            
        }else if( validator.isStrongPassword( password1, { minLength: 2 } )){
            dispatch( SetError('The password must have at least 5 characters'))
            return false
        }

        dispatch( RemoveError() )
        return true
    }
  
    return(
        <div>
            <h3 className="auth_title" >Sign-up</h3>
            <form
                onSubmit={ handleSubmit }
            >   
                {
                    msgError && 
                        <div className="auth_alert-error" >{ msgError }</div>
                }
                <input
                    className="auth_input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />
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
                    name="password1"
                    autoComplete="off"
                    value={ password1 }
                    onChange={ handleInputChange }
                />

                <input
                    className="auth_input"
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    autoComplete="off"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button 
                    className="btn btn-primary btn-block mb-5"
                    type="submit" 
                >
                    Sign-up
                </button>
                <Link 
                    className="link link_auth-link"
                    to="/auth/login"
                >
                    Already registered?
                </Link>
            </form>
        </div>
    )
} 