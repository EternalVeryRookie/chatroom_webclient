import { useMutation } from "@apollo/client";

import {ENTER_PUBLIC_CHATROOM, ENTER_PRIVATE_CHATROOM, EIDT_PROFILE} from "./gql.js";

function useEnterRoom(ispublic) {
    return (roomId) => {
        const [enter, { data }] = useMutation(ispublic? ENTER_PUBLIC_CHATROOM: ENTER_PRIVATE_CHATROOM);

        return async () => {
            await enter({ variables: { 
                roomId: roomId
            }});
        }
    }
}

export const useEnterPublicRoom = useEnterRoom(true);
export const useEnterPrivateRoom = useEnterRoom(false);

export function useEditUserProfile() {
    const [edit, { data }] = useMutation(EIDT_PROFILE);

    return async (icon, coverImage, selfIntroduction, userName) => {
        try{
            return await edit({variables: {
                user_name: userName,
                icon: icon,
                cover_image: coverImage,
                self_introduction: selfIntroduction
            }});
        } catch (error) {
            throw JSON.parse(error.graphQLErrors[0].message.replace(/'/g, '"'));
        }
    };
}