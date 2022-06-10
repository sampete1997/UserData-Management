

const initialState = {
    userId: '',
    password: '',
    userName: '',
    userDetails: {}
}

function loginReducer(state = initialState, action) {

    switch (action.type) {

        case 'getUserId':

            return { ...state, userId: action.payload }

        case 'getPassword':

            return { ...state, password: action.payload }

        case 'getUserName':

            return { ...state, userName: action.payload }

        case 'getUserDetails':

            return { userDetails: action.payload }


            

        default:

            return state
    }
}

export default loginReducer