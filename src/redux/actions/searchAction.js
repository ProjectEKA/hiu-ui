export const ACTION_TYPES = {
  PATIENT_FETCH_REQUESTED: "PATIENT_FETCH_REQUESTED"
};
export const onSearch = () => ({
  type: ACTION_TYPES.PATIENT_FETCH_REQUESTED,
  payload: { id: "batman" }
});
