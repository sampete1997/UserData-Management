import { fetchData } from "../components/actions/fetchAction"

const { ShowUserData } = fetchData



const initialState = {
    userData: [],
    flag: '',
    isEditing:false,
    updateRedux:0
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

            case 'updateRedux':
                return {
                    ...state,
                    updateRedux:state.updateRedux+1
                }

        default:
            return state
    }
}

export default showDataReducer