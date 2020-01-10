import { ACTION_TYPES } from "../actions/searchAction";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.PATIENT_FETCH_REQUESTED:
      return {};
    case ACTION_TYPES.PATIENT_FETCH_SUCCEEDED:
      return {
        result: action.payload.data.email
      };
    default:
      return state;
  }
};
