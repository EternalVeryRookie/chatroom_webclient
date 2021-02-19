import React, {useContext} from "react";

import {userContext} from "src/user.js";


export default function WelcomeUser(props) {
    const userCtx = useContext(userContext);

    return <div className={props.style}>{`ようこそ！${userCtx.currentUser.name}さん！`}</div>
}

WelcomeUser.defaultProps = {
    style: "welcome_user__default_style"
}