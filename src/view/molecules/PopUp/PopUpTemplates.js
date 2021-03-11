import React from "react";

import BasicArea from "src/view/atoms/BasicArea.js";
import Label from "src/view/atoms/Label.js";
import PopUp from "./PopUp.js";

import style from "./style.scss";

/**
 * ユーザーに何か入力を促すタイプのポップアップのテンプレート
 * 左上にタイトル、右上に閉じるボタン、右下に確定ボタンを配置する
 * @param {*} props 
 */
export function UserInputPopUp(props) {
    const {headerTitle, onCloseBtnClick, onCommitBtnClick, commitBtnText, isAlign} = props;

    return (
        <PopUp className={style.user_input_pop_up}>
            <BasicArea className={style.user_input_pop_up_header}>
                <Label className={style.user_input_pop_up_header_text}>{headerTitle}</Label>
                <a className={style.user_input_pop_up_header_close_btn} onClick={onCloseBtnClick}>×</a>
            </BasicArea>
            <BasicArea className={isAlign? style.user_input_pop_up_auto_align_content: ""}>
                {props.children}
            </BasicArea>
            <BasicArea className={style.user_input_pop_up_hooter}>
                <input type="button" onClick={onCommitBtnClick} value={commitBtnText}/>
            </BasicArea>
        </PopUp>
    );
}