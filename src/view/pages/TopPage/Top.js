import React, { useContext } from "react";

import SignInForm from "src/view/organisms/SignInForm/SignInForm.js";
import WelcomeUser from "src/view/molecules/WelcomeUser.js";
import {AvailableJoinChatroomEntrancies} from "src/view/organisms/ChatroomEntrance/ChatroomEntrancies.js"
import {userContext} from "src/user.js";
import LeftNavigationBarLayout from "src/view/templates/LeftNavigationBarLayout/LeftNavigationBarLayout.js"

import style from "./style.scss";


export default function Top(props) {
    const userCtx = useContext(userContext);

    return (
        <LeftNavigationBarLayout>
            <div className={style.top_page_style}>
                {userCtx.currentUser ? <WelcomeUser/>:  <SignInForm style={style.sign_in_form__top_page}/>}
                <input placeholder="ルームを探す" type="text"></input>
                <div className={style.joined_chatroom_list}>
                    <AvailableJoinChatroomEntrancies className={style.entrances}/>
                </div>
            </div>
        </LeftNavigationBarLayout>
    )
}