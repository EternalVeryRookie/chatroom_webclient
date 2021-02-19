import { useMutation } from "@apollo/client";

import {ENTER_PUBLIC_CHATROOM, ENTER_PRIVATE_CHATROOM} from "./gql.js";

function useEnterRoom(ispublic) {
    return (roomId) => {
        const [enter, { data }] = useMutation(ispublic? ENTER_PUBLIC_CHATROOM: ENTER_PRIVATE_CHATROOM);

        return async () => {
            await enter({ variables: { 
                var: { "roomId": roomId }
            }});
        }
    }
}

export const useEnterPublicRoom = useEnterRoom(true);
export const useEnterPrivateRoom = useEnterRoom(false);