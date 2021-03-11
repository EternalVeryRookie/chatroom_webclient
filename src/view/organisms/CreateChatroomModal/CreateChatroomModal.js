import React, {useState} from "react";
import BasicTextArea from "src/view/atoms/BasicTextArea";
import BasicTextbox from "src/view/atoms/BasicTextbox";
import Label from "src/view/atoms/Label";
import BasicArea from "src/view/atoms/BasicArea";

import {UserInputPopUp} from "src/view/molecules/PopUp/PopUpTemplates.js";
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
        <BasicArea className={style.content}>
            <input type="file"/>
            <BasicTextbox className={style.room_name_textbox} placeholder="ルーム名"/>
            <BasicTextArea className={style.room_description_textarea} placeholder="説明"/>
            <input type="checkbox" value="public"/>
        </BasicArea>
    );
}


export default function CreateChatroomModal(props) {
    const [isShow, setIsShow] = useState(false);

    const onCreateBtnClick = evt => {
        setIsShow(false);
    }

    return (
        <>
        <ShowCreateChatroomPopUpButton onClick={() => setIsShow(true)}/>
        {
            isShow?
                <UserInputPopUp isAlign={true} headerTitle={"ルームを作成する"} commitBtnText="作成" onCloseBtnClick={evt => setIsShow(false)} onCommitBtnClick={onCreateBtnClick}>
                    <CreateChatroomModalContent/>
                </UserInputPopUp>: 
                null
        }
        </>
    );
}