import React, { useState } from "react";

import profile from "assets/profile/user.json";

import ChangeableImage from "src/view/molecules/ChangeableImage/ChangeableImage.js";
import PopUp from "src/view/molecules/PopUp/PopUp.js";
import CropImage from "src/view/molecules/CropImage/CropImage.js";
import BasicArea from "src/view/atoms/BasicArea.js"

import style from "./style.scss";


export default function ChangeableIcon(props) {
    const {src, onSet, placementStyle} = props;
    const [imgSrc, setImgSrc] = useState(null);
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
                            cropAreaWidthRatio={profile["icon"]["sizeRatio"]["width"]} 
                            cropAreaHeightRatio={profile["icon"]["sizeRatio"]["height"]} 
                            imgUrl={selectImg}
                            onCrop={(blob) => {
                                setSelectImg(null);
                                setImgSrc(URL.createObjectURL(blob));
                                onSet(blob);
                            }}
                            cancelCrop={() => setSelectImg(null)}
                            className={style.cropping_icon_image}
                        />
                    </PopUp>
                : null
            }
            <BasicArea className={placementStyle}>
                <ChangeableImage onChange={onChange} src={imgSrc? imgSrc: src} className={style.icon_image}/>
            </BasicArea>
        </>
    )
}

ChangeableIcon.defaultProps = {
    onSet: image => null
}