import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import "./login.less";

interface ILoginProps {
    isVerified: boolean;
}

const initialState = {
    isLoggedIn: false,
    isEmailLoading: false,
    isEmailSent: false
};

const Login = (props: ILoginProps) => {
    const [state, setState] = useState(initialState);

    const facebookClickHandler = (event: React.MouseEvent) => setState({ ...state, isLoggedIn: true });
    const googleClickHandler = (event: React.MouseEvent) => setState({ ...state, isLoggedIn: true });
    const emailButtonClickHandler = (event: React.MouseEvent) => setState({ ...state, isEmailLoading: true, isEmailSent: false });

    return (
        <div className="login-container">
            <img className="logo" src="../../../public/img/cognizant-logo.svg" />
            <div className="login">
                {!state.isLoggedIn && (
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
                {state.isLoggedIn && !props.isVerified && (
                    <React.Fragment>
                        <div className="login-title">Almost done...</div>
                        <div className="login-subtitle">Verify that you are Cognizant employee</div>
                        <div className="login-email-verification">
                            <input className="login-email" type="email" placeholder="Enter your Cognizant email" />
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
