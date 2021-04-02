import axios from 'axios'

export const getRecipes = () => (dispatch) => {
    axios({
        method: 'get',
        url: 'http://localhost:3001/recipes'
    }).then(
        (res) => {
            dispatch({
                type: 'GET_RECIPES',
                payload: res.data
            })
        },
        (err) => {
            console.error(err)
        }
    )
}

export const addRecipe = (data, cb) => (dispatch) => {
    axios({
        method: 'post',
        url: 'http://localhost:3001/recipes',
        data: data
    }).then(
        (res) => {
            cb()
        },
        (err) => {
            console.error(err)
        }
    )
}
