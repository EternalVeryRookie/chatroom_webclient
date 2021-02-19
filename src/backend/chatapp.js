import { gql } from "@apollo/client";

export const ENTER_PUBLIC_CHATROOM = gql`
    mutation enter($var: EnterPublicChatroomInput!) {
        enterPublicChatroom(input: $var) {
            ok      
        }
    }
`;

export const ENTER_PRIVATE_CHATROOM = gql`
    mutation enterPrivateChatroom($var: EnterPrivateChatroomInput!) {
        enterPrivateChatroom(input: $var) {
            ok      
        }
    }
`;