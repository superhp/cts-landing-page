import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import "./login.less";
import { api } from "../../helpers/axiosHelper";
import { dispatch } from "../../store/state";
const logo = require("../../../public/img/cognizant-logo.svg");

interface ILoginProps {
    isVerified: boolean;
    isLoggedIn: boolean;
}

const initialState = {
    loading: false,
    isEmailSent: false,
    cognizantEmail: "",
    verificationCode: ""
};

const Login = (props: ILoginProps) => {
    const [state, setState] = useState(initialState);
    const emailInputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => setState({ ...state, cognizantEmail: event.currentTarget.value });
    const codeInputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => setState({ ...state, verificationCode: event.currentTarget.value });

    const facebookClickHandler = (event: React.MouseEvent) =>
         location.href = "https://auth.ctsbaltic.com/api/auth/signin/Facebook";
      //  location.href = "http://localhost:51581/api/auth/signin/Facebook?returnUrl=https%3A%2F%2Fctsbaltic.com";

    const googleClickHandler = (event: React.MouseEvent) =>
         location.href = "https://auth.ctsbaltic.com/api/auth/signin/Google?returnUrl=https%3A%2F%2Fctsbaltic.com";
      //  location.href = "http://localhost:51581/api/auth/signin/Google?returnUrl=https%3A%2F%2Fctsbaltic.com";

    const emailButtonClickHandler = (event: React.MouseEvent) => {
        var pattern = /[a-zA-Z]+\.[a-zA-Z]+@cognizant.com/;
        var match = state.cognizantEmail.match(pattern);
        if (match == null || match.length > 1 || match[0].length !== state.cognizantEmail.length) {
            dispatch({ type: "showSnackbar", data: { show: true, message: "Incorrect format of email address", variant: "error" } });
            return;
        }

        setState({ ...state, loading: true, isEmailSent: false });
        api.post("verification/emailCode", { email: state.cognizantEmail })
            .then(() => {
                setState({ ...state, loading: false, isEmailSent: true })
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    dispatch({ type: "showSnackbar", data: { show: true, message: "Incorrect format of email address", variant: "error" } });
                }
                setState({ ...state, loading: false, isEmailSent: false })
            });
    };

    const codeButtonClickHandler = (event: React.MouseEvent) => {
        setState({ ...state, loading: true });
        api.get("verification/verify/" + state.verificationCode)
        //.then(() => location.href = "http://localhost:3000")
        .then(() => location.href = "https://ctsbaltic.com")
            .catch((error) => {
                if (error.response.status === 400) {

                    dispatch({ type: "showSnackbar", data: { show: true, message: "Incorrect code", variant: "error" } });
                    setState({ ...state, loading: false });
                }
            });
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
                        <div className="login-subtitle"> {state.isEmailSent ? "Enter the code you have just received" : "Enter your Cognizant email according to specified format"}</div>
                        <div className="login-email-verification">
                            {state.isEmailSent
                                ? (
                                    <React.Fragment>
                                        <input value={state.verificationCode} className="login-email" type="email" placeholder={"Enter your verification code"} onChange={codeInputChangeHandler} />
                                        <button className="login-email-button" onClick={codeButtonClickHandler}>
                                            {state.loading && <FontAwesomeIcon icon={faCircleNotch} spin={true} />}
                                            {"Submit your code"}
                                        </button>
                                    </React.Fragment>
                                )
                                : (
                                    <React.Fragment>
                                        <input value={state.cognizantEmail} className="login-email" type="email" placeholder={"e.g. John.Johanson@cognizant.com"} onChange={emailInputChangeHandler} />
                                        <button className="login-email-button" onClick={emailButtonClickHandler}>
                                            {state.loading && <FontAwesomeIcon icon={faCircleNotch} spin={true} />}
                                            {"Send verification email"}
                                        </button>
                                    </React.Fragment>
                                )
                            }
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};
export { Login };
