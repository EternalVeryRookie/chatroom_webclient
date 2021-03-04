import React from "react";

import BasicArea from "src/view/atoms/BasicArea.js";
import Img from "src/view/atoms/Img.js";

import style from "./style.scss";


const UserIcon = React.forwardRef((props, ref)=> {
    const {src, placementStyle, ...others} = props;

    return (
        <BasicArea className={placementStyle}>
            <Img ref={ref} className={style.icon_image} src={src} {...others}></Img>
        </BasicArea>
    );
});

export default UserIcon;
