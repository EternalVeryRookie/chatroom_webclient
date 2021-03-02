import React, {useEffect, useRef, useState, useContext} from "react";

import BasicArea from "src/view/atoms/BasicArea.js";
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton";
import ChangeableCoverImage from "src/view/organisms/ChangeableCoverImage/ChangeableCoverImage.js";
import ChangeableIcon from "src/view/organisms/ChangeableIcon/ChangeableIcon.js";
import PopUp from "src/view/molecules/PopUp/PopUp.js";
import Label from "src/view/atoms/Label";
import {userContext} from "src/user.js";

import {useEditUserProfile} from "src/backend/chatapp/mutation.js";

import style from "./style.scss";

export default function EditProfilePopUp(props) {
    const userCtx = useContext(userContext);
    const [isHidden, setIsHidden] = useState(true);
    const [username, setUserName] = useState(userCtx.currentUser.name);
    const [selfIntroduction, setSelfIntroduction] = useState(props.initSelfIntroduction);
    const [icon, setIcon] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const edit = useEditUserProfile();

    const onClick = (evt) => setIsHidden(false);
    const onClickSaveButton = async evt => {
        const newSelfIntroduction = (selfIntroduction == props.initSelfIntroduction)
                                    ? null: selfIntroduction;
        const newUserName = (username == userCtx.currentUser.name)
                                    ? null: username;

        try{
            await edit(icon, coverImage, newSelfIntroduction, newUserName);
            setIsHidden(true);
        }catch (err) {
            alert(err[0].username);
        }
    }

    return (<>
            {props.btnRender(onClick)}
            {
                isHidden? 
                <></>
              : <PopUp className={style.popup_content}>
                    <BasicArea className={style.pop_up_header}>     
                        <BasicArea className={style.close_btn_and_tilte}>
                            <BasicSubmitButton value="×" className={style.closeBtn} onClick={() => setIsHidden(true)}/>           
                            <Label className={style.title}>プロフィール変更</Label>
                        </BasicArea>
                        <BasicSubmitButton className={style.save_btn} value="保存" onClick={onClickSaveButton}/>
                    </BasicArea>
                    <ChangeableCoverImage onSet={setCoverImage} className={style.cover_image} src={props.coverImageSrc}></ChangeableCoverImage>
                    <BasicArea className={style.profile_detail_area}>
                        <ChangeableIcon onSet={setIcon} className={style.icon} src={props.iconImageSrc}></ChangeableIcon>
                        <Label>ユーザー名変更</Label>
                        <input type="text" value={username} onChange={(evt) => setUserName(evt.target.value)} placeholder="ユーザー名変更"/>
                        <Label>自己紹介編集</Label>
                        <input value={selfIntroduction} onChange={(evt) => setSelfIntroduction(evt.target.value)} type="text" placeholder="プロフィール変更"/>
                    </BasicArea>
                </PopUp>
            }
            </>
    );
}