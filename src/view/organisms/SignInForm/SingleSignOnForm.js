import React from "react";

import GoogleSignInButton from "src/view/molecules/GoogleSignInButton";

import style from "./style.scss";

export default function SingleSignOnForm(props) {
    return (
        <div className={props.style}>
            <p>他サービスのアカウントでサインインする</p>
            <GoogleSignInButton className={style.google_sign_in_btn}></GoogleSignInButton>
        </div>
    );
}


SingleSignOnForm.defaultProps = {
    style: style.sso_form
}