import React, { useState, useContext, useEffect, useRef } from "react";
import {Redirect} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";

import {userContext, User} from "src/user.js";
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton";
import BasicArea from "src/view/atoms/BasicArea.js";
import EditProfilePopUp from "src/view/organisms/EditProfilePopUp/EditProfilePopUp.js";
import Label from "src/view/atoms/Label";
import Img from "src/view/atoms/Img";
import LeftNavigationBarLayout from "src/view/templates/LeftNavigationBarLayout/LeftNavigationBarLayout.js"

import style from "./style.scss";


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
    const [newSelfIntroduction, setNewSelfIntroduction] = useState(null);
    const [newIcon, setNewIcon] = useState(null);
    const [newCoverImage, setNewCoverImage] = useState(null);
    
    const userCtx = useContext(userContext);

    if (userCtx.currentUser == null)
        return <Redirect to="/"/>

    const onSave = (icon, coverImage, userName, selfIntroduction) => {
        if (userName) {
            const currentUser = userCtx.currentUser;
            const newUser = new User(userName, currentUser.email, currentUser.id);
            userCtx.signIn(newUser);
        }
        if (icon)
            setNewIcon(URL.createObjectURL(icon));

        if (coverImage)
            setNewCoverImage(URL.createObjectURL(coverImage));

        if (selfIntroduction)
            setNewSelfIntroduction(selfIntroduction);
    }
    
    const Content = (
        <BasicArea className={style.user_profile_page}>
            <Img src={newCoverImage? newCoverImage: data?.currentUserProfile.coverImage} className={style.cover_image}/>
            <ProfileDetail
                username={userCtx.currentUser.name}
                selfIntroduction={newSelfIntroduction? newSelfIntroduction : data?.currentUserProfile.selfIntroduction}
                icon={newIcon? newIcon: data?.currentUserProfile.icon}
                coverImage={newCoverImage? newCoverImage: data?.currentUserProfile.coverImage}
                onSave={onSave}
            />
        </BasicArea>
    );

    return (
        <LeftNavigationBarLayout>
            {loading? <div>"loading..."</div>: Content}
        </LeftNavigationBarLayout>
    )
}

function ProfileDetail(props) {
    const [isHidePopUp, setIsHidePopUp] = useState(true);

    return (
        <BasicArea className={style.profile_detail}>
            <BasicArea className={style.user_profile_page_middle_area}>
                <img src={props.icon} className={style.icon_image}/>         
                <BasicSubmitButton value="プロフィール変更ボタン" className={style.profile_change_btn} onClick={(evt) => setIsHidePopUp(false)}/>
                { isHidePopUp? 
                    null: 
                    <EditProfilePopUp
                        initSelfIntroduction={props.selfIntroduction}
                        iconImageSrc={props.icon}
                        coverImageSrc={props.coverImage}
                        onClose={() => setIsHidePopUp(true)}
                        onSave={props.onSave}
                    />
                }
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