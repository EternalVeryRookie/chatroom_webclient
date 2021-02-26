import React from "react";
import {Link} from "react-router-dom"

import Label from "src/view/atoms/Label.js"

import style from "../NavigatorCommonStyle.scss";

export default function EntranceNavigator(pros) {
    return (
        <Link to="/">
            <Label className={style.navigator_common_style}>エントランス</Label>
        </Link>
    );
}