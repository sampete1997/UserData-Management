import { fetchData } from "../components/actions/fetchAction"

const { ShowUserData } = fetchData

console.log('tr show', ShowUserData);

const initialState = {
    userData: [],
    flag: '',
    isEditing:false
}

function showDataReducer(state = initialState, action) {

    switch (action.type) {

        case ShowUserData:
            return { ...state, userData: action.payload }

        case 'changeFlag':
            return { ...state, flag: action.payload }

        case 'isEditing':

            return {
                ...state,

                isEditing: action.isEditing
            }

        default:
            return state
    }
}

export default showDataReducer