import React, { useContext, useRef } from "react";
import {Redirect} from "react-router-dom"
import {gql, useMutation, useQuery} from "@apollo/client";

import {userContext} from "src/user.js";
import BasicSubmitButton from "src/view/atoms/BasicSubmitButton";
import PopUp from "src/view/organisms/PopUp/PopUp.js";
import Label from "src/view/atoms/Label";
import BasicFileSelectButton from "src/view/atoms/BasicFileSelectButton.js";

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
    const [mutate] = useMutation(MUTATION);
    const { loading, error, data } = useQuery(QUERY);
    const coverImageRef = useRef(null);
    
    const userCtx = useContext(userContext);
    const onSelectFile = (evt) => {
        const file =  evt.target.files[0];
        if (evt.target.validity.valid){
            mutate({ variables: {icon: file, self_introduction: null, cover_image: null} }).then(response => console.log(response)).catch(err => alert(err));
        }
    }

    if (userCtx.currentUser == null)
        return <Redirect to="/"/>

    if (data) {
        coverImageRef.current.src = data.currentUserProfile.coverImage;
        new Croppie(coverImageRef.current, {viewport: {
            width: 200,
            height: 200
            },
            boundary: {
            width: 300,
            height: 300
            }});
    }

    const longChar = () =>{
        let s = ""
        for (let i = 0; i < 100; i++)
            s += "サンプル"
        return s;
    }

    return (
        <div className={style.user_profile_page}>
                <img ref={coverImageRef} className={style.cover_image}/>
            <div className={style.user_profile_page_middle_area}>
                {data? <img className={style.icon_image} src={data.currentUserProfile.icon}/>: null}
                <div className={style.user_profile_page_textarea}>
                    <PopUp cover={data? <img className={style.cover_image} src={data.currentUserProfile.coverImage}/>: null} btnRender={onClick => <BasicSubmitButton value="プロフィール変更ボタン" className={style.profile_change_btn} onClick={onClick}/>}/>
                    <Label>{userCtx.currentUser.name}</Label>
                    <Label>{longChar()}</Label>
                </div>
            </div>
        </div>
    )
}