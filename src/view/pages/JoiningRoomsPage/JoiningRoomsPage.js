import React, {useContext} from "react";
import {Redirect} from "react-router-dom";

import {userContext} from "src/user.js";
import {JoiningChatroomEntrancies} from "src/view/organisms/ChatroomEntrance/ChatroomEntrancies.js";
import LeftNavigationBarLayout from "src/view/templates/LeftNavigationBarLayout/LeftNavigationBarLayout.js";

import style from "./style.scss";


export default function JoiningRoomsPage(props) {
    const userCtx = useContext(userContext);

    if (userCtx.currentUser === null)
        return <Redirect to="/"/>

    return (
        <LeftNavigationBarLayout>
            <div className={style.top_page_style}>
                <JoiningChatroomEntrancies className={style.entrances}/>
            </div>
        </LeftNavigationBarLayout>
    );
}