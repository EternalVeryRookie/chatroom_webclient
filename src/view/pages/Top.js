import React, { useContext, useState } from "react";

import SignInForm from "src/view/organisms/SignInForm/SignInForm.js";
import WelcomeUser from "src/view/molecules/WelcomeUser.js";
import Header from "src/view/organisms/Header/Header.js";
import {PublicChatroomEntrance, PrivateChatroomEntrance} from "src/view/organisms/ChatroomEntrance/ChatroomEntrance.js";
import ChatroomEntrancies from "src/view/organisms/ChatroomEntrance/ChatroomEntrancies.js"
import {useRecommendPublicRooms, useCurrentUserJoinedPublicChatroom, useCurrentUserJoinedPrivateChatroom} from "src/backend/chatapp/query.js"
import {userContext} from "src/user.js";

import style from "./style.scss";
import Label from "../atoms/Label";


export default function Top(props) {
    const userCtx = useContext(userContext);

    const loadingCallback = () => null;
    const errorCallback = (msg) => alert(msg);
    const recommendPublicRooms = useRecommendPublicRooms(loadingCallback, errorCallback);
    const privateRooms = useCurrentUserJoinedPrivateChatroom(loadingCallback, errorCallback);
    const joinedPublicRooms = useCurrentUserJoinedPublicChatroom(loadingCallback, errorCallback);

    const RecommendPublicRoomEntrancies = recommendPublicRooms !== null ?
        () =>
        recommendPublicRooms.edges.length === 0? 
            <Label>参加可能なチャットが存在しません</Label>: 
            <ChatroomEntrancies>
                {
                    recommendPublicRooms.edges.map(d => {
                        return <PublicChatroomEntrance key={d.node.id} roomId={d.node.id} roomCreator={d.node.createUser.username} roomName={d.node.roomName} roomDescription="description"/>
                    })
                }
            </ChatroomEntrancies> 
        : "loading";

    
        const JoinedRoomEntrancies =
            (privateRooms && joinedPublicRooms)? 
                ()=> {
                        const Entrance = privateRooms.edges.map(d => 
                                <PrivateChatroomEntrance key={d.node.id} roomId={d.node.id} roomCreator={d.node.createUser.username} roomName={d.node.roomName} roomDescription="description"/>
                            ).concat(joinedPublicRooms.edges.map(d => 
                                <PublicChatroomEntrance key={d.node.id} roomId={d.node.id} roomCreator={d.node.createUser.username} roomName={d.node.roomName} roomDescription="description"/>
                            )
                        );

                        return Entrance.length === 0? <Label>参加しているチャットが存在しません</Label>:
                            <ChatroomEntrancies>
                                {Entrance}
                            </ChatroomEntrancies>
                    }
                :"loading"

    return (
        <>
            <Header/>
            <div className={style.top_page_style}>
                {userCtx.currentUser ? <WelcomeUser/>:  <SignInForm style={style.sign_in_form__top_page}/>}
                <Label>ルームを探す</Label>
                <Label>参加中のチャット一覧</Label>
                <JoinedRoomEntrancies/>
                主要publicチャット一覧<br></br>
                <RecommendPublicRoomEntrancies/>
            </div>
        </>
    )
}