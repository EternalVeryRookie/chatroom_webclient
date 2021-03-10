import React from "react";
import {useHistory} from "react-router-dom"

import Label from "src/view/atoms/Label.js"
import BasicArea from "src/view/atoms/BasicArea.js";
import {useEnterPrivateRoom, useEnterPublicRoom} from "src/backend/chatapp/mutation.js"

import style from "./style.scss";

//これをクリックしたらルームに飛ぶ仕様
//見せるもの  ルーム名、作成者のユーザー名、説明（後でやる）
function ChatroomEntrance(ispublic) {
    return function(props) {
        const enter = ispublic? useEnterPublicRoom(props.roomId): useEnterPrivateRoom(props.roomId);
        const history = useHistory();
        const onClick = async () => {
            try{
                await enter();
            }catch (error) {
                alert(error);
                return ;
            }

            history.push(`/chatroom/${props.roomId}`);
        }

        return (
            <BasicArea className={props.className}>
                <BasicArea onClick={onClick} className={style.entrance__appearance}>
                    <Label className={style.room_info}>{props.roomName}</Label>
                    <Label className={style.room_info}>作成者: {props.roomCreator}</Label>
                    <Label className={style.room_info}>{props.roomDescription}</Label>
                </BasicArea>
            </BasicArea>
        );
    }
}


export const PublicChatroomEntrance = ChatroomEntrance(true);
export const PrivateChatroomEntrance = ChatroomEntrance(false);