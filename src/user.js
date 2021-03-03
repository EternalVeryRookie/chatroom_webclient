//@ts-check

import React, {useState, useCallback} from "react";


export class User{
    constructor(name, email, id) {
        this.__name = name;
        this.__email = email;
        this.__id = id;
    }

    get name() {
        return this.__name;
    }

    get email() {
        return this.__email;
    }

    get id() {
        return this.__id;
    }
}


export const userContext = React.createContext(null);


export const useUser = (init) => {
    const [currentUser, setUser] = useState(init);

    const signIn = useCallback(current => setUser(current), []);
    const signOut = useCallback(() => setUser(null), []);
    
    return {
        currentUser,
        signIn,
        signOut,
    };
};