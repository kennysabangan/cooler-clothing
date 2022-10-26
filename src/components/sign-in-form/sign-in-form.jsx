import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles.jsx";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user);

      resetFormFields();
      navigate('/');
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email.')
          break;
        case 'auth/user-not-found':
          alert('User was not found.')
          break;
        default:
          console.log('User sign-in encountered an error: ', error);
      }
    }
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    navigate('/');
  }

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm;