import { routerReducer } from "react-router-redux";
import imagesReducer from './structural/images/reducers'
import projectsReducer from './structural/projects/reducers'

const reducers = {
    router: routerReducer,
    images: imagesReducer,
    projects: projectsReducer
}

export default reducers