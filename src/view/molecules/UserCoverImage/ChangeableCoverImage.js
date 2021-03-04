import React, { useState } from "react";

import setting from "assets/setting/user.json";

import ChangeableImage from "src/view/molecules/ChangeableImage/ChangeableImage.js";
import PopUp from "src/view/molecules/PopUp/PopUp.js";
import CropImage from "src/view/molecules/CropImage/CropImage.js";
import BasicArea from "src/view/atoms/BasicArea.js";

import style from "./style.scss";


export default function ChangeableCoverImage(props) {
    const {src, onSet, placementStyle} = props;
    const [changedImgSrc, setChangedImgSrc] = useState(null);
    const [selectImg, setSelectImg] = useState(null);

    const onChange = (e) =>{
        const selectFile = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            setSelectImg(reader.result);
        }, false);
        reader.readAsDataURL(selectFile);
    }
    
    return (
        <>
            {
                selectImg?
                    <PopUp className={style.crop_popup}>
                        <CropImage 
                            cropAreaWidthRatio={setting["coverImage"]["sizeRatio"]["width"]} 
                            cropAreaHeightRatio={setting["coverImage"]["sizeRatio"]["height"]} 
                            imgUrl={selectImg}
                            onCrop={(blob) => {
                                setSelectImg(null);
                                setChangedImgSrc(URL.createObjectURL(blob));
                                onSet(blob);
                            }} 
                            cancelCrop={() => setSelectImg(null)}
                            className={style.cropping_cover_img}
                        />
                    </PopUp>
                : null
            }
            <BasicArea className={placementStyle}>
                <ChangeableImage onChange={onChange} src={changedImgSrc? changedImgSrc: src} className={style.cover_image}/>
            </BasicArea>
        </>
    );
}