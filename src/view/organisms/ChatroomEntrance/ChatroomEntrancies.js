import React from "react";

import {useRecommendPublicRooms, useCurrentUserJoinedPublicChatroom, useCurrentUserJoinedPrivateChatroom} from "src/backend/chatapp/query.js"
import {PublicChatroomEntrance, PrivateChatroomEntrance} from "./ChatroomEntrance.js";
import Label from "src/view/atoms/Label.js";

import style from "./style.scss";

//最後の行に空要素を詰めることで、最後の行だけ左詰めに見えるようにする
export function AvailableJoinChatroomEntrancies(props) {
    const loadingCallback = () => null;
    const errorCallback = (msg) => alert(msg);
    const recommendPublicRooms = useRecommendPublicRooms(loadingCallback, errorCallback);

    const RecommendPublicRoomEntrancies = recommendPublicRooms !== null ?
        () =>
        recommendPublicRooms.edges.length === 0 ? 
            <Label>参加可能なチャットが存在しません</Label>: 
            <>
                {
                    recommendPublicRooms.edges.map(d => {
                        return <PublicChatroomEntrance key={d.node.id} className={style.entrance_position} roomId={d.node.id} roomCreator={d.node.createUser.username} roomName={d.node.roomName} roomDescription="description"/>
                    })
                }
            </> 
        : "loading";

    return (
        <div className={props.className}>
            <RecommendPublicRoomEntrancies/>
            {recommendPublicRooms !== null ? recommendPublicRooms.edges.map( (_, i) => <div key={i} className={style.__empty_item}></div>): null}
        </div>
    );
}

//最後の行に空要素を詰めることで、最後の行だけ左詰めに見えるようにする
export function JoiningChatroomEntrancies(props) {
    const loadingCallback = () => null;
    const errorCallback = (msg) => alert(msg);
    const joiningPublicRooms = useCurrentUserJoinedPublicChatroom(loadingCallback, errorCallback);
    const joiningPrivateRooms = useCurrentUserJoinedPrivateChatroom(loadingCallback, errorCallback);

    const isEndLoadingJoinedRooms = joiningPrivateRooms && joiningPublicRooms;
    const JoiningRoomEntrancies =
        isEndLoadingJoinedRooms? 
            ()=> {
                    const Entrance = joiningPrivateRooms.edges.map(d => 
                            <PrivateChatroomEntrance key={d.node.id} className={style.entrance_position} roomId={d.node.id} roomCreator={d.node.createUser.username} roomName={d.node.roomName} roomDescription="description"/>
                        ).concat(joiningPublicRooms.edges.map(d => 
                            <PublicChatroomEntrance key={d.node.id} className={style.entrance_position} roomId={d.node.id} roomCreator={d.node.createUser.username} roomName={d.node.roomName} roomDescription="description"/>
                        )
                    );

                    return Entrance.length === 0? <Label>参加しているチャットが存在しません</Label>:
                        <>
                            {Entrance}
                            {Entrance.map( (_, i) => <div key={i} className={style.__empty_item}></div>)}
                        </>
                }
            :"loading";

    return (
        <div className={props.className}>
            <JoiningRoomEntrancies/>
        </div>
    );
}