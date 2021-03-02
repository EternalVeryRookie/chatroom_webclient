import React from "react";

import NavigationBar from "src/view/organisms/NavigationBar/NavigationBar.js"

import style from "./style.scss";

export default function LeftNavigationBarLayout(props) {
    return (
        <div className={style.page_layout}>
            <div className={style.navigation_bar_layout}>
                <NavigationBar/>
            </div>
            <div className={style.content}>
                {props.children}
            </div>
        </div>
    )
}