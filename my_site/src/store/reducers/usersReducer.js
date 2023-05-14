const initState = {
    id: '',
    login: '',
    name: '',
    fullname: '',
    email: '',
    authorized: false,
    createdDate: '', 
    errMsg: ''
}

export const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case 'registration_start':
            return { ...state, ...action}
        case 'registration_error':
            return { ...state, ...action}
        case 'registration_success':
            return { ...state, ...action}
        case 'login_start':
            return { ...state, ...action}
        case 'login_error':
            return { ...state, ...action}
        case 'login_success':
            return { ...state, ...action}
        case 'logout':
            return { ...state, ...action}

        default:
            return { ...state }
    }
}