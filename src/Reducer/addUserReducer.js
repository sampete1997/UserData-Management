

const initialState = {

    name: '',
    age: '',
    mobileNo: '',
    email: '',
    photo: '',
    flag: false,
    isAdd: false,
   

}

function addUserReducer(state = initialState, action) {

    switch (action.type) {

        case 'addName':

            return {
                ...state,
                name: action.name,
            }

        case 'addAge':

            return {
                ...state,
                age: action.age,
            }
        case 'addMobileNo':

            return {
                ...state,
                mobileNo: action.mobileNo,
            }

        case 'addEmail':

            return {
                ...state,
                email: action.email,
            }
        case 'addPhoto':

            return {
                ...state,
                photo: action.photo,
            }


        case 'isAdd':

            return {
                ...state,

                isAdd: action.isAdd
            }


        default:
            return state
    }
}

export default addUserReducer