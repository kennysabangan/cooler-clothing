import SignUpForm from '../../components/sign-up-form/sign-up-form';
import SignInForm from '../../components/sign-in-form/sign-in-form';
import './authentication.scss'

const Authentication = () => {
  return (
    <div className='auth-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication;

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