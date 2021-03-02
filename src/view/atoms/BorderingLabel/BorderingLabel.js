import React, { useRef, useEffect } from "react";

import Label from "../Label.js";

import style from "./style.scss";

//ラベルがマウントされた後でラベルを移動させたい場合は、labelTranslationプロップを利用する
//親コンポーネントで移動すると、ふちをつけてからラベルが移動することになるため、意図しない表示になる
export default React.forwardRef((props, ref) => {
    const {labelTranslation, className, text, fontSize, ...others} = props;

    const topBorder = useRef(null);
    const bottomBorder = useRef(null);
    const leftBorder = useRef(null);
    const rightBorder = useRef(null);
    const topRightBorder = useRef(null);
    const bottomRightBorder = useRef(null);
    const topLeftBorder = useRef(null);
    const bottomLeftBorder = useRef(null);
    const textRef = useRef(null);
    const txtRef = ref? ref: textRef;

    const borders = [
        topBorder,
        bottomBorder,
        leftBorder,
        rightBorder,
        topRightBorder, 
        bottomRightBorder,
        topLeftBorder,
        bottomLeftBorder,
    ]
    
    useEffect(() => {

        txtRef.current.style["font-size"] = fontSize;
        labelTranslation(txtRef.current);

        borders.forEach(border => {
            border.current.style.top = txtRef.current.style.top;
            border.current.style.left = txtRef.current.style.left;
            border.current.style["font-size"] = fontSize;
        });

        const adjustmentBorderPosition = evt => {
            labelTranslation(txtRef.current);
    
            borders.forEach(border => {
                border.current.style.top = txtRef.current.style.top;
                border.current.style.left = txtRef.current.style.left;
            });
        }

        window.addEventListener("resize", adjustmentBorderPosition);

        return () => window.removeEventListener("resize", adjustmentBorderPosition)
    });

    return (
        <>
            <Label ref={ref? ref: textRef} className={className} {...others}>{text}</Label>
            <Label ref={topBorder} className={style.shadow_top} onClick={(e) => console.log(e)}>{text}</Label>
            <Label ref={bottomBorder} className={style.shadow_bottom} onClick={(e) => console.log(e)}>{text}</Label>
            <Label ref={leftBorder} className={style.shadow_left} onClick={(e) => console.log(e)}>{text}</Label>
            <Label ref={rightBorder} className={style.shadow_right} onClick={(e) => console.log(e)}>{text}</Label>
            <Label ref={topRightBorder} className={style.shadow_top_right} onClick={(e) => console.log(e)}>{text}</Label>
            <Label ref={bottomRightBorder} className={style.shadow_bottom_right} onClick={(e) => console.log(e)}>{text}</Label>
            <Label ref={topLeftBorder} className={style.shadow_top_left} onClick={(e) => console.log(e)}>{text}</Label>
            <Label ref={bottomLeftBorder} className={style.shadow_bottom_left} onClick={(e) => console.log(e)}>{text}</Label>
        </>
    )
});