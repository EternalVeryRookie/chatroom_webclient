import React, {useContext} from "react";

import EntranceNavigator from "src/view/molecules/Navigators/EntranceNavigator.js";
import JoiningRoomsNavigator from "src/view/molecules/Navigators/JoiningRoomsNavigator.js";
import ProfileNavigator from "src/view/molecules/Navigators/ProfileNavigator.js";
import BasicArea from "src/view/atoms/BasicArea.js";
import ShowCreateChatroomPopUpButton from "src/view/molecules/ShowCreateChatroomPopUpButton/ShowCreateChatroomPopUpButton.js";
import CreateChatroomModal from "src/view/organisms/CreateChatroomModal/CreateChatroomModal.js";

import style from "./style.scss";

export default function NavigationBar(props) {
    return (
        <BasicArea className={style.navigation_bar_style}>
            <CreateChatroomModal/>
            <EntranceNavigator/>
            <JoiningRoomsNavigator/>
            <ProfileNavigator/>
        </BasicArea>
    );
}