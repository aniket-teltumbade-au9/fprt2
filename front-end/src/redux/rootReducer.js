import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import galleryReducer from './reducers/galleryReducer'

let rootReducer = combineReducers({
    authState: authReducer,
    galleryState: galleryReducer
})
export default rootReducer