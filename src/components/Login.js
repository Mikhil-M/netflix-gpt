import { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/151f3e1e-b2c9-4626-afcd-6b39d0b2694f/web/IN-en-20241028-TRIFECTA-perspective_bce9a321-39cb-4cce-8ba6-02dab4c72e53_large.jpg'
          alt='login-background' />
      </div>
      <form className='absolute w-1/4 p-12 my-36 mx-auto right-0 left-0 bg-black text-white bg-opacity-80 rounded-lg'>
        <h1 className='text-3xl font-bold'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInForm && <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-800'></input>}
        <input type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-800'></input>
        <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-800'></input>
        <button className='p-4 my-4 w-full bg-red-700 rounded-lg'>Sign In</button>
        {isSignInForm
          ? <p className='py-4'>New to Netflix? <span className='underline cursor-pointer' onClick={toggleSignInForm}>Sign up now.</span></p>
          : <p className='py-4'>Already registered? <span className='underline cursor-pointer' onClick={toggleSignInForm}>Sign in.</span></p>}
      </form>
    </div>
  )
}

export default Login