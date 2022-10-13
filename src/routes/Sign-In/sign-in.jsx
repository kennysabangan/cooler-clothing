import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign In With Google Pop-Up
      </button>
      <SignUpForm />
    </div>
  )
}

export default SignIn;

  // >> If we want to use Google Redirect
  // useEffect(() => {
  //   async function getRedirectData() {
  //     const res = await getRedirectResult(auth);
  //     if (res) {
  //       const userDocRef = await createUserDocumentFromAuth(res.user);
  //     }
  //   }
  //   getRedirectData();
  // }, [])