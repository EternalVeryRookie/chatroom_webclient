import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";

import {User, userContext, useUser} from "./user.js";
import {CURRENT_USER} from "./backend/user.js";
import {setContext } from "apollo-link-context";

import ENV from "ENV";
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from "@apollo/client";
import UserProfile from "./view/pages/UserProfile/UserProfile.js";
import Top from "./view/pages/TopPage/Top.js";
import Chatroom from "./view/pages/Chatroom.js";


function App(props) {
    const userCtx = useUser(props.user);

    return (
        <ApolloProvider client={props.client}>
            <userContext.Provider value={userCtx}>
                <Router>
                    <Route exact path={"/"} component={Top}/>
                    <Route exact path={"/userprofile"} component={UserProfile}/>
                    <Route exact path={"/chatroom/:id"} component={Chatroom}/>
                    <Route exact path={"/chatroom"} component={Chatroom}/>
                </Router>
            </userContext.Provider>
        </ApolloProvider>
    );
}


const link = createHttpLink({
    uri: ENV.API_SERVER_URI + "/graphql",
    credentials: "include",
});

const authLink = setContext((_, { headers }) => {      
    return {
      headers: {
        ...headers,
        cookie: document.cookie
      }
    }
  })
  
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link//authLink.concat(link),
});

//ユーザー訪問時にログイン済みかどうかをサーバーに問い合わせる
client.query({query:CURRENT_USER, fetchPolicy: "no-cache"}).then((response) => {
    let user = null;
    if (response.data.currentUser) 
        user = new User(response.data.currentUser.username, response.data.currentUser.email, response.data.currentUser.id);
        
    ReactDOM.render(<App user={user} client={client}/>, document.getElementById("app"));
});
