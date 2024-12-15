import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        navigate("/error");
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [])

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black w-full z-10 flex justify-between h-20'>
      <img className='w-44' src={LOGO}
        alt='logo' />
      {user && <div className="flex">
        <div className="p-4">
          {user?.photoURL && <img src={user?.photoURL || ''} alt="Signed in user"
            className="w-12 rounded-full cursor-pointer" />}
        </div>
        <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
      </div>}
    </div>
  )
}

export default Header