import {
  onSearch,
  onSearchSuccess,
  onSearchFailure,
  ACTION_TYPES,
} from '../searchPatientIdActions';

describe('Search Patient Id Action', () => {
  it('change state on search requested', () => {
    const expectedAction = {
      type: ACTION_TYPES.PATIENT_FETCH_REQUESTED,
      payload: { id: '1' },
    };
    const patient = {
      id: '1',
    };
    expect(onSearch(patient)).toMatchObject(expectedAction);
  });

  it('change state on search request success', () => {
    const expectedAction = {
      type: ACTION_TYPES.PATIENT_FETCH_SUCCEEDED,
      payload: { id: '1' },
    };
    const patient = {
      id: '1',
    };
    expect(onSearchSuccess(patient)).toMatchObject(expectedAction);
  });

  it('change state on search request failure', () => {
    const expectedAction = {
      type: ACTION_TYPES.PATIENT_FETCH_FAILED,
      payload: {},
    };
    const patient = {
      id: '1',
    };
    expect(onSearchFailure(patient)).toMatchObject(expectedAction);
  });
});
