import React from "react";
import {Link} from "react-router-dom"

import Label from "src/view/atoms/Label.js"

import style from "../NavigatorCommonStyle.scss";

export default function JoiningRoomsNavigator(pros) {
    return (
        <Link to="/joiningrooms">
            <Label className={style.navigator_common_style}>参加中ルーム</Label>
        </Link>
    );
}