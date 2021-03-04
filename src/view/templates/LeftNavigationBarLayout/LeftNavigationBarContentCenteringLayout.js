import React from "react";

import LeftNavigationBarLayout from "./LeftNavigationBarLayout.js";

import style from "./style.scss";

//コンテンツの右側に空白の領域を差し込むことで、コンテンツが画面のちょうど真ん中にくるようにする
export default function LeftNavigationBarContentCenteringLayout(props) {
    return (
        <LeftNavigationBarLayout>
            {props.children}
            <div className={style.yohaku}/>
        </LeftNavigationBarLayout>
    );
}