import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../utils/firebase';
import { addUser } from '../utils/userSlice';
import { checkValidData } from '../utils/validate';
import Header from './Header';
import { BG_IMG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value, name?.current?.value, isSignInForm);
    setErrMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: USER_AVATAR
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrMessage(errorCode + " - " + errorMessage);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + " - " + errorMessage);
        });
      return;
    }
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in     
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrMessage(errorCode + " - " + errorMessage);
      });
  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src={BG_IMG_URL} className="fixed w-screen h-screen object-cover"
          alt='login-background' />
      </div>
      <form onSubmit={(event) => event.preventDefault()} className='absolute w-full md:w-1/4 p-12 my-36 mx-auto right-0 left-0 bg-black text-white bg-opacity-80 rounded-lg'>
        <h1 className='text-3xl font-bold'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInForm && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-800'></input>}
        <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-800'></input>
        <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-800'></input>
        <p className='text-red-500'>{errMessage}</p>
        <button className='p-4 my-4 w-full bg-red-700 rounded-lg' onClick={handleButtonClick}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
        {isSignInForm
          ? <p className='py-4'>New to Netflix? <span className='underline cursor-pointer' onClick={toggleSignInForm}>Sign up now.</span></p>
          : <p className='py-4'>Already registered? <span className='underline cursor-pointer' onClick={toggleSignInForm}>Sign in.</span></p>}
      </form>
    </div>
  )
}

export default Login