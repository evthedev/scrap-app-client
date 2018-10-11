const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_PROJECTS':
            return { ...state, loading: true}
        default:
            return state
    }
}

export default reducer