import React, {useEffect, useRef, useState, useContext} from "react";

import BasicArea from "src/view/atoms/BasicArea.js";
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton";
import BasicTextArea from "src/view/atoms/BasicTextArea.js";
import ChangeableCoverImage from "src/view/molecules/UserCoverImage/ChangeableCoverImage.js";
import ChangeableIcon from "src/view/molecules/UserIcon/ChangeableIcon.js";
import PopUp from "src/view/molecules/PopUp/PopUp.js";
import Label from "src/view/atoms/Label";
import {userContext} from "src/user.js";

import {useEditUserProfile} from "src/backend/chatapp/mutation.js";

import style from "./style.scss";
import BasicTextbox from "src/view/atoms/BasicTextbox";
import { object } from "prop-types";

export default function EditProfilePopUp(props) {
    const userCtx = useContext(userContext);
    const [username, setUserName] = useState(userCtx.currentUser.name);
    const [selfIntroduction, setSelfIntroduction] = useState(props.initSelfIntroduction);
    const [icon, setIcon] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const edit = useEditUserProfile();

    const onClickSaveButton = async evt => {
        const newSelfIntroduction = (selfIntroduction == props.initSelfIntroduction)
                                    ? null: selfIntroduction;
        const newUserName = (username == userCtx.currentUser.name)
                                    ? null: username;

        try{
            await edit(icon, coverImage, newSelfIntroduction, newUserName);
            props.onSave(icon, coverImage, username, selfIntroduction);
            props.onClose();
        }catch (err) {
            alert(Object.keys(err).reduce((prev, key) => prev + `${key}: ${err[key]}\n`, ""));
        }
    }

    return (<>
                <PopUp className={style.popup_content}>
                    <BasicArea className={style.pop_up_header}>     
                        <BasicArea className={style.close_btn_and_tilte}>
                            <BasicSubmitButton value="×" className={style.closeBtn} onClick={props.onClose}/>           
                            <Label className={style.title}>プロフィール変更</Label>
                        </BasicArea>
                        <BasicSubmitButton className={style.save_btn} value="保存" onClick={onClickSaveButton}/>
                    </BasicArea>
                    <ChangeableCoverImage onSet={setCoverImage} placementStyle={style.cover_image_area} src={props.coverImageSrc}></ChangeableCoverImage>
                    <BasicArea className={style.profile_detail_area}>
                        <ChangeableIcon onSet={setIcon} placementStyle={style.icon_area} src={props.iconImageSrc}/>
                        <Label>ユーザー名変更</Label>
                        <BasicTextbox type="text" value={username} onChange={(evt) => setUserName(evt.target.value)} placeholder="ユーザー名変更"/>
                        <Label>自己紹介編集</Label>
                        <BasicTextArea className={style.edit_self_introduction_area} value={selfIntroduction} onChange={(evt) => setSelfIntroduction(evt.target.value)} type="text" placeholder="プロフィール変更"/>
                    </BasicArea>
                </PopUp>
            </>
    );
}