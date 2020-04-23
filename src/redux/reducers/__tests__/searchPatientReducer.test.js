import searchPatientReducer from '../searchPatientIdReducer';
import { ACTION_TYPES } from '../../actions/searchPatientIdActions';

describe('Search Patient Reducer', () => {
  it('initializes data from payload when successful', () => {
    const action = {
      type: ACTION_TYPES.PATIENT_FETCH_REQUESTED,
      payload: {
        id: '1',
      },
    };
    const defaultState = {
      testState: 'Value',
    };
    const expectedState = { testState: 'Value', loading: true };
    expect(searchPatientReducer(defaultState, action)).toMatchObject(
      expectedState,
    );
  });
});
