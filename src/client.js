import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";

import {User, userContext, useUser} from "./user.js";
import {CURRENT_USER} from "./backend/user.js";
import { createUploadLink } from 'apollo-upload-client';
import { onError } from "@apollo/client/link/error";

import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

import ENV from "ENV";
import UserProfile from "./view/pages/UserProfile/UserProfile.js";
import Top from "./view/pages/TopPage/Top.js";
import Chatroom from "./view/pages/Chatroom.js";
import JoiningRoomsPage from "./view/pages/JoiningRoomsPage/JoiningRoomsPage.js";

import "./reset.scss";

function App(props) {
    const userCtx = useUser(props.user);

    return (
        <ApolloProvider client={props.client}>
            <userContext.Provider value={userCtx}>
                <Router>
                    <Route exact path={"/"} component={Top}/>
                    <Route exact path={"/joiningrooms"} component={JoiningRoomsPage}/>
                    <Route exact path={"/userprofile"} component={UserProfile}/>
                    <Route exact path={"/chatroom/:id"} component={Chatroom}/>
                    <Route exact path={"/chatroom"} component={Chatroom}/>
                </Router>
            </userContext.Provider>
        </ApolloProvider>
    );
}


const link = createUploadLink({
    uri: ENV.API_SERVER_URI + "/graphql",
    credentials: "include",
    headers: {
        "keep-alive": "true"
    },
});

const err = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
  
      if (networkError && networkError.statusCode == 413) alert("ファイルが大きすぎます");
  });
  
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: err.concat(link),//authLink.concat(link),
    fetchOptions: {
        mode: 'no-cors',
    }
});

//ユーザー訪問時にログイン済みかどうかをサーバーに問い合わせる
client.query({query:CURRENT_USER, fetchPolicy: "no-cache"}).then((response) => {
    let user = null;
    if (response.data.currentUser) 
        user = new User(response.data.currentUser.username, response.data.currentUser.email, response.data.currentUser.id);
        
    ReactDOM.render(<App user={user} client={client}/>, document.getElementById("app"));
});
