import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./login.less";
const logo = require("../../../public/img/cognizant-logo.svg");

interface ILoginProps {
    isVerified: boolean;
    isLoggedIn: boolean;
}

const initialState = {
    isEmailLoading: false,
    isEmailSent: false,
    cognizantEmail: null
};

const Login = (props: ILoginProps) => {
    const [state, setState] = useState(initialState);

    const emailInputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => setState({ ...state, cognizantEmail: event.currentTarget.value });

    const facebookClickHandler = (event: React.MouseEvent) =>
        location.href = "https://auth.ctsbaltic.com/api/auth/signin/Facebook?returnUrl=https%3A%2F%2Fctsbaltic.com";

    const googleClickHandler = (event: React.MouseEvent) =>
            location.href = "https://auth.ctsbaltic.com/api/auth/signin/Google?returnUrl=https%3A%2F%2Fctsbaltic.com";

    const emailButtonClickHandler = (event: React.MouseEvent) => {
        setState({ ...state, isEmailLoading: true, isEmailSent: false });
        axios.post("https://auth.ctsbaltic.com/api/verification/emailCode", { email: state.cognizantEmail })
            .then((res) => {console.log(res); setState({ ...state, isEmailLoading: false, isEmailSent: true })})
            .catch(() => setState({ ...state, isEmailLoading: false, isEmailSent: false }));
    };

    return (
        <div className="login-container">
            <img className="logo" src={logo} />
            <div className="login">
                {!props.isLoggedIn && (
                    <React.Fragment>
                        <div className="login-title">Hi, there!</div>
                        <div className="login-subtitle">Sign in to continue</div>
                        <div className="login-methods">
                            <button className="login-facebook" onClick={facebookClickHandler}>
                                <FontAwesomeIcon icon={faFacebookSquare} />
                                Facebook
                            </button>
                            <button className="login-google" onClick={googleClickHandler}>
                                <FontAwesomeIcon icon={faGoogle} />
                                Google
                            </button>
                        </div>
                    </React.Fragment>
                )}
                {props.isLoggedIn && !props.isVerified && (
                    <React.Fragment>
                        <div className="login-title">Almost done...</div>
                        <div className="login-subtitle">Verify that you are Cognizant employee</div>
                        <div className="login-email-verification">
                            <input className="login-email" type="email" placeholder="Enter your Cognizant email" onChange={emailInputChangeHandler} />
                            <button className="login-email-button" onClick={emailButtonClickHandler}>
                                {state.isEmailLoading && <FontAwesomeIcon icon={faCircleNotch} spin={true} />}
                                {state.isEmailSent ? "Email sent!" : "Send verification email"}
                            </button>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};
export { Login };
