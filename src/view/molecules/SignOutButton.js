import React from "react";

import BasicSubmitButton from "src/view/atoms/BasicSubmitButton.js"
import {useSignOut} from "src/backend/user/auth.js"


export default function SignOutButton(props) {
    const signOut = useSignOut();
    
    return <BasicSubmitButton value="サインアウト" onClick={signOut}/>
}