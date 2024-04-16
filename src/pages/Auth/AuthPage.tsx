import google from '../../assets/google.svg'
import facebook from '../../assets/facebook.svg'
import github from '../../assets/github.svg'
import dualpadel_blue from '../../assets/dualpadel.svg'

import './auth.scss'
import { useState } from 'react'

import { useAuthStore } from '../../store/auth'

import { Sonner } from '../../components/Sonner'

import { Navigate } from 'react-router-dom'
import { useOAuthRRSS } from '../../hooks/rrss'
import { LoginInput } from '../../components/LoginInput'
import { RED_BORDER_VALIDATOR, EMAIL_REGEX_VALIDATOR } from '../../libs/validators'
import { signUp } from '../../services/auth'

interface Props {
  isTablet?: boolean
  isMobile?: boolean
}
interface FormInputsErrors {
  confirmPassword?: {
    message: string
  } | null
  password?: {
    message: string
  } | null
  firstName?: {
    message: string
  } | null | undefined
  email?: {
    message: string
  } | null
  lastName?: {
    message: string
  } | null
}
// eslint-disable-next-line no-empty-pattern
export const Auth = ({}: Props) => {
  const [toggle, setToggle] = useState(false)
  const login = useAuthStore(state => state.login)
  const isAuth = useAuthStore(state => state.isAuth)
  const { googleOAuth } = useOAuthRRSS()
  const [registerFormErrors, setRegisterFormErrors] = useState<FormInputsErrors>({
    confirmPassword: null,
    password: null,
    firstName: null,
    email: null,
    lastName: null
  })

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (email == null || password == null) {
      console.error('Email or password is null')
    }
    login({ email, password })
  }
  const isNullOrEmpty = (value: string | null) => {
    return value === '' || value == null
  }
  const validateSignUpFormNotEmpty = (name: string, value: string) => {
    if (isNullOrEmpty(value)) {
      console.log(({ ...registerFormErrors, [name]: { message: 'Campo obligatorio' } }))
      setRegisterFormErrors({ ...registerFormErrors, [name]: { message: 'Campo obligatorio' } })
      return false
    } else {
      setRegisterFormErrors({ ...registerFormErrors, [name]: null })
      return true
    }
  }
  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    const formInputs = { firstName, lastName, email, password, confirmPassword }

    const formInputsErrors: FormInputsErrors = {}
    Object.keys(formInputs).map((key: string) => {
      formInputsErrors[key as keyof FormInputsErrors] = isNullOrEmpty(formInputs[key as keyof FormInputsErrors]) ? { message: 'Campo obligatorio' } : null
      return null
    })
    setRegisterFormErrors(formInputsErrors)
    const isFormValid = Object.values(formInputsErrors).every(value => value === null)
    if (isFormValid) {
      signUp(formInputs)
    }
  }

  const handleOnChangeValidators = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = document.getElementById('registerFrom') as HTMLFormElement
    const formData = new FormData(form)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const { name, value } = e.target as HTMLInputElement
    switch (name) {
      case 'confirmPassword':
        if (password !== value) {
          setRegisterFormErrors({ ...registerFormErrors, confirmPassword: { message: 'La constraseña no coincide' }, password: { message: 'La constraseña no coincide' } })
        } else {
          setRegisterFormErrors({ ...registerFormErrors, confirmPassword: null, password: null })
        }
        break
      case 'password':
        if (confirmPassword !== value) {
          setRegisterFormErrors({ ...registerFormErrors, password: { message: 'La constraseña no coincide' }, confirmPassword: { message: 'La constraseña no coincide' } })
        } else {
          setRegisterFormErrors({ ...registerFormErrors, password: null, confirmPassword: null })
        }
        break
      case 'firstName':
        validateSignUpFormNotEmpty(name, value)
        break
      case 'lastName':
        validateSignUpFormNotEmpty(name, value)
        break
      case 'email':
        if (validateSignUpFormNotEmpty(name, value)) {
          if (!EMAIL_REGEX_VALIDATOR.test(value)) {
            setRegisterFormErrors({ ...registerFormErrors, email: { message: 'El email no es válido' } })
          } else {
            setRegisterFormErrors({ ...registerFormErrors, email: null })
          }
        }
        break
    }
  }

  if (isAuth) {
    return <Navigate to='/' replace />
  } else {
    return (
      <div className='auth-page'>
        <div className={toggle ? 'auth-container active' : 'auth-container'}>
          <div className='auth-logo'>
            <img src={dualpadel_blue} alt='dualpadel-lgoo' />
          </div>
          <div className='auth-container-flex'>
            <div className='form-container login'>
              <div className='title'>
                Login
              </div>
              <div className='rrss'>
                <img onClick={googleOAuth} src={google} alt='google' />
                <img src={github} alt='google' />
                <img src={facebook} alt='google' />
              </div>
              <div className='line' />
              <div className='message'>
                <p>o utiliza tu email y contraseña</p>
              </div>
              <form onSubmit={handleLoginSubmit}>
                <div className='inputs'>
                  <LoginInput name='email' placeholder='Email' />
                  <LoginInput name='password' type='password' placeholder='Contraseña' />
                </div>
                <div className='message'>
                  <p>¿Te has olvidado la contraseña?</p>
                </div>
                <button className='button' type='submit'>Login</button>
              </form>
            </div>
            <div className='form-container signup'>
              <div className='title'>
                Crea tu cuenta
              </div>
              <div className='rrss'>
                <img src={google} onClick={googleOAuth} alt='google' />
                <img src={github} alt='google' />
                <img src={facebook} alt='google' />
              </div>
              <div className='line' />
              <div className='message'>
                <p>o utiliza tu email para el registro</p>
              </div>
              <form id='registerFrom' onSubmit={handleSignUpSubmit} onChange={handleOnChangeValidators}>
                <div className='inputs'>
                  <LoginInput name='firstName' placeholder='Nombre' styles={registerFormErrors?.firstName && RED_BORDER_VALIDATOR} errorMessage={registerFormErrors?.firstName?.message} />
                  <LoginInput name='lastName' placeholder='Apellidos' styles={registerFormErrors?.lastName && RED_BORDER_VALIDATOR} errorMessage={registerFormErrors?.lastName?.message} />
                  <LoginInput name='email' placeholder='Email' styles={registerFormErrors?.email && RED_BORDER_VALIDATOR} errorMessage={registerFormErrors?.email?.message} />
                  <LoginInput name='password' type='password' placeholder='Contraseña' styles={registerFormErrors?.password && RED_BORDER_VALIDATOR} errorMessage={registerFormErrors?.password?.message} />
                  <LoginInput name='confirmPassword' type='password' placeholder='Confirma Contraseña' styles={registerFormErrors?.confirmPassword && RED_BORDER_VALIDATOR} errorMessage={registerFormErrors?.confirmPassword?.message} />
                </div>
                <button className='button mt-20' type='submit'>Registro</button>
              </form>
            </div>
            <div className='toggle-container'>
              <div className='toggle'>
                <div className='toggle-panel toggle-left'>
                  <div className='toggle-title'>
                    ¡Hola de nuevo!
                  </div>
                  <div className='toggle-message'>
                    <p className='p_top'>¿Ya tienes cuenta?</p>
                    <p>¡Inicia sesión!</p>
                  </div>
                  <div className='toggle-button' onClick={() => setToggle(!toggle)}>
                    Login
                  </div>
                </div>
                <div className='toggle-panel toggle-right'>
                  <div className='toggle-title'>
                    ¡Bienvenido!
                  </div>
                  <div className='toggle-message'>
                    <p className='p_top'>¿Todavía no tienes cuenta?</p>
                    <p>¡Registrate!</p>
                  </div>
                  <div className='toggle-button' onClick={() => setToggle(!toggle)}>
                    Registro
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Sonner position='bottom-center' />
      </div>
    )
  }
}
