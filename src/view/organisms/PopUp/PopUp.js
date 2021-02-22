import React, {useState} from "react";

import BasicArea from "src/view/atoms/BasicArea.js"
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton";

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
                        <input type="text" placeholder="ユーザー名変更"/>
                        <input type="text" placeholder="プロフィール変更"/>
                        <BasicSubmitButton value="キャンセル" onClick={() => setIsHidden(true)}/>
                        <BasicSubmitButton value="保存" onClick={() => setIsHidden(true)}/>
                    </div>
                </BasicArea>
            }
            </>
    );
}