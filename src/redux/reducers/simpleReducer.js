import { ACTION_TYPES } from "../actions/searchAction";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.PATIENT_FETCH_REQUESTED:
      return {
        result: action.payload.id
      };
    default:
      return state;
  }
};
