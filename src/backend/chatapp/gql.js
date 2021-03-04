import { gql } from "@apollo/client";

export const ENTER_PUBLIC_CHATROOM = gql`
    mutation ($roomId: ID!) {
        enterPublicChatroom(roomId: $roomId) {
            ok      
        }
    }
`;

export const ENTER_PRIVATE_CHATROOM = gql`
    mutation ($roomId: ID!) {
        enterPrivateChatroom(roomId: $roomId) {
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

export const EIDT_PROFILE = gql`
    mutation ($icon: Upload, $cover_image: Upload, $self_introduction: String, $user_name: String) {
        editProfile(icon: $icon, coverImage: $cover_image, selfIntroduction: $self_introduction, userName: $user_name) {
            ok
        }
    }
`;