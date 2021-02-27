import React from "react";

import BasicArea from "src/view/atoms/BasicArea.js"

import style from "./style.scss";

export default function PopUp(props) {
    return (
        <BasicArea className={style.pop_up}>
            <BasicArea className={style.pop_up_content}>
                <BasicArea className={props.className}>
                    {props.children}
                </BasicArea>
            </BasicArea>
        </BasicArea>
    )
}