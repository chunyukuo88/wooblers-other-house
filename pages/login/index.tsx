"use client"
import {SetStateAction, useEffect, useRef, useState} from "react";
import {signInUser} from "../../hooks/useAuth";

export default function Login() {
  const userRef = useRef();
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
      const {isSignedIn, nextStep} = await signInUser(userName, pwd);
      console.log(`isSignedIn: ${isSignedIn}`);
      console.log(`nextStep: ${nextStep}`);
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
    </div>
  );
};