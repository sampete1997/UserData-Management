import {legacy_createStore as createStore,combineReducers} from 'redux'
import showDataReducer from '../Reducer/showDataReducer'
import addUserReducer from '../Reducer/addUserReducer'
import loginReducer from '../Reducer/loginReducer'

const rootReducer = combineReducers({
    showData:showDataReducer,
    addUser:addUserReducer,
    login:loginReducer
})



const store = createStore(rootReducer)


export default store