import { useQuery } from "@apollo/client";

import {ALL_PUBLIC_CHATROOM, EXCLUDE_JOINED_PUBLIC_CHATROOM, CURRENT_USER_JOINED_PUBLIC_CHATROOM, CURRENT_USER_JOINED_PRIVATE_CHATROOM} from "./gql";

function createChatroomsQueryFook(query, returnFunction) {
    return function(loadingCallback, errorCallback) {
        const { loading, error, data } = useQuery(query);

        if (loading) 
            return loadingCallback? loadingCallback(): "Loading...";
        
        if (error) 
            return errorCallback? errorCallback(error.message): `Error! ${error.message}`;
    
        return returnFunction(data);
    }
}

//いずれは賢いやり方でおすすめを表示したいお気持ち
export const useRecommendPublicRooms = createChatroomsQueryFook(EXCLUDE_JOINED_PUBLIC_CHATROOM, (data) => data.excludeJoinedPublicChatroom);

export const useExcludeJoinedPublicChatroom = createChatroomsQueryFook(EXCLUDE_JOINED_PUBLIC_CHATROOM, (data) => data.excludeJoinedPublicChatroom);

export const useCurrentUserJoinedPublicChatroom = createChatroomsQueryFook(CURRENT_USER_JOINED_PUBLIC_CHATROOM, (data) => data.currentUserJoinedPublicChatroom);

export const useCurrentUserJoinedPrivateChatroom = createChatroomsQueryFook(CURRENT_USER_JOINED_PRIVATE_CHATROOM, (data) => data.currentUserJoinedPrivateChatroom)