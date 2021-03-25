import axios from 'axios'

export const getIngredients = () => (dispatch) => {
    console.log('getting ingredients')
    axios({
        method: 'get',
        url: 'http://localhost:3001/ingredients'
    }).then(
        (res) => {
            console.log(res)
            dispatch({
                type: 'GET_INGREDIENTS',
                ingredients: res.data.ingredients
            })
        },
        (err) => {
            console.log(err)
        }
    )
}

export const addIngredient = (data, cb) => (dispatch) => {
    axios({
        method: 'post',
        url: 'http://localhost:3001/ingredients',
        data: { ingredient: data }
    }).then(
        (res) => {
            cb()
        },
        (err) => {
            console.log(err)
        }
    )
}

export const deleteIngredient = (id, cb) => (dispatch) => {
    axios({
        method: 'delete',
        url: `http://localhost:3001/ingredients/${id}`
    }).then(
        (res) => {
            cb()
        },
        (err) => {
            console.log(err)
        }
    )
}

export const updateIngredient = (id, cb) => (dispatch) => {
    axios({
        method: 'put',
        url: `http://localhost:3001/ingredients/${id}`
    }).then(
        (res) => {
            cb()
        },
        (err) => {
            console.log(err)
        }
    )
}
