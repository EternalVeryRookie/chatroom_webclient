import React, { useState } from "react";

import style from "./style.scss";

export default function ShowCreateChatroomPopUpButton(props) {
    const [isShowPopUp, setIsShowPopUp] = useState(false);

    return (
        <div className={props.placementStyle}>
            <a className={style.show_create_chatroom_pop_up_button} onClick={(evt) => console.log(true)}>
                ルーム作成
            </a>
        </div>
    );
}