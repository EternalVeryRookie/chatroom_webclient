import React from "react";

import GoogleBtnImage from "assets/google_signin_buttons/web/2x/btn_google_signin_dark_normal_web@2x.png";
import {useGoogleSignIn} from "src/backend/user/auth.js"

import style from "./style.scss";

// ボタンを押すと別タブが開きGoogle認証が開始される
export default function GoogleSignInButton(props) {
    const sso = useGoogleSignIn();
    const onClick = async () => {
        const result = await sso();
        location.href = result.data.singleSignOn.redirectUrl;
    }

    return (
        <img className={props.style} src={GoogleBtnImage} onClick={onClick}/>
    );
}
 
GoogleSignInButton.defaultProps = {
    style: style.google_sign_in_btn__default
}