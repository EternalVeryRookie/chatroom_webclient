import React, {useContext} from "react";

import {Link} from "react-router-dom"

import {userContext} from "src/user.js";


export default function Header(props) {
    const userCtx = useContext(userContext);

    return (
        <div>
            Chatroom         {userCtx.currentUser && <Link to="/userprofile">ユーザー情報</Link>}
        </div>
    )
}