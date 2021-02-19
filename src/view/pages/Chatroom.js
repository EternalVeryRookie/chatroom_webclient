import React from "react";
import {Redirect} from "react-router-dom"

export default function Chatroom(props) {
    const {params} = props.match;
    console.log(params.id);

    if (params.id === undefined)
        return <Redirect to="/"/>

    return <h1>チャットルームのページです</h1>
}