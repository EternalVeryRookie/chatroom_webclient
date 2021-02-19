import React from "react";

import style from "./style.scss";

export default function ChatroomEntrancies(props) {
    //最後の行に空要素を詰めることで、最後の行だけ左詰めに見えるようにする
    return (
        <div className={style.entrances}>
            {props.children}
            {props.children.map( (_, i) => <div key={i} className={style.__empty_item}></div>)}
        </div>
    )
}