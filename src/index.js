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

const restLink = new RestLink({
    uri: 'http://localhost:5000/api',
    credentials: 'same-origin',
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
