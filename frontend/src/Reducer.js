const Reducer = function (state = 0, action) {
    switch (action.type) {
        case 'GET_INGREDIENTS':
            return { ingredients: action.payload }
        case 'GET_RECIPES':
            return { recipes: action.payload }
        default:
            return { ingredients: [] }
    }
}

export default Reducer
