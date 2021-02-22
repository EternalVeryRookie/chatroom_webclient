import React, {useState} from "react";

import BasicArea from "src/view/atoms/BasicArea.js"
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton";
import Label from "src/view/atoms/Label";

import style from "./style.scss";

export default function PopUp(props) {
    const [isHidden, setIsHidden] = useState(true);
    
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
                        <input type="text" placeholder="ユーザー名変更"/>
                        <input type="text" placeholder="プロフィール変更"/>
                    </div>
                </BasicArea>
            }
            </>
    );
}