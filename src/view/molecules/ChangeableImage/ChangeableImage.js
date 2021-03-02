import React, { useRef, useState, useEffect } from "react";

import Img from "src/view/atoms/Img.js";
import BorderingLabel from "src/view/atoms/BorderingLabel/BorderingLabel.js";

import style from "./style.scss";
import BasicFileSelectButton from "src/view/atoms/BasicFileSelectButton";

//選択が終わったらonChange propを呼ぶ
export default function ChangeableImage(props) {
    const imgRef = useRef(null);
    const fileRef = useRef(null);
    const {onChange, ...others} = props;

    const translation = dom => {
        const rect = imgRef.current.getBoundingClientRect();
        const labelRect = dom.getBoundingClientRect();
        dom.style.top = `${(rect.height/2 - labelRect.height/2)}px`;
        dom.style.left = `${(rect.width/2 - labelRect.width/2)}px`;
    }

    const selectFile = (e) => {
        props.onChange(e);
    }

    const c = "+";
    return (
        <div className={style.changeable_image_area}>
            <BasicFileSelectButton ref={fileRef} className={style.file_input} onChange={selectFile} accept="image/*"/>
            <Img ref={imgRef} {...others}/>
            <BorderingLabel onClick={(e) => fileRef.current.click()} labelTranslation={translation} className={style.changeable_icon} text={c} fontSize="4em"/>
        </div>
    )
}