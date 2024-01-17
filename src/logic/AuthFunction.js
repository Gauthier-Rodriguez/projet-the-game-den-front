import axios from 'axios'

export const register = (obj) => {
    return axios.post('http://localhost:3000/api/register', {
        lastname: obj.lastname,
        firstname: obj.firstname,
        pseudo: obj.pseudo,
        email : obj.email,
        password : obj.password
    }
    )
    .then(res => console.log('Registered'))
    .catch(err => console.log(err))
}

export const login = (user) => {
    return axios.post('http://localhost:3000/api/login', {
        email : user.email,
        password : user.password
    }
    )
    .then(res => {
        // console.log(res.headers.get('auth-token'))
        localStorage.setItem('usertoken', res.data) // sets a usertoken into the localstorage coming from res.data
        return res.data
        
    })
    .catch(err => console.error(err))
}