import { BACKEND_URL } from "../Root";


const accessToken = localStorage.getItem('accessToken')
let authorization =  `Bearer ${accessToken}`

export const getUserById = async (id) => {
    try {
        let user = null;
        
        const url = `${BACKEND_URL}users/${id}`
        await fetch(url, {
            method: 'get'
        })
        .then(response => response.json())
        .then(response => user = response)
        .catch(err => console.error(err))
        return user
    } catch (error) {
        console.error(error.message);
    }
}

export const deleteComment = async (id) => {
    try {
        let result = null
        const url = `${BACKEND_URL}comments/${id}`
        
        await fetch(url, {
            method: 'delete'
        })
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err))

        return result
    } catch (err) {
        console.error(err)
    }
}

export const editComment = async (id, comment) => {
    try {
        let result = null
        const url = `${BACKEND_URL}comments/${id}`
        
        await fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                authorization,
            },
            body: JSON.stringify({comment})
        })
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err))

        return result
    } catch (err) {
        console.error(err)
    }
}

export const updateUsername = async (id, username) => {
    try {
        let result = null
        const url = `${BACKEND_URL}users/${id}/username`
        
        await fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                authorization,
            },
            body: JSON.stringify({username})
        })
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err));
        return result;
    } catch (err) {
        console.error(err)
    }
}

export const updateEmail = async (id, email) => {
    try {
        let result = null
        const url = `${BACKEND_URL}users/${id}/email`
        
        await fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                authorization,
            },
            body: JSON.stringify({email})
        })
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err));
        return result;
    } catch (err) {
        console.error(err)
    }
}

export const updatePassword = async (id, oldPassword, password, confirmPassword, username) => {
    try {
        let result = null
        const url = `${BACKEND_URL}users/${id}/password`
        await fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                authorization,
            },
            body: JSON.stringify({oldPassword, password, confirmPassword, username})
        })
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err));
        return result;
    } catch (err) {
        console.error(err)
    }
}

export const newPost = async (title, text) => {
    try {
        let result = null
        const url = `${BACKEND_URL}posts/new`
        
        await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                authorization,
            },
            body: JSON.stringify({title, text})
        })
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err));
        return result;
    } catch (err) {
        console.error(err)
    }
}

export const logout = async (accessToken, refreshToken) => {
    try {
        let result = null;
        const url = `${BACKEND_URL}logout`;

        await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                authorization,
            },
            body: JSON.stringify({accessToken, refreshToken}),
        })
        .then(res => res.json())
        .then(res => result = res)
        .catch(err => console.error(err))

        return result
    } catch (error) {
        console.log(error);        
    }
}