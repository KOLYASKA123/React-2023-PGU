const initState = {
    loading: true,
    success: false,
    errMsg: '',
    posts: [],
    postId: '',
}

export const postsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'getPosts_success':
            return { ...state, ...action}
        case 'getPosts_onfetch':
            return { ...state, posts: [], loading: true, success: false}
        case 'getPosts_error':
            return { ...state, ...action }
        case 'getPost_success':
            return { ...state, ...action }
        case 'getPost_onfetch':
            return { ...state, posts: [], loading: true, success: false }
        case 'getPost_error':
            return { ...state, ...action }
        case 'updatePost_success':
            return { ...state, ...action }
        case 'createPost_success':
            return { ...state, ...action }
        default:
            return { ...state }
    }
}