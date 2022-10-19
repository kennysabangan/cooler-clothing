import styled from "styled-components";
import { BaseButton, GoogleSignInButton, InvertedButton } from "../button/button.styles";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 320px;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton}, ${GoogleSignInButton}, ${InvertedButton} {
    margin-top: auto;
  }
`

export const EmptyMessage = styled.span`
  font-size: 16px;
  margin: 50px auto;
`

export const CartItems = styled.div`
  height: 290px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
