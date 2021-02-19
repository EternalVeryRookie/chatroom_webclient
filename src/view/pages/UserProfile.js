import React, { useContext } from "react";
import {Link, Redirect} from "react-router-dom"

import {userContext} from "src/user.js";
import SignOutButton from "src/view/molecules/SignOutButton.js"

export default function UserProfile(props) {
    /*
        機能一覧
        ・ユーザー名変更
        ・パスワード変更（自前ユーザーのみ）
        ・フォローユーザー数表示（ユーザーの実体は別ページで表示。ここでは数だけ）
        ・ログアウト
    */
   const userCtx = useContext(userContext);

    if (userCtx.currentUser == null)
        return <Redirect to="/"/>

    return (
        <div>
            <h1>プロフィールページ</h1>
            ・アイコン表示<br></br>
            {userCtx.currentUser && userCtx.currentUser.name}<br></br>
            ・ユーザー名変更<br></br>
            ・パスワード変更（自前ユーザーのみ）<br></br>
            ・フォローユーザー数表示（ユーザーの実体は別ページで表示。ここでは数だけ）<br></br>
            <Link to="/">Topに戻る</Link><br></br><br></br>
            <Link to="/"><SignOutButton/></Link>
        </div>
    )
}