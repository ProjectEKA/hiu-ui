import { APP_INIT_ACTION_TYPES } from '../actions/initAppActions';

const RESOURCE_TYPE_VALUESET = 'ValueSet';
const HITYPE_TYPE_VALUESET = 'health-information-type';
const HI_PUSPOSE_VALUESET = 'health-information-purpose-of-use';

const toIncludedCodes = (valueSets) => {
  // a FHIR valueSet, has only compose inclusion, codes of which are defined in CM
  if (valueSets) {
    return valueSets
      .filter((vs) => vs.compose !== undefined)
      .map((vs) => vs.compose.include)
      .reduce((result, includes) => result.concat(includes), [])
      .reduce((result, include) => result.concat(include.concept), []);
  }
  return undefined;
};

const valueSetsLoaderInitialState = {
  loading: false,
  error: false,
  success: false,
  purposesOfUse: [],
  hiTypes: [],
};

const valueSetsReducer = (state = valueSetsLoaderInitialState, action) => {
  switch (action.type) {
    case APP_INIT_ACTION_TYPES.FETCH_VALUESETS_REQUEST:
      return { ...state, loading: true };
    case APP_INIT_ACTION_TYPES.FETCH_VALUESETS_SUCCESS:
      var newState = { ...state, loading: false, success: true };
      var purposesVSets = action.payload.filter(
        (vs) =>
          vs.resourceType === RESOURCE_TYPE_VALUESET &&
          vs.id === HI_PUSPOSE_VALUESET
      );
      var purposeCodes = toIncludedCodes(purposesVSets);
      if (purposeCodes) {
        newState.purposesOfUse = purposeCodes;
      }
      var hiTypesVSets = action.payload.filter(
        (vs) =>
          vs.resourceType === RESOURCE_TYPE_VALUESET &&
          vs.id === HITYPE_TYPE_VALUESET
      );
      var hiTypeCodes = toIncludedCodes(hiTypesVSets);
      if (hiTypeCodes) {
        newState.hiTypes = hiTypeCodes;
      }
      return newState;
    case APP_INIT_ACTION_TYPES.FETCH_VALUESETS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export { valueSetsReducer as configValueSets };
