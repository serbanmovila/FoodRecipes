import { CallToActionRounded } from '@material-ui/icons'
import { getIngredients } from './Screens/Dashboard/Ingredients/Controllers/IngredientsActions'

const INITIAL_STATE = {
    loggedIn: false,
    ingredients: [],
    recipes: [],
    username: ''
}

const Reducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_INGREDIENTS':
            return { ...state, ingredients: action.ingredients }
        case 'GET_RECIPES':
            return { ...state, recipes: action.payload }
        case 'LOGGED_IN':
            localStorage.setItem('token', action.token)
            return {
                ...state,
                loggedIn: true,
                jwt: action.token,
                ingredients: []
            }
        case 'IS_LOGGED':
            return {
                ...state,
                loggedIn: true,
                jwt: action.token,
                ingredients: []
            }
        default:
            return state
    }
}

export default Reducer