import React, { useState } from "react";

import setting from "assets/setting/user.json";

import ChangeableImage from "src/view/molecules/ChangeableImage/ChangeableImage.js";
import PopUp from "src/view/molecules/PopUp/PopUp.js";
import CropImage from "src/view/molecules/CropImage/CropImage.js";


import style from "./style.scss";


export default function ChangeableIcon(props) {
    const {src, onSet, ...others} = props;
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
                            cropAreaWidthRatio={setting["icon"]["sizeRatio"]["width"]} 
                            cropAreaHeightRatio={setting["icon"]["sizeRatio"]["height"]} 
                            imgUrl={selectImg}
                            onCrop={(blob) => {
                                setSelectImg(null);
                                setImgSrc(URL.createObjectURL(blob));
                                onSet(blob);
                            }} 
                            cancelCrop={() => setSelectImg(null)}
                            className={style.crop_img}
                        />
                    </PopUp>
                : null
            }
            <ChangeableImage onChange={onChange} src={imgSrc? imgSrc: src} {...others}/>
        </>
    )
}

ChangeableIcon.defaultProps = {
    onSet: image => null
}