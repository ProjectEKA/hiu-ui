import _ from 'lodash';
import { connect } from 'react-redux';
import PatientHealthInformation from './PatientHealthInformation.view';
import { loadHealthData } from '../../redux/actions/loadHealthDataActions';
import getNestedObject from '../../utils/getNestedObject';

function extractDatesArray(data) {
  if (data) {
    return Object.keys(data);
  }
  return undefined;
}

function extractSelectedDate(data) {
  if (data) {
    const dateArray = Object.keys(data);
    return dateArray[0];
  }
  return undefined;
}

const mapStateToProps = (state) => ({
  healthInfo: getNestedObject(state, 'healthInfo.healthData'),
  dateArray: extractDatesArray(getNestedObject(state, 'healthInfo.healthData')),
  defaultSelectedDate: extractSelectedDate(
    getNestedObject(state, 'healthInfo.healthData')
  ),
  erroredEntiresCount: _.get(state, 'healthInfo.entriesCount.ERRORED', 0),
  success: state.healthInfo.success,
  loading: state.healthInfo.loading,
  error: state.healthInfo.error,
  patientData: getNestedObject(state, 'healthInfo.patientData'),
});

const mapDispatchToProps = {
  loadHealthData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientHealthInformation);
