import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { profileReducer } from "./profileReducer";

const rootReducer = combineReducers({
    user: userReducer,
    doctorProfile: profileReducer,
})
export default rootReducer;