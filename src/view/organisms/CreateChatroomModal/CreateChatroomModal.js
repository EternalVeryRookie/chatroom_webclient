import React, {useState} from "react";
import BasicTextArea from "src/view/atoms/BasicTextArea";
import BasicTextbox from "src/view/atoms/BasicTextbox";
import Label from "src/view/atoms/Label";
import BasicArea from "src/view/atoms/BasicArea";

import PopUp from "src/view/molecules/PopUp/PopUp.js";
import ShowCreateChatroomPopUpButton from "src/view/molecules/ShowCreateChatroomPopUpButton/ShowCreateChatroomPopUpButton.js";

import style from "./style.scss";

/**
 * ・ルーム名
 * ・public or private
 * ・カバー画像
 * ・ルームの説明
 * @param {*} props 
 */
function CreateChatroomModalContent(props) {

    return (
        <BasicArea className={style.create_chatroom_modal}>
            <BasicArea className={style.header}>
               <Label className={style.title}>ルームを作成する</Label>
               <Label>×</Label>
            </BasicArea>
            <BasicArea className={style.content}>
                <BasicTextbox className={style.room_name_textbox} placeholder="ルーム名"/>
                <BasicTextArea className={style.room_descriptioin_textarea} placeholder="説明"/>
                <input type="checkbox" value="public"/>
                <input type="file"/>
                <input type="button" value="作成"/>
            </BasicArea>
        </BasicArea>
    );
}


export default function CreateChatroomModal(props) {
    const [isShow, setIsShow] = useState(false);

    return (
        <>
        <ShowCreateChatroomPopUpButton onClick={() => setIsShow(true)}/>
        {
            isShow?
                <PopUp>
                    <CreateChatroomModalContent/>
                </PopUp>: 
                null
        }
        </>
    );
}