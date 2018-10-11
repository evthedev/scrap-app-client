import { routerMiddleware } from "react-router-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createHistory from "history/createBrowserHistory";

import reducers from './reducers'

const history = createHistory();
const middleware = routerMiddleware(history);

export default function configureStore () {
 
    return createStore(
        combineReducers(reducers),
        applyMiddleware(middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );

}