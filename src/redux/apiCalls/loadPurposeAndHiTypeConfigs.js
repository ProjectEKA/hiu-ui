import apiWrapper from '../apiWrapper';
import { defaultHeaders } from '../../constants';

const loadPurposeAndHiTypeValueSets = () => apiWrapper(
  'get',
  '/ValueSet',
  {},
  {
    ...defaultHeaders,
  },
);

export default loadPurposeAndHiTypeValueSets;
