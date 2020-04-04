import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import profile from './profileReducer'
import dialogs from './dialogsReducer'

const reducers = combineReducers({
    profile,
    dialogs
})
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))


export type TStore = ReturnType<typeof reducers>
export default store
