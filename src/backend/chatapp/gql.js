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

export const ALL_PUBLIC_CHATROOM = gql`
    query chatrooms {
        allChatrooms {
            edges {
                node {
                    id
                    roomName
                    createUser {
                        username
                    }
                }
            }
        }
    }
`;

export const EXCLUDE_JOINED_PUBLIC_CHATROOM = gql`
    query chatrooms {
        excludeJoinedPublicChatroom {
            edges {
                node{
                    id
                    roomName
                    createUser {
                        username
                    }
                }
            }
        }
    }
`

export const CURRENT_USER_JOINED_PUBLIC_CHATROOM = gql`
    query chatrooms {
        currentUserJoinedPublicChatroom {
            edges {
                node {
                    id
                    roomName
                    createUser {
                        username
                    }
                }   
            }
        }
    }
`

export const CURRENT_USER_JOINED_PRIVATE_CHATROOM = gql `
    query chatrooms {
        currentUserJoinedPrivateChatroom(offset: 0) {
            edges{
                node{
                    id
                    roomName
                    createUser {
                        username
                    }
                }
            }
        }
    }
`;