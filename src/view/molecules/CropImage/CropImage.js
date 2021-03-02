import React, {useRef, useEffect, useState} from "react";
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton.js";
import BasicArea from "src/view/atoms/BasicArea.js";

import style from "./style.scss";

function calcCroppieViewport(clientWidth, clientHeight, widthRatio, heightRatio) {
    // 少し間引かないと境界がはみ出る場合がある
    let croppieWidth = clientWidth - 5;
    let croppieHeight = heightRatio * croppieWidth / widthRatio;
    if (croppieHeight > clientHeight) {
        croppieHeight = clientHeight - 5;
        croppieWidth = widthRatio * croppieHeight / heightRatio;
    }

    return {croppieWidth, croppieHeight};
}


/** 
 * 画像クロップ用のUIを表示するコンポーネント
 * @param {object} props
 * @param {string} props.cropAreaWidthRatio クロップするエリアの横幅（比率）
 * @param {string} props.cropAreaHeightRatio クロップするエリアの縦幅（比率）
 * @param {string} props.imgUrl 表示する画像のURL
 * @param {function(string)} props.onCrop クロップ完了時のコールバック関数
 * @param {function(event)} props.cancelCrop クロップキャンセル時のコールバック関数
 * @param {string} props.className クロップ対象画像のスタイルを指定するためのクラス名
 * @param {number} props.maxZoom クロップする際の画像のズーム最大倍率
 */
export default function CropImage(props) {
    const cropImgRef = useRef(null);
    const cropButton = useRef(null);
    const [croppie, setCroppie] = useState(null);
    
    useEffect(() => {
        if (cropImgRef.current == null || cropButton.current == null || croppie != null) return;

        //viewportがdom要素の外側に行かないようにする
        const {croppieWidth, croppieHeight} = 
            calcCroppieViewport(
                cropImgRef.current.clientWidth, 
                cropImgRef.current.clientHeight, 
                props.cropAreaWidthRatio, 
                props.cropAreaHeightRatio
            );

        const crop = new Croppie(
            cropImgRef.current,  
            {
                viewport: {
                    width: croppieWidth,
                    height: croppieHeight,
                },
                maxZoom: props.maxZoom
            }
        );
        
        crop.bind({
            url: props.imgUrl,
        });

        setCroppie(crop);
        cropButton.current.onclick = e => {
            crop.result("blob").then(blob => {
                props.onCrop(blob);
            });
        }
    });

    return (
        <BasicArea className={style.cropping_area}>
            <BasicArea className={style.button_area}>
                <BasicSubmitButton onClick={props.cancelCrop} value="キャンセル"></BasicSubmitButton>
                <BasicSubmitButton ref={cropButton} value="保存"></BasicSubmitButton>
            </BasicArea>
            <BasicArea ref={cropImgRef} className={props.className}></BasicArea>
        </BasicArea>
    );
}

CropImage.defaultProps = {
    maxZoom: 10
}