"use client"
import {SetStateAction, useEffect, useRef, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {AuthUser} from "aws-amplify/auth";

export default function Login() {
  const userRef = useRef();
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const {signInUser, signOutUser} = useAuth();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userName, pwd]);

  const handleError = () => {
    // if (!error?.originalStatus) setErrMsg("No server response");
    // else if (error.originalStatus?.status === 401) setErrMsg("Unauthorized");
    // else setErrMsg("Login failed");
  };

  interface SubmissionEvent {
    preventDefault: () => void
  }

  const handleSubmit = async (event: SubmissionEvent) => {
    event.preventDefault();
    try {
      const AuthUser = await signInUser(userName, pwd);
      console.log(`AuthUser: ${AuthUser}`);
      console.dir(AuthUser);
    } catch (e) {
      // handleError(e)
    }
  };

  interface InputEvent {
    target: {
      value: SetStateAction<string>;
    };
  }

  const handleUserInput = (event: InputEvent) => setUserName(event.target.value);
  const handlePwdInput = (event: InputEvent) => setPwd(event.target.value);

  const logOutUser = async () => {
    await signOutUser();
  };

  return (
    <div id="login-card-wrapper">
      <h2 className="page-login__title">Login</h2>
      <div id="login-card">
        <form className="logout-out-form" onSubmit={handleSubmit}>
          <fieldset className="inputs-wrapper">
            <div className="username-input">
              <input
                type="text"
                label="username input"
                data-testid="username-input"
                id="username"
                ref={userRef}
                value={userName}
                onChange={handleUserInput}
                placeholder="Username"
                autoComplete="off"
                required
              />
            </div>
            <div className="password-input">
              <input
                type="password"
                label="password input"
                data-testid="password-input"
                id="password"
                onChange={handlePwdInput}
                placeholder="Password"
                value={pwd}
                required
              />
            </div>
          </fieldset>
          <button className="login-button" title="login button">Submit</button>
        </form>
      </div>
      <button onClick={logOutUser}>Log Out</button>
    </div>
  );
};
