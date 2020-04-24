import apiWrapper from '../apiWrapper';
import { defaultHeaders } from '../../constants';

const loadPurposeAndHiTypeValueSets = () => apiWrapper(
  'get',
  '/ValueSet/valuesets.json',
  {},
  {
    ...defaultHeaders,
  },
);

export default loadPurposeAndHiTypeValueSets;
