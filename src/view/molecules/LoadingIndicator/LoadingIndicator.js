import React from "react";

import BasicArea from "src/view/atoms/BasicArea.js";

import style from "./style.scss";

export default function LoadingIndicator(props) {
    return (
        <BasicArea className={style.load8}>
            <BasicArea className={style.loader}></BasicArea>
        </BasicArea>
    );
}