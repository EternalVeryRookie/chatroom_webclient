import React, {useRef, useEffect} from "react";
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton.js";
import BasicArea from "src/view/atoms/BasicArea.js";

import style from "./style.scss";


/** 
 * @param {object} props
 * @param {string} props.cropAreaWidthRatio クロップするエリアの横幅（比率）
 * @param {string} props.cropAreaHeightRatio クロップするエリアの縦幅（比率）
 * @param {string} props.imgUrl 表示する画像のURL
 * @param {function(string)} props.onCrop クロップ完了時のコールバック関数
 * @param {function(event)} props.cancelCrop クロップキャンセル時のコールバック関数
 * @param {string} props.className クロップ対象画像のスタイルを指定するためのクラス名
 */
export default function CropImage(props) {
    const cropImgRef = useRef(null);
    const cropButton = useRef(null);
    
    useEffect(() => {
        const bosuu = props.cropAreaWidthRatio + props.cropAreaHeightRatio;

        const crop = new Croppie(
            cropImgRef.current,  
            {
                viewport: {
                    width: props.cropAreaWidthRatio * cropImgRef.current.clientWidth / bosuu,
                    height: props.cropAreaHeightRatio * cropImgRef.current.clientWidth / bosuu,
                },
                boundary: {
                    width: cropImgRef.current.clientWidth,
                    height: cropImgRef.current.clientHeight
                }
            }
        );
        
        crop.bind({
            url: props.imgUrl,
        });

        cropButton.current.onclick = e => 
            crop.result("base64").then((blob) => props.onCrop(blob));
    });

    return (
        <BasicArea className={style.cropping_area}>
            <BasicArea className={style.button_area}>
                <BasicSubmitButton onClick={props.cancelCrop} value="キャンセル"></BasicSubmitButton>
                <BasicSubmitButton ref={cropButton} value="保存"></BasicSubmitButton>
            </BasicArea>
            <BasicArea ref={cropImgRef} className={props.className}></BasicArea>
        </BasicArea>
    )
}
