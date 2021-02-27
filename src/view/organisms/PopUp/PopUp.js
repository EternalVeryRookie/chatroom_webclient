import React, {useEffect, useRef, useState, useContext} from "react";

import BasicArea from "src/view/atoms/BasicArea.js"
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton";
import ChangeableCoverImage from "src/view/organisms/ChangeableCoverImage/ChangeableCoverImage.js"
import ChangeableIcon from "src/view/organisms/ChangeableIcon/ChangeableIcon.js"
import PopUp from "src/view/molecules/PopUp/PopUp.js"
import Label from "src/view/atoms/Label";
import {userContext} from "src/user.js";

import style from "./style.scss";

export default function EditProfilePopUp(props) {
    const [isHidden, setIsHidden] = useState(true);
    const userCtx = useContext(userContext);

    const onClick = (evt) => setIsHidden(false);
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
                        <BasicSubmitButton className={style.save_btn} value="保存" onClick={() => setIsHidden(true)}/>
                    </BasicArea>
                    <ChangeableCoverImage className={style.cover_image} src={props.coverImageSrc}></ChangeableCoverImage>
                    <BasicArea className={style.profile_detail_area}>
                        <ChangeableIcon className={style.icon} src={props.iconImageSrc}></ChangeableIcon>
                        <Label>ユーザー名変更</Label>
                        <input type="text" value={userCtx.currentUser.name} placeholder="ユーザー名変更"/>
                        <Label>自己紹介編集</Label>
                        <input type="text" placeholder="プロフィール変更"/>
                    </BasicArea>
                </PopUp>
            }
            </>
    );
}