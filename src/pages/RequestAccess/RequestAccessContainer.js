import { connect } from 'react-redux';
import RequestAccess from './RequestAccess';
import { onCreateConsent } from '../../redux/actions/createConsentActions';
import getNestedObject from '../../utils/getNestedObject';

const mapStateToProps = (state) => ({
  patientId: getNestedObject(state, 'patientDetail.patientData.patient.id'),
  loading: state.createConsent.loading,
  error: state.createConsent.error,
  purposesOfUse: state.configValueSets.purposesOfUse,
  hiTypes: state.configValueSets.hiTypes,
});

const mapDispatchToProps = {
  onCreateConsent,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestAccess);
