import Cookies from "js-cookie";

export function profileReducer(
  state = Cookies.get("doctorProfile") ? JSON.parse(Cookies.get("doctorProfile")) : null,

  action
) {
  switch (action.type) {
  
    case "DOCTORPROFILEUPDATE":
      return action.payload;

    case "LOGOUT":
      return null;

    case "VERIFY":
      return { ...state, verified: action.payload };

    default:
      return state;
  }
}