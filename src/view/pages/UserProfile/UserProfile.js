import React, { useCallback, useContext, useEffect, useRef } from "react";
import {Redirect} from "react-router-dom"
import {gql, useQuery} from "@apollo/client";

import {userContext} from "src/user.js";
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton";
import BasicArea from "src/view/atoms/BasicArea.js";
import EditProfilePopUp from "src/view/organisms/EditProfilePopUp/EditProfilePopUp.js";
import Label from "src/view/atoms/Label";
import Img from "src/view/atoms/Img";
import LeftNavigationBarLayout from "src/view/templates/LeftNavigationBarLayout/LeftNavigationBarLayout.js"

import style from "./style.scss";

const MUTATION = gql`
  mutation($icon: Upload, $cover_image: Upload, $self_introduction: String) {
    editProfile(icon: $icon, coverImage: $cover_image, selfIntroduction: $self_introduction) {
      success
    }
  }
`;

const QUERY = gql`
    query{
        currentUserProfile{
            selfIntroduction
            icon
            coverImage
        }
    }
`;


export default function UserProfile(props) {
    const { loading, error, data } = useQuery(QUERY);
    const coverImageRef = useRef(null);
    const iconImageRef = useRef(null);
    
    const userCtx = useContext(userContext);

    if (userCtx.currentUser == null)
        return <Redirect to="/"/>

    useEffect(() => {
        if (data) {
            coverImageRef.current.src = data.currentUserProfile.coverImage;
            iconImageRef.current.src = data.currentUserProfile.icon;
        }
    });
    
    const Content = (
        <BasicArea className={style.user_profile_page}>
            <Img ref={coverImageRef} className={style.cover_image}/>
            <ProfileDetail
                username={userCtx.currentUser.name}
                selfIntroduction={data?.currentUserProfile.selfIntroduction}
                iconImageRef={iconImageRef}
                icon={data?.currentUserProfile.icon}
                coverImage={data?.currentUserProfile.coverImage}
            />
        </BasicArea>
    );

    return (
        <LeftNavigationBarLayout>
            {loading? "loading...": Content}
        </LeftNavigationBarLayout>
    )
}

function ProfileDetail(props) {
    return (
        <BasicArea className={style.profile_detail}>
            <BasicArea className={style.user_profile_page_middle_area}>
                <img ref={props.iconImageRef} className={style.icon_image}/>         
                <EditProfilePopUp 
                    initSelfIntroduction={props.selfIntroduction}
                    iconImageSrc={props.icon}
                    coverImageSrc={props.coverImage} 
                    btnRender={onClick => <BasicSubmitButton value="プロフィール変更ボタン" className={style.profile_change_btn} onClick={onClick}/>}
                />
            </BasicArea>
            <BasicArea className={style.user_profile_page_textarea}>
                <Label className={style.user_name}>{props.username}</Label>
                <BasicArea className={style.self_introduction_area}>
                    <Label>{props.selfIntroduction}</Label>
                </BasicArea>
            </BasicArea>
        </BasicArea>
    );
}