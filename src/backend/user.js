import { gql } from "@apollo/client";

export const SINGLE_SIGN_ON = gql`
    mutation SingleSignOn($provider: String!){
        singleSignOn(provider: $provider) {
            redirectUrl
        }
    }
`;

export const PASSWORD_SIGN_IN = gql`
    mutation PasswordSignIn($email: String!, $password: String!){
        signIn(email: $email, password: $password) {
            ok
            errors {
                message
                errorType
            }
            user {
                username
                email
                id
            }
        }
    }
`;

export const SIGN_OUT = gql`
    mutation SignOut {
        signOut {
            ok
        }
    }
`;

export const CURRENT_USER = gql`
    query CurrentUser{
        currentUser{
            id
            email
            username
        }
    }
`;
