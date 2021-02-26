import React from "react";
import {Link} from "react-router-dom"

import Label from "src/view/atoms/Label.js"

import style from "../NavigatorCommonStyle.scss";

export default function ProfileNavigator(pros) {
    return (
        <Link to="/userprofile">
            <Label className={style.navigator_common_style}>プロフィール</Label>
        </Link>
    );
}