import loginReducer from './login'
import {combineReducers} from 'redux'
import headerReducer from "./header"
export default combineReducers({
	userInfo:loginReducer,
	headerTitle:headerReducer
})