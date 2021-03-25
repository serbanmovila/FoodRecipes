import axios from 'axios'

export const register = (data, cb) => (dispatch) => {
    axios({
        method: 'post',
        mode: 'no-cors',
        url: 'localhost:3001/register',
        data: {
            username: data.username,
            password: data.password,
            email: data.email
        }
    })
        .then((res) => {
            if (res.data.status === 'Element inserted!') {
                dispatch({
                    type: 'REGISTERED'
                })
                cb(data)
            } else {
                dispatch({ type: 'ERROR' })
            }
        })
        .catch((err) => {
            dispatch({ type: 'ERROR' })
        })
}

export const login = (data) => (dispatch, state) => {
    axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: {
            username: data.username,
            password: data.password
        }
    }).then(
        (res) => {
            console.log(res)
            dispatch({
                type: 'LOGGED_IN',
                token: res.data.token
            })
        },
        (err) => {
            console.log(err)
        }
    )
}

export const checkLogin = () => (dispatch, state) => {
    let token = localStorage.getItem('token')
    console.log(token)
    if (token) {
        dispatch({ type: 'IS_LOGGED' })
    }
}
