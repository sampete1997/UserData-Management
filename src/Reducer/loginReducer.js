

const initialState = {
    userId: '',
    password: '',
    userName: ''
}

function loginReducer(state = initialState, action) {

    switch (action.type) {

        case 'getUserId':

            return { ...state, userId: action.payload }

        case 'getPassword':

            return { ...state, password: action.payload }

        case 'getUserName':

            return { ...state, userName: action.payload }

        default:

            return state
    }
}

export default loginReducer