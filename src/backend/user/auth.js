import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {User, userContext} from "../../user.js";

import {PASSWORD_SIGN_IN, SINGLE_SIGN_ON, SIGN_OUT, CURRENT_USER} from "./gql.js";


export function usePasswordSignIn() {
    const [sign_in, { data }] = useMutation(PASSWORD_SIGN_IN);
    const ctx = useContext(userContext);

    const signIn = (email, password) => {
        sign_in({ variables: { email: email, password: password} }).then(response => {
            const user = new User(response.data.signIn.user.username, response.data.signIn.user.email, response.data.signIn.user.id);
            ctx.signIn(user);
        }).catch(err => {
            alert(response.data.signIn.errors[0].message);
        });
    }

    return signIn;
}

export function useGoogleSignIn() {
    const [sso, { data }] = useMutation(SINGLE_SIGN_ON);

    const signIn = async () => {
        const result = await sso({ variables: { provider: "google" } });
        location.href = result.data.singleSignOn.redirectUrl;
    }

    return signIn;
}

export function useSignOut() {
    const [signOutMutation, { data }] = useMutation(SIGN_OUT);
    const ctx = useContext(userContext);

    const signOut = async () => {
        signOutMutation().then(response => {
            ctx.signOut();
        }).catch(err => {
            alert(err);
        });
    }

    return signOut;
}

export function useCurrentUser(loadingCallback, errorCallback) {
    const { loading, error, data } = useQuery(CURRENT_USER);

    if (loading) 
        return loadingCallback? loadingCallback(): "Loading...";
    
    if (error) 
        return errorCallback? errorCallback(): `Error! ${error.message}`;

    return data.currentUser;
}