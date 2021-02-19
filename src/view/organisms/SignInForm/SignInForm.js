import React from "react";

import PasswordSignInForm from "./PasswordSignInForm.js";
import SingleSignOnForm from "./SingleSignOnForm.js";

import style from "./style.scss";


export default function SignInForm(props) {
    return (
        <div className={props.style}>
            <PasswordSignInForm style={style.password_sign_in_form}></PasswordSignInForm>
            <SingleSignOnForm style={style.sso_form}></SingleSignOnForm>
        </div>
    );
}
