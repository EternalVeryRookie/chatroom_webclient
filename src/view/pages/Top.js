import React, { useContext, useState } from "react";

import SignInForm from "src/view/organisms/SignInForm/SignInForm.js";
import WelcomeUser from "src/view/molecules/WelcomeUser.js";
import Header from "src/view/organisms/Header/Header.js";
import {AvailableJoinChatroomEntrancies, JoiningChatroomEntrancies} from "src/view/organisms/ChatroomEntrance/ChatroomEntrancies.js"
import {userContext} from "src/user.js";

import style from "./style.scss";
import Label from "../atoms/Label";


export default function Top(props) {
    const userCtx = useContext(userContext);

    return (
        <>
            <Header/>
            <div className={style.top_page_style}>
                {userCtx.currentUser ? <WelcomeUser/>:  <SignInForm style={style.sign_in_form__top_page}/>}
                <input placeholder="ルームを探す" type="text"></input>
                <div className={style.chatroom_list}>
                    <div className={style.joined_chatroom_list}>
                        <Label>参加中のチャット一覧</Label>
                        <JoiningChatroomEntrancies className={style.entrances}/>
                    </div>
                    <div className={style.joined_chatroom_list}>
                        <Label>参加可能なチャット一覧</Label>
                        <AvailableJoinChatroomEntrancies className={style.entrances}/>
                    </div>
                </div>
            </div>
        </>
    )
}