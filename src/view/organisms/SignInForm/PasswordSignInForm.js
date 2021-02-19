import React, { useRef } from "react";

import BasicTextbox from "src/view/atoms/BasicTextbox.js";
import BasicPasswordTextbox from "src/view/atoms/BasicPasswordTextbox.js";
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton.js";
import {usePasswordSignIn} from "src/backend/user/auth.js"

import style from "./style.scss";


export default function PasswordSignInForm(props) {
    const signIn = usePasswordSignIn();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onClick = async (evt) => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signIn(email, password);
    }

    return (
        <div className={props.style}>
            <BasicTextbox className={style.username_textbox} placeholder={"メールアドレス"} ref={emailRef}></BasicTextbox>
            <BasicPasswordTextbox className={style.password_textbox} placeholder={"パスワード"} ref={passwordRef}></BasicPasswordTextbox>
            <BasicSubmitButton className={style.sign_in_btn} value="サインイン" onClick={onClick}></BasicSubmitButton>
        </div>
    )
}