import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { RestLink } from 'apollo-link-rest';

import './index.css';
import createHistory from "history/createBrowserHistory";

import { Route } from "react-router";

import {
    ConnectedRouter,
    push,
} from "react-router-redux";

import configureStore from './store'

import Home from './containers/Home';
import ProjectsPage from './containers/ProjectsPage';
import ProjectsPageId from './containers/ProjectsPageId';
import registerServiceWorker from './registerServiceWorker';

const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYzA2NzY4ZTEwZjMzMDAyZDM2N2FlZSIsIm5hbWUiOiJhZG1pbiIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvOWYwOThiYzVlZmY5YWE2NzcwOTQzNDM3MTdkZmNjMTI_cz0yMDAmcj1wZyZkPW1tIiwiaWF0IjoxNTM5MzM3NTk5LCJleHAiOjE1NzUzMzc1OTl9.Dnaw_AuFr-Kc1UJmDW-c_z-4C1DfcHhRIL4IJwlR0kk'

console.log('process.env: ', process.env);
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
const serverUri = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'http://scrap-app-server.herokuapp.com/api'
console.log('serverUri: ', serverUri);

const restLink = new RestLink({
    uri: serverUri,
    headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + bearerToken
    })
  });

const cache = new InMemoryCache()

const statelink = new withClientState({
    cache,
    // resolvers,
    defaults: {
        show_type: 'BELOW_15'
    }

})

const link = ApolloLink.from([restLink, statelink])

  const client = new ApolloClient({
    link,
    cache
  });
  

const history = createHistory();
const store = configureStore()

const App = (
    <ApolloProvider client={client}>
        <ConnectedRouter history={history} store={store}>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/projects" exact component={ProjectsPage} />
                <Route path="/projects/:id" component={ProjectsPageId} />

            </div>
        </ConnectedRouter>
    </ApolloProvider>
)

ReactDOM.render(
    App,
    document.getElementById('root'));

registerServiceWorker();
