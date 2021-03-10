import React from "react";

import BasicArea from "src/view/atoms/BasicArea.js";

import style from "./style.scss";

export default function ShowCreateChatroomPopUpButton(props) {
    const {placementStyle, ...others} = props;

    return (
        <BasicArea className={placementStyle}>
            <BasicArea className={style.background}>
                <BasicArea className={style.show_create_chatroom_pop_up_button} {...others}>
                    ルーム作成
                </BasicArea>
            </BasicArea>
        </BasicArea>
    );
}