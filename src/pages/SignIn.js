import React, { useState } from "react";
import { TextField, CssBaseline, Button, Box, Container } from "@mui/material";
import "./SignIn.css";

import {
  GoogleAuthProvider,
  signInWithPopup,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendSignInLinkToEmail,
} from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import MailIcon from "@mui/icons-material/Mail";
import { auth, app } from "../config/firebase";

import { useNavigate } from "react-router";

const SignIn = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const actionCodeSettings = {
    url: "https://extension-e6768.web.app/welcome",
    handleCodeInApp: true,
  };

  const signWithGoogle = async () => {
    const provider = new GoogleAuthProvider(app);

    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/welcome", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("ERROR! ", errorCode, errorMessage);
      });
  };

  const signWithEmail = async (e) => {
    e.preventDefault();
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        alert("Please click on the confirmation link we sent to your e-mail!");
        setEmail("");
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((error) => {
        alert("Please enter a valid email!");
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("ERROR! ", errorCode, errorMessage);
      });

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem("emailForSignIn");

          alert("SUCCESS!", result);
        })
        .catch((error) => {
          alert("ERROR!", error);
        });
    }
  };

  return (
    <div className="bg">
      <CssBaseline />
      <Container
        className="container"
        maxWidth="xs"
        sx={{
          border: "solid 2px gray",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Box component="form">
          <TextField
            label="Email Address"
            margin="normal"
            fullWidth
            autoCapitalize="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="email"
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              height: "30px",
              color: "white",
              background: "#1565C0",
              "&:hover": {
                background: "white",
                color: "#1565C0",
                border: "solid 2px #1565C0",
              },
            }}
            onClick={(e) => signWithEmail(e)}
            disabled={!email}
          >
            <MailIcon />
            Sign With Email
          </Button>
        </Box>

        <div className="basarili"></div>

        <Button
          className="google"
          type="submit"
          fullWidth
          color="primary"
          size="small"
          sx={{
            height: "30px",

            color: "white",
            background: "tomato",
            "&:hover": {
              background: "white",
              color: "tomato",
              border: "solid 2px tomato",
            },
          }}
          onClick={signWithGoogle}
        >
          <GoogleIcon />
          Sign with Google
        </Button>
      </Container>
    </div>
  );
};
export default SignIn;
