import React, {useEffect, useRef, useState, useContext} from "react";

import BasicArea from "src/view/atoms/BasicArea.js"
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton";
import Label from "src/view/atoms/Label";
import {userContext} from "src/user.js";

import style from "./style.scss";

export default function PopUp(props) {
    const [isHidden, setIsHidden] = useState(true);
    const coverImageRef = useRef(null);
    const userCtx = useContext(userContext);

    /*
    useEffect(() => {
        if (coverImageRef.current === null) return ;
        new Croppie(coverImageRef.current, {viewport: {
            width: 200,
            height: 200
            },
            boundary: {
            width: 300,
            height: 300
            },
            customClass: style.cover_image
        });
    })
    */

    const onClick = (evt) => setIsHidden(false);
    return (<>
            {props.btnRender(onClick)}
            {
                isHidden? 
                <></>
              : <BasicArea className={style.popup}>
                    <div className={style.popup_content}>
                        <div className={style.pop_up_header}>     
                            <div className={style.close_btn_and_tilte}>
                                <BasicSubmitButton value="×" className={style.closeBtn} onClick={() => setIsHidden(true)}/>           
                                <Label className={style.title}>プロフィール変更</Label>
                            </div>
                            <BasicSubmitButton className={style.save_btn} value="保存" onClick={() => setIsHidden(true)}/>
                        </div>
                        <img className={style.cover_image} src={props.coverImageSrc} ref={coverImageRef}></img>
                        <div className={style.profile_detail_area}>
                            <img className={style.icon} src={props.iconImageSrc}></img>
                            <Label>ユーザー名変更</Label>
                            <input type="text" value={userCtx.currentUser.name} placeholder="ユーザー名変更"/>
                            <Label>自己紹介編集</Label>
                            <input type="text" placeholder="プロフィール変更"/>
                        </div>
                    </div>
                </BasicArea>
            }
            </>
    );
}