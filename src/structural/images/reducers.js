const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_IMAGES':
            return { ...state, loading: true}
        default:
            return state
    }
}

export default reducer