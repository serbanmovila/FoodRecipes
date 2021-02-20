import axios from 'axios'

export const register = (data) => (dispatch) => {
    console.log('CALL')
    dispatch({ type: 'test' })
    axios({
        method: 'post',
        url: 'localhost:3001/register',
        data: {
            username: data.username,
            password: data.password,
            email: data.email,
        },
    })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            dispatch({ type: 'err' })
        })
}

export const login = (data) => (dispatch, state) => {
    axios({
        method: 'post',
        url: 'localhost:3001/login',
        data: {
            username: data.username,
            password: data.password,
            email: data.email,
        },
    }).then(
        (res) => {
            console.log(res)
        },
        (err) => {
            console.log(err)
        }
    )
}
