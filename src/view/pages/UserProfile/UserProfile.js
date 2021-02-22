import React, { useContext, useState } from "react";
import {Link, Redirect} from "react-router-dom"

import {userContext} from "src/user.js";
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton";
import PopUp from "src/view/organisms/PopUp/PopUp.js";
import Label from "src/view/atoms/Label";

import style from "./style.scss";

export default function UserProfile(props) {
    const [showPopUp, setShowPopUp] = useState(false);
    const userCtx = useContext(userContext);


    if (userCtx.currentUser == null)
        return <Redirect to="/"/>

    return (
        <div className={style.user_profile_page}>
                <Label>カバー画像</Label>
            <div className={style.user_profile_page_middle_area}>
                <Label>アイコン</Label>
                <div className={style.user_profile_page_textarea}>
                    <Label>{userCtx.currentUser.name}</Label>
                    <Label>{"ユーザー自己紹介は未実装"}</Label>
                    <PopUp btnRender={onClick => <BasicSubmitButton value="プロフィール変更ボタン" className={style.profile_change_btn} onClick={onClick}/>}/>
                </div>
            </div>
        </div>
    )
}